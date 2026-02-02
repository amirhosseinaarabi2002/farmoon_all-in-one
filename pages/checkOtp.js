import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { sendOtp, loginCalorie, getOtp, loginKhalafi } from "../api/auth_api";
import Cookies from "js-cookie";
import Link from "next/link";
import { addToast, Button, InputOtp, Spinner, Tooltip } from "@heroui/react";
import { Back } from "iconsax-react";
import Image from "next/image";

const CheckOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", ""]); // OTP as an array
  const [start, setStart] = useState(30); // Countdown timer
  const [isTimedUp, setIsTimedUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Track errors
  const router = useRouter();
  const { mobileNumber } = router.query;

  useEffect(() => {
    // Check if the token exists in localStorage (or use any other storage mechanism)
    const token = Cookies.get("token");
    

    if (token) {
      // If no token, redirect to home page
      router.push("/");
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  useEffect(() => {
    if (!mobileNumber) {
      router.push("/loginOtp");
    }
  }, [mobileNumber, router]);

  useEffect(() => {
    if (start > 0) {
      const timer = setTimeout(() => setStart(start - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsTimedUp(true);
    }
  }, [start]);

  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      handleCheckOtp();
    }

    if ("OTPCredential" in window) {
      const ac = new AbortController();

      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((otpCredential) => {
          const otpArray = otpCredential.code.split(""); // Convert to array
          setOtp(otpArray); // Update the state
          ac.abort();
        })
        .catch((err) => {
          ac.abort();
          console.error("OTP autofill error:", err);
        });
    }
  }, [otp]);

  const handleInputChange = (value) => {
    setOtp(value.split("").concat(new Array(5 - value.length).fill(""))); // Ensure array length remains 5
  };

  const handleCheckOtp = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await sendOtp(mobileNumber, otp.join(""));

      if (response.status === 200) {
        Cookies.set("mobileNumber", mobileNumber);
        Cookies.set("token", response.data.token);

        const motorLoginResponse = await loginKhalafi(response.data.token);

        if (motorLoginResponse.status === 200) {
          Cookies.set("token", motorLoginResponse.data.token);
          router.replace("/");
        } else {
          addToast({
            title:
              motorLoginResponse.message ||
              "مشکلی رخ داده است، لطفا مجددا تلاش کنید.",
            promise: new Promise((resolve) => setTimeout(resolve, 3000)),
            variant: "flat",
            color: "danger",
          });
        }
      } else {
        addToast({
          title: response.message || "مشکلی رخ داده است، لطفا مجددا تلاش کنید.",
          promise: new Promise((resolve) => setTimeout(resolve, 3000)),
          variant: "flat",
          color: "danger",
        });
      }
    } catch (error) {
      addToast({
        title: error.message || "مشکلی رخ داده است، لطفا مجددا تلاش کنید.",
        promise: new Promise((resolve) => setTimeout(resolve, 3000)),
        variant: "flat",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!isTimedUp) return;
    setError(null);

    try {
      const response = await getOtp(mobileNumber); // Ensure mobileNumber is passed
      if (response.status === 200) {
        setStart(60); // Reset the timer
        setIsTimedUp(false); // Allow user to wait before resending again
      } else {
        // setError("Failed to resend OTP. Please try again.");
        addToast({
          title: error.message || "مشکلی رخ داده است، لطفا مجددا تلاش کنید.",
          promise: new Promise((resolve) => setTimeout(resolve, 3000)),
          variant: "flat",
          color: "danger",
        });
      }
    } catch (error) {
      //   setError("Error sending OTP, please check your connection.");
      addToast({
        title: error.message || "مشکلی رخ داده است، لطفا مجددا تلاش کنید.",
        promise: new Promise((resolve) => setTimeout(resolve, 3000)),
        variant: "flat",
        color: "danger",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center sm:items-center bg-[#0f766e] bg-cover bg-no-repeat">
      <div className="rounded-3xl shadow-sm md:shadow-lg p-8 flex flex-col justify-center items-center bg-white backdrop-blur-md mx-4">
        <div className="flex justify-center items-center gap-x-2 mx-auto mb-3">
          <img
            src="/images/logo.png"
            alt="Farmoon Logo"
            width={60}
            height={60}
            className="mx-auto mb-2"
          />
        </div>

        <p className="text-center mb-8 font-Kalame font-semibold text-sm">
          کد اعتبارسنجی به شماره {mobileNumber} ارسال شد
        </p>

        <div dir="ltr" className="flex justify-center gap-2 font-Kalame mb-4">
          <InputOtp
            color=""
            value={otp.join("")} // Ensure it reflects the latest OTP state
            autoFocus
            onChange={(e) => handleInputChange(e.target.value)}
            length={5}
          />
        </div>
        {error && (
          <p className="text-danger font-Kalame font-semibold text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <Button
          variant="shadow"
          size="md"
          onPress={handleCheckOtp}
          className={`${
            otp.every((digit) => digit !== "") ? "bg-teal-700 text-gray-100" : ""
          } mx-auto flex w-60 font-DanaDemiBold cursor-pointer`}
          isDisabled={loading || !otp.every((digit) => digit !== "")}
        >
          {loading ? <Spinner color="white" size="sm" /> : "تایید"}
        </Button>

        <div className="flex items-center mt-5 gap-x-5">
          {isTimedUp ? (
            <span
              className="font-DanaDemiBold text-x text-teal-700 w-full cursor-pointer"
              onClick={handleResendOtp}
            >
              ارسال مجدد
            </span>
          ) : (
            <div className="timer-container">
              <div className="timer-circle">
                <span className="timer-text"> {start} </span>
                <span className="font-DanaDemiBold text-xs">
                  کد جدید ارسال شد
                </span>
              </div>
            </div>
          )}

          <Tooltip
            color=""
            showArrow
            classNames={{
              base: ["before:"],
              content: [
                "py-2 px-4 shadow-xl font-DanaDemiBold bg-teal-700",
                "text-gray-100",
              ],
            }}
            content="بازگشت"
            placement="left"
          >
            <Link href="/loginOtp"  className="bg-teal-700 rounded-2xl" passHref>
              <Back size="46" color="#fff" variant="Bulk" />
            </Link>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default CheckOtp;

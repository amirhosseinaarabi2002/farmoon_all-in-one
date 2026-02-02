"use client";

// pages/sendOtp.js
import React, { useState } from "react";
import { useRouter } from "next/router";
import { getOtp } from "../api/auth_api"; // Assuming you have an api directory for API functions
// import { toast, Toaster } from "react-hot-toast"; // Toast notifications
// import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { addToast, Button, Input, Spinner } from "@heroui/react";

// Utility function to convert Persian/Arabic numerals to English
const convertToEnglishDigits = (input) => {
  const persianToEnglishMap = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
  };

  return input.replace(/[۰-۹]/g, (char) => persianToEnglishMap[char] || char);
};

const LoginForm = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [isValidNumber, setIsValidNumber] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Next.js router for navigation

  // Validation function for mobile number
  const validateNumber = (number) => {
    const isValid = /^\d{11}$/.test(number); // Simple validation for 11 digit number
    setIsValidNumber(isValid);
  };

  // Handling the input change
  const handleChange = (event) => {
    const input = event.target.value;
    const englishNumber = convertToEnglishDigits(input);
    setMobileNumber(englishNumber);
    validateNumber(englishNumber);
  };

  // Sending OTP request
  const handleSendOtp = async () => {
    if (isValidNumber && mobileNumber) {
      setIsLoading(true);
      try {
        const response = await getOtp(mobileNumber);
        console.log(response);
        if (response.status === 200) {
          router.push({
            pathname: "/checkOtp",
            query: { mobileNumber }, // Pass mobile number as query params
          });
        } else {
          addToast({
            title:
              response.message || "مشکلی رخ داده است، لطفا مجددا تلاش کنید.",
            promise: new Promise((resolve) => setTimeout(resolve, 3000)),
            variant: "flat",
            color: "danger",
          });
        }
      } catch (error) {
        addToast({
          title: response.message,
          promise: new Promise((resolve) => setTimeout(resolve, 3000)),
          variant: "flat",
          color: "danger",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f766e] px-4">
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <img
          src="/images/logo.png"
          alt="Farmoon Logo"
          width={60}
          height={60}
          className="mx-auto mb-2"
        />
        <p className="font-Kalame font-semibold text-sm mx-auto flex justify-center mb-4">
          ورود با شماره همراه
        </p>
        <p className="font-Kalame text-sm mx-auto flex justify-center">
          برای استعلام خلافی ابتدا وارد حساب کاربری خود شوید.

        </p>
        <Input
        dir="rtl"
          size="lg"
          type="tel"
          maxLength="11"
          value={mobileNumber}
          onChange={handleChange}
          placeholder="شماره موبایل"
          className="p-3 rounded-md mb-4 text-xl font-DanaDemiBold w-80 mx-auto placeholder:text-center"
        />
        <Button
          size="md"
          variant="shadow"
          className="py-3 text-xl font-DanaDemiBold cursor-pointer max-w-80 mx-auto flex bg-teal-600 text-white w-60"
          onPress={handleSendOtp}
          disabled={!isValidNumber || isLoading}
        >
          {isLoading ? (
            <Spinner size="sm" color="white" />
          ) : (
            <span className="font-DanaDemiBold text-base">ارسال</span>
          )}
        </Button>
        <div className="mt-4 text-center text-sm text-gray-600 font-DanaMedium">
          <span>با ورود به فرمون </span>
          <Link
            href="https://uzee.ir/farmooonterms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-500 underline"
          >
            قوانین و مقررات
          </Link>
          <span> می پذیرم </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

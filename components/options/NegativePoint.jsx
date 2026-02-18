"use client";

import { useState } from "react";
import {
  Button,
  Input,
  addToast,
} from "@heroui/react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { getNegativeStatusApi } from "@/api/facility/negativeStatus_api";

const LicenseInquiry = () => {
  const [mobile, setMobile] = useState("");
  const [national, setNational] = useState("");
  const [licenseNo, setLicenseNo] = useState(""); // ✅ NEW
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const token = Cookies.get("token");

  const handleInquiry = async () => {
    // ✅ validations
    if (!mobile || !national || !licenseNo) {
      return toast.error("لطفا اطلاعات را کامل وارد کنید");
    }

    if (mobile.length !== 11) {
      return toast.error("شماره موبایل نامعتبر است");
    }

    if (national.length !== 10) {
      return toast.error("کد ملی نامعتبر است");
    }

    // optional license length check
    if (licenseNo.length < 6) {
      return toast.error("شماره گواهینامه نامعتبر است");
    }

    // ✅ check token
    if (!token) {
      addToast({
        title: "ابتدا وارد حساب کاربری شوید",
        variant: "flat",
        color: "danger",
      });
      router.push("/loginOtp");
      return;
    }

    try {
      setLoading(true);

      // ✅ send licenseNo to API
      const res = await getNegativeStatusApi(
        mobile,
        national,
        licenseNo
      );

      // save result
      localStorage.setItem(
        "licenseNegativeResult",
        JSON.stringify(res)
      );

      router.push("/negativeResult");

    } catch (error) {
      addToast({
        title: error.message,
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">

      <h2 className="text-center font-bold">
        نمره منفی گواهینامه
      </h2>

      <img
        src="/images/ic_licesnse_status.png"
        alt="license"
        className="w-28 mx-auto"
      />

       <p className="text-center text-xs md:text-sm">
          هزینه ی یکبار استعلام نمره منفی ۱۶,170 تومان می باشد
        </p>
        <p className="text-center text-xs md:text-sm">
          برای پیگیری وضعیت نمره منفی اطلاعات زیر را تکمیل کنید
        </p>

      {/* National */}
      <Input
        label="کد ملی"
        type="tel"
        maxLength={10}
        value={national}
        onChange={(e) => setNational(e.target.value)}
        className="max-w-80 mx-auto"
      />

      {/* Mobile */}
      <Input
        label="شماره موبایل"
        type="tel"
        maxLength={11}
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        className="max-w-80 mx-auto"
      />

      {/* ✅ NEW license number */}
      <Input
        label="شماره گواهینامه"
        type="tel"
        value={licenseNo}
        onChange={(e) => setLicenseNo(e.target.value)}
        className="max-w-80 mx-auto"
      />

      <Button
        size="lg"
        onPress={handleInquiry}
        isLoading={loading}
        className="font-DanaDemiBold bg-teal-600 text-white w-80 mx-auto"
      >
        استعلام نمره منفی
      </Button>

      <p className="text-center text-xs">
        در صورت داشتن هرگونه سوال با پشتیبانی تماس بگیرید
      </p>

    </div>
  );
};

export default LicenseInquiry;

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function NegativeResult() {
  const [licenses, setLicenses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    // protect page
    if (!token) {
      router.push("/loginOtp");
      return;
    }

    const data = localStorage.getItem("licenseNegativeResult");

    if (data) {
      setLicenses(JSON.parse(data));
    }
  }, []);

  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-center">نمره منفی گواهینامه</h2>
      <img
        src="/images/ic_license_negative.png"
        alt="ic_license_negative"
        className="w-28 mx-auto"
      />
      <p className="text-center text-xs md:text-sm">
        وضعیت نمره منفی گواهینامه رانندگی شما به شرح زیر می باشد
      </p>

      <div dir="rtl" className={`${licenses.allowable === 1 ? "bg-success-200" : "bg-danger-200"} rounded-xl p-4 text-sm`}>
        <div className="flex flex-col gap-y-3">
          <div className="flex justify-between">
            <p>تعداد نمره منفی:</p>
            <p>{licenses.negPoint}</p>
          </div>

          <div className="flex justify-between">
            <p>کد تخلف :</p>
            <p>{licenses.ruleId}</p>
          </div>

          <div className="flex justify-between">
            <p> مجاز به رانندگی :</p>
            <p>{licenses.allowable === 1 ? "می باشید" : "نمی باشید"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

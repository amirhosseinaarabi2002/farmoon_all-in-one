"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LicenseStatusResult() {
  const [licenses, setLicenses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    // protect page
    if (!token) {
      router.push("/loginOtp");
      return;
    }

    const data = localStorage.getItem("licenseStatusResult");

    if (data) {
      setLicenses(JSON.parse(data));
    }
  }, []);

  if (!licenses.length) {
    return (
      <div className="text-center p-6">اطلاعاتی یافت نشد</div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4">
        <h2 className="text-center">وضعیت گواهینامه</h2>
        <img
          src="/images/ic_licesnse_status.png"
          alt="ic_licesnse_status"
          className="w-28 mx-auto"
        />
        <p className="text-center text-xs md:text-sm">
         وضعیت صدور گواهینامه رانندگی شما به شرح زیر می باشد
        </p>
      {licenses.map((item, index) => (
        <div
          key={index}
          dir="rtl"
          className="bg-gray-100 rounded-xl p-4 text-sm"
        >
          <div className="grid grid-cols-2 gap-2">
            <span>نام:</span>
            <span >{item.firstName}</span>

            <span>نام خانوادگی:</span>
            <span >{item.lastName}</span>

            <span>کد ملی:</span>
            <span >{item.nationalNo}</span>

            <span>نوع گواهینامه:</span>
            <span>{item.title}</span>

            <span>وضعیت:</span>
            <span className=" text-teal-700">
              {item.rahvarStatus}
            </span>

            <span>بارکد:</span>
            <span>
              {item.barcode}
            </span>

            <span>تاریخ چاپ:</span>
            <span>{item.printDate}</span>

            <span>مدت اعتبار:</span>
            <span>{item.validYears} سال</span>
          </div>
        </div>
      ))}
    </div>
  );
}

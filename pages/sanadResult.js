"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function sanadResult() {
  const [licenses, setLicenses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    // protect page
    if (!token) {
      router.push("/loginOtp");
      return;
    }

    const data = localStorage.getItem("sanadResult");

    if (data) {
      setLicenses(JSON.parse(data));
    }
  }, []);

  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-center">وضعیت کارت و سند ماشین</h2>
      <img
        src="/images/ic_car_sanad.png"
        alt="ic_license_negative"
        className="w-28 mx-auto"
      />
      <p className="text-center text-xs md:text-sm">
        وضعیت کارت و سند ماشین شما به شرح زیر می باشد
      </p>

      <div
        dir="rtl"
        className={`bg-gray-100 rounded-xl p-4 text-sm md:max-w-xl md:mx-auto`}
      >
        <div className="flex flex-col gap-y-3">
          <div className="flex justify-between md:justify-center md:gap-x-8">
            <p>تاریخ چاپ کارت خودرو: </p>
            <p>{licenses.cardPrintDate}</p>
          </div>

          <div className="flex justify-between md:justify-center md:gap-x-4">
            <p>بارکد پستی کارت خودرو: </p>
            <p>{licenses.cardPostalBarcode}</p>
          </div>

          <div className="flex justify-between md:justify-center md:gap-x-8">
            <p> وضعیت کارت خودرو: </p>
            <p>{licenses.cardStatusTitle}</p>
          </div>

          <div className="flex justify-between md:justify-center md:gap-x-8">
            <p> تاریخ چاپ سند خودرو: </p>
            <p>{licenses.documentPrintDate}</p>
          </div>

          <div className="flex justify-between md:justify-center md:gap-x-24">
            <p>  وضعیت سند خودرو: </p>
            <p>{licenses.documentStatusTitle}</p>
          </div>

          <div className="flex justify-between md:justify-center md:gap-x-24">
            <p> پلاک خودرو :</p>
            <p>{licenses.plateWord}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

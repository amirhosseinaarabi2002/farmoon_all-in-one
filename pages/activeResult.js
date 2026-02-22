"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function ActiveResult() {
  const [licenses, setLicenses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    // protect page
    if (!token) {
      router.push("/loginOtp");
      return;
    }

    const data = localStorage.getItem("activePlateResult");

    if (data) {
      setLicenses(JSON.parse(data));
    }
  }, []);

  //   if (!licenses.length) {
  //     return (
  //       <div className="text-center p-6">اطلاعاتی یافت نشد</div>
  //     );
  //   }

  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-center">پلاک های فعال</h2>
      <img
        src="/images/ic_active_plaque.png"
        alt="ic_licesnse_status"
        className="w-28 mx-auto"
      />
      <p className="text-center text-xs md:text-sm">
        وضعیت پلاک های فعال شما به شرح زیر می باشد
      </p>
      {licenses.map((item, index) => (
        <div
          key={index}
          dir="rtl"
          className="bg-gray-100 rounded-xl p-4 text-sm"
        >
          <div
            dir="rtl"
            className={`${item.is_FAK === 0 ? "bg-success-200" : "bg-danger-200"} rounded-xl p-4 text-sm`}
          >
            <div className="flex flex-col gap-y-3">
              <div className="flex justify-between">
                <p>شماره پلاک: </p>
                <p>{item.plak}</p>
              </div>
              <div className="flex justify-between">
                <p>شماره سریال: </p>
                <p>{item.secInSerial}</p>
              </div>
              <div className="flex justify-between">
                <p>وضعیت پلاک: </p>
                <p>{item.is_FAK === 0 ? "فعال" : "غیر فعال"}</p>
              </div>

              {item.is_FAK === 0 ? (
                ""
              ) : (
                <>
                  <div className="flex justify-between">
                    <p> تاریخ فک پلاک: </p>
                    <p>{item.mnfk_SHDN_DATE}</p>
                  </div>
                  <div>
                    <p> محل فک پلاک: </p>
                    <p>{item.description}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

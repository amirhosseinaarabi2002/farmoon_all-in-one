"use client";

import { useState } from "react";
import { Button, Input, Select, SelectItem, addToast } from "@heroui/react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { getSanadApi } from "@/api/facility/sanad_api";

const alphabetOptions = [
  "الف",
  "ب",
  "پ",
  "ت",
  "ث",
  "ج",
  "چ",
  "ح",
  "خ",
  "د",
  "ذ",
  "ر",
  "ز",
  "ژ",
  "س",
  "ش",
  "ص",
  "ض",
  "ط",
  "ظ",
  "ع",
  "غ",
  "ف",
  "ق",
  "ک",
  "گ",
  "ل",
  "م",
  "ن",
  "و",
  "ه",
  "ی",
];

const Sanad = () => {
  const [mobile, setMobile] = useState("");
  const [national, setNational] = useState("");

  const [plate2Digit, setPlate2Digit] = useState("");
  const [plate3Digit, setPlate3Digit] = useState("");
  const [plateIran, setPlateIran] = useState("");
  const [alphabet, setAlphabet] = useState("");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const token = Cookies.get("token");

  const handleInquiry = async () => {
    if (
      !mobile ||
      !national ||
      !plate2Digit ||
      !plate3Digit ||
      !plateIran ||
      !alphabet
    ) {
      return toast.error("لطفا تمام اطلاعات را کامل وارد کنید");
    }

    if (mobile.length !== 11) {
      return toast.error("شماره موبایل نامعتبر است");
    }

    if (national.length !== 10) {
      return toast.error("کد ملی نامعتبر است");
    }

    if (!token) {
      addToast({
        title: "ابتدا وارد حساب کاربری شوید",
        color: "danger",
      });
      router.push("/loginOtp");
      return;
    }

    try {
      setLoading(true);

      const res = await getSanadApi(
        {
          "2digit": plate2Digit,
          alphabet: alphabet,
          "3digit": plate3Digit,
          iran: plateIran,
        },
        mobile,
        national,
      );

      localStorage.setItem("sanadResult", JSON.stringify(res));
      router.push("/sanadResult");
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
    <>
      {/* Form */}
      <div className="flex flex-col gap-4 p-4">
        <h2 className="text-center">وضعیت کارت و سند ماشین</h2>
        <img
          src="/images/ic_car_sanad.png"
          alt="ic_licesnse_status"
          className="w-28 mx-auto"
        />
        <p className="text-center text-xs md:text-sm">
          هزینه ی یکبار استعلام وضعیت کارت و سند ماشین ۱۶,170 تومان می باشد
        </p>
        <p className="text-center text-xs md:text-sm">
          برای پیگیری وضعیت کارت و سند ماشین اطلاعات زیر را تکمیل کنید
        </p>

        <div className="flex flex-col gap-6 max-w-md mx-auto">

          {/* Plate Container */}
          <div className="bg-white border-2 border-gray-300 rounded-xl p-2 flex flex-row-reverse items-center justify-between gap-2 shadow-sm">
            {/* 2 Digit */}
            <div className="iran-flag bg-blue-800 p-2 flex flex-col items-center gap-y-0.5 rounded-l-xl">
                    <img
                      src="/images/iran_flag.png"
                      alt="Iran Flag"
                      width={12}
                      height={12}
                    />
                    <div className="font-light text-[6px] text-center text-white">
                      IR
                    </div>
                    <div className="font-light text-[6px] text-center text-white">
                      IRAN
                    </div>
                  </div>
            <input
              type="text"
              inputMode="numeric"
              maxLength={2}
              value={plate2Digit}
              onChange={(e) =>
                setPlate2Digit(e.target.value.replace(/\D/g, ""))
              }
              placeholder="--"
              className="w-12 text-center text-lg outline-none"
            />

            {/* Alphabet */}
            <select
              value={alphabet}
              onChange={(e) => setAlphabet(e.target.value)}
              className="w-16 text-center bg-transparent outline-none"
            >
              <option value="">حرف</option>
              {alphabetOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* 3 Digit */}
            <input
              type="text"
              inputMode="numeric"
              maxLength={3}
              value={plate3Digit}
              onChange={(e) =>
                setPlate3Digit(e.target.value.replace(/\D/g, ""))
              }
              placeholder="---"
              className="w-16 text-center text-lg outline-none"
            />

            {/* Iran Code */}
            <div className="flex items-center gap-1 border-l pl-2">
              <span className="text-xs rotate-90">ایران</span>
              <input
                type="text"
                inputMode="numeric"
                maxLength={2}
                value={plateIran}
                onChange={(e) =>
                  setPlateIran(e.target.value.replace(/\D/g, ""))
                }
                placeholder="--"
                className="w-10 text-center text-lg outline-none"
              />
            </div>
          </div>

          {/* National Code */}
          <div>
            <label className="block mb-1 text-sm">کد ملی</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={10}
              value={national}
              onChange={(e) => setNational(e.target.value.replace(/\D/g, ""))}
              className="w-full border-2 border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block mb-1 text-sm">شماره موبایل</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={11}
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
              className="w-full border-2 border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleInquiry}
            disabled={loading}
            className="bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition disabled:opacity-50"
          >
            {loading ? "در حال استعلام..." : "استعلام وضعیت کارت و سند ماشین"}
          </button>
        </div>
        <p className="text-center text-xs md:text-sm">
          در صورت داشتن هرگونه ابهام و یا سوال در مورد این سرویس می توانید از
          منو در صفحه اصلی با پشتیبانی ارتباط بگیرید
        </p>
      </div>
    </>
  );
};

export default Sanad;

import React from "react";
import {
  InstagramLogo,
  LinkedinLogo,
  TelegramLogo,
  WhatsappLogo,
} from "@phosphor-icons/react";
import Link from "next/link";

const Footer = () => {
  return (
    <div dir="rtl">
      <footer className="rounded-t-xl bg-white/80 shadow-lg md:pr-20 mt-10">
        <div className="bg-slate-100 px-6 py-4 max-w-screen-xl mx-auto flex justify-between items-center rounded-3xl flex-col md:flex-row">
          <div className="flex items-center gap-x-2">
          <a href="https://farmooon.ir/khalafi/">
                  <img
                    src="/images/logo.png"
                    alt="فرمون استعلام خلافی"
                    width={40}
                    height={40}
                  />
                </a>
            <h4 className="font-Dana text-lg font-black text-teal-700">اپلیکیشن ما</h4>
          </div>
          <div className="flex gap-x-3 gap-y-2 flex-col md:flex-row mt-3 md:mt-0">
            <Link href="https://play.google.com/store/apps/details?id=com.vada.newfarmoon"><img src="/images/play.png" alt="google play" className="w-32 md:w-36 hover:scale-105 transition-all" /></Link>
            <Link href="https://myket.ir/app/com.vada.newfarmoon"><img src="/images/myket.png" alt="myket" className="w-32 md:w-36 hover:scale-105 transition-all" /></Link>
            <Link href="https://cafebazaar.ir/app/com.vada.newfarmoon"><img src="/images/bazar.png" alt="bazar" className="w-32 md:w-36 hover:scale-105 transition-all" /></Link>
          </div>
        </div>
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex gap-x-20">
            <div className="mb-6 md:mb-0">
              <h6 className="flex items-center gap-x-3 font-Dana text-lg font-black mb-3 text-teal-700">
                
                درباره فرمون
              </h6>
              <p className="font-Kalame text-xs/6 sm:text-sm/6 text-justify text-teal-gray-800 max-w-96">
                استعلام خلافی خودرو با کدملی و پلاک به صورت آنلاین و با گوشی
                موبایل به راحتی از طریق فرمون انجام می شود. برای مشاهده خلافی
                خودرو یا خودرو از برنامه فرمون استفاده کنید.
              </p>
            </div>
            <div className="grid grid-cols-2 md:flex md:gap-x-10">
              <div className="flex flex-wrap gap-x-20">
                <div className="max-w-96">
                  <h4 className="font-Dana font-black text-lg mb-3 text-teal-700">
                    دسترسی سریع
                  </h4>
                  <ul className="text-gray-500 dark:text-gray-400 font-bold font-Kalame flex flex-col gap-y-2">
                    <li>
                      <span className="text-xs sm:text-sm max-w-80 text-justify text-teal-gray-800 hover:text-teal-700 transition-colors">
                        <Link href="https://farmooon.ir/khalafi/#/carkhalafi">
                          مجموع خلافی موتور
                        </Link>
                      </span>
                    </li>
                    <li>
                      <span className="text-xs sm:text-sm max-w-80 text-justify text-teal-gray-800 hover:text-teal-700 transition-colors">
                        <Link href="https://farmooon.ir/khalafi/#/totalMotorKhalafi">
                          مجموع خلافی موتور
                        </Link>
                      </span>
                    </li>
                    <li>
                      <span className="text-xs sm:text-sm max-w-80 text-justify text-teal-gray-800 hover:text-teal-700 transition-colors">
                        <Link href="https://farmooon.ir/khalafi/#/motorkhalafi">
                          خلافی موتور با جزئیات
                        </Link>
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-Dana font-black text-lg mb-3 text-teal-700 xl:mt-0 md:mt-5 mt-6">
                    ما را دنبال کنید
                  </h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium flex items-center gap-x-3">
                    <li className="hover:text-teal-700 hover:scale-110 transition-all">
                      <a href="https://www.instagram.com/vada_house_of_mobile?igsh=MXFjeTEybTg0dzZ6dQ==">
                        <InstagramLogo size={32} />
                      </a>
                    </li>
                    <li className="hover:text-teal-700 hover:scale-110 transition-all">
                      <a href="https://www.linkedin.com/company/vada-house-of-mobile/">
                        <LinkedinLogo size={32} />
                      </a>
                    </li>
                    <li className="hover:text-teal-700 hover:scale-110 transition-all">
                      <a href="https://t.me/crmapps">
                        <TelegramLogo size={32} />
                      </a>
                    </li>
                    <li className="hover:text-teal-700 hover:scale-110 transition-all">
                      <a href="https://api.whatsapp.com/send/?phone=989109838553">
                        <WhatsappLogo size={32} />
                      </a>
                    </li>
                  </ul>
                  <a href="https://www.vada.ir/" className="w-40">
                    <img
                      className="w-40"
                      src="/images/vada_logo.png"
                      alt="vada"
                    />
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-y-3 pr-10">
                <div className="flex justify-center items-center mt-10 cursor-pointer w-36 h-40 rounded-lg bg-gray-100">
                  <a
                    referrerpolicy="origin"
                    target="_blank"
                    href="https://trustseal.enamad.ir/?id=127410&Code=VBz3oy64oKMGlqaf3SdM"
                  >
                    <img
                      referrerpolicy="origin"
                      src="https://trustseal.enamad.ir/logo.aspx?id=127410&Code=VBz3oy64oKMGlqaf3SdM"
                      alt=""
                      code="VBz3oy64oKMGlqaf3SdM"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

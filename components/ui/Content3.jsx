import { Car } from "iconsax-react";
import React from "react";

const Content3 = () => {
  return (
    <div>
      <div className="flex gap-x-1.5 max-w-screen-lg mx-auto mt-16 md:mt-20">
        <Car size={25} color="#0f766e" variant="Bulk" className="mr-2" />
        <h2 className="md:text-lg font-KalameBold">
          نحوه اعتراض به جریمه دو برگی{" "}
        </h2>
      </div>
      <div className="mt-5 flex justify-center items-center gap-x-5 flex-col md:flex-row-reverse">
        <p className="font-Kalame text-justify px-4 md:px-0 max-w-lg flex text-xs/6 md:text-sm/6">
          ✅ برای اعتراض به جرایم دوبرگی باید به محل تخلف درج شده بر روی قبض
          جریمه رانندگی خود دقت کنید. سپس می توانید با مراجعه به راهور منطقه ای
          که تخلف در آن اتفاق افتاده و ثبت شکایت نسبت به بررسی مجدد تخلف و
          رسیدگی بیشتر درخواست ثبت کنید. برخی از مراکز راهور در تهران دارای
          شماره تلفن برای پاسخگویی تلفنی هستند و می توان بدون حضور فیزیکی مورد
          را پیگیری کرد
        </p>
        <div className="px-1">
          <img
            src="/images/motor10.png"
            alt="بارکد پستی کارت موتور"
            width="450"
            height="240"
          />
        </div>
      </div>
    </div>
  );
};

export default Content3;

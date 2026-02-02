import { Car } from "iconsax-react";
import Link from "next/link";
import React from "react";

const Content1 = () => {
  return (
    <div className="mt-16 md:mt-20 max-w-screen-lg mx-auto">
      <div className="flex gap-x-1.5 mx-2">
        <Car size={25} color="#0f766e" variant="Bulk" />
        <h2 className="md:text-lg font-KalameBold mb-4">
          استعلام خلافی خودرو با کد ملی
        </h2>
      </div>
      <p className="font-Kalame text-xs/6 md:text-sm/6 mb-4 mx-4 text-justify">
        ✅ در حال حاضر دو روش برای استعلام خلافی خودرو آنلاین وجود دارد،
        استعلام خلافی خودروبا جزییات و مشاهده عکس محل تخلف و استعلام مجموع
        جرایم خودرو بدون تصویر محل تخلف که در این روش فقط مبلغ مجموع خلافی
        خودرو به شما نمایش داده می شود.
      </p>

      <p className="font-Kalame text-xs/6 md:text-sm/6 mb-4 mx-4 text-justify">
        ✅ برای استعلام خلافی خودرو با جزییات و با قابلیت نمایش عکس محل تخلف و
        همچنین پرداخت موردی و تکی جرایم رانندگی باید کدملی مالک وسیله نقلیه که
        بر روی کارت خودرو درج شده است را به همراه داشته باشید و در سایت فرمون
        وارد کنید.
      </p>
    </div>
  );
};

export default Content1;

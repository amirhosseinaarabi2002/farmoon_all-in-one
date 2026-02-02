import React from "react";

const Content2 = () => {
  return (
    <div className="mt-5 flex justify-center items-center gap-x-5 flex-col md:flex-row">
      <p className="font-Kalame text-justify px-4 md:px-0 max-w-lg flex text-xs/6 md:text-sm/6">✅
        پس از ورود به بخش استعلام خلافی با استفاده از شماره بارکد پستی مندرج روی
        کارت خودرو می توانید میزان جرایم خودرو خود را استعلام نماییدبرای استفاده
        از سامانه راهور120 نیاز به کد ۸ یا 9 رقمی درج شده در پشت کارت خودرو مالک
        خودرو و وارد کردن آن در بخش مورد نظر برای نمایش لیست تخلفات خودرو دارید.
      </p>
      <div className="px-1 mt-3 md:mt-0">
        <img src="/images/car_card_image.png" alt="بارکد پستی کارت موتور" width="450" height="240" />
      </div>
    </div>
  );
};

export default Content2;

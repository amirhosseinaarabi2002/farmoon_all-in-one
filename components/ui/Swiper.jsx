import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { Car } from "iconsax-react";

export default function MySwiper() {
  return (
    <>
      <div className="flex gap-x-1.5 max-w-screen-lg mx-auto mt-16 md:mt-20">
        <Car size={25} color="#0f766e" variant="Bulk" className="mr-2" />
        <h2 className="md:text-lg font-KalameBold">
          معمولا جرایم رانندگی ۴ نوع دارند: تسلیمی، دوبرگی، الصاقی و دوربینی{" "}
        </h2>
      </div>
      <Swiper pagination={true} modules={[Pagination]} className="">
        <SwiperSlide>
          {" "}
          <div className="flex justify-center items-center gap-x-5 flex-col md:flex-row">
            <p className="font-Kalame text-justify px-4 md:px-0 max-w-lg text-xs/6 md:text-sm/6">
              ✅<strong>جریمه تسلیمی : </strong>
              همان جریمه ای است که افسر پلیس شما را متوقف میکند و برگه جریمه را
              تسلیم شما میکند. برخی از بیشترین موارد جریمه های تسلیمی عبارتند از
              تخلف عدم بستن کمر بند، استفاده از تلفن همراه هنگام رانندگی و ....
            </p>
            <div className="px-1 mt-3 md:mt-0">
              <img
                src="/images/file (1).png"
                alt="بارکد پستی کارت خودرو"
                width="450"
                height="240"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="flex justify-center items-center gap-x-5 flex-col md:flex-row">
            <p className="font-Kalame text-justify px-4 md:px-0 max-w-lg text-xs/6 md:text-sm/6">
              ✅<strong> جریمه دو برگی : </strong>
              گاهی اوقات افسر راهنمایی رانندگی تخلف شما را مشاهده میکند اما
              امکان توقف شما را ندارد و یا حجم ترافیک آنقدر بالاست که نمیتوان با
              نگهداشتن خودروی شما ترافیک را بیشتر کرد و یا اینکه به شما ایست می
              دهد و شما به هر دلیلی خودروی خود را متوقف نمیکنید. البته در این
              مورد آخر باید جریمه عدم توجه به فرمان پلیس هم به جریمه اصلی شما
              اضافه شود. در این حالات افسر پلیس برگه جریمه ای که مخصوص راننده
              است را نزد خود نگه می دارد و نمی تواند آنرا تسلیم راننده کند. از
              این رو به این جرایم دوبرگی گفته شده است .
            </p>
            <div className="px-1 mt-3 md:mt-0">
              <img
                src="/images/motor5.png"
                alt="بارکد پستی کارت خودرو"
                width="450"
                height="240"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="flex justify-center items-center gap-x-5 flex-col md:flex-row">
            <p className="font-Kalame text-justify px-4 md:px-0 max-w-lg text-xs/6 md:text-sm/6">
              ✅<strong>جریمه الصاقی : </strong>
              به جرایمی که مامور پلیس به دلیل عدم حضور راننده پشت برف پاک کن
              الصاق میکند برگ جریمه الصاقی گفته می شود. بیشترین حالت ممکن برای
              این نوع جریمه همان پارک در مکان مطلقا ممنوع است. مثلا عدم استفاده
              از کمربند را نمی تواند الصاقی دانست
            </p>
            <div className="px-1 mt-3 md:mt-0">
              <img
                src="/images/file (7).png"
                alt="بارکد پستی کارت خودرو"
                width="450"
                height="240"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="flex justify-center items-center gap-x-5 flex-col md:flex-row">
            <p className="font-Kalame text-justify px-4 md:px-0 max-w-lg text-xs/6 md:text-sm/6">
              ✅<strong>جریمه دوربینی: </strong>
              همانطور که از اسمش پیداست جرایمی است که توسط دوربین ثبت می گردد.
              معمولا مامور پلیس تخلف هایی که با دوربین ثبت شده را بررسی و در
              سیستم ثبت میکند. مانند تجاوز از سرعت مجاز و یا ورود به محدوده طرح
              ترافیک
            </p>
            <div className="px-1 mt-3 md:mt-0">
              <img
                src="/images/motor2.png"
                alt="بارکد پستی کارت خودرو"
                width="450"
                height="240"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

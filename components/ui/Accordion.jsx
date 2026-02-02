
import { Accordion, AccordionItem } from "@heroui/react";
import { Car } from "iconsax-react";

export default function MyAccordion() {
  
  return (
    <>
      <div className="flex gap-x-1.5 max-w-screen-lg mx-auto mt-16 md:mt-20">
        <Car size={25} color="#0f766e" variant="Bulk" className="mr-2" />
        <h2 className="md:text-lg font-KalameBold">سوالات متداول </h2>
      </div>
      <div className="mt-5 max-w-screen-lg mx-auto flex items-center flex-col md:flex-row">
        <Accordion variant="shadow">
          <AccordionItem
          className="font-DanaDemiBold text-sm"
            key="1"
            aria-label="برای استعلام خلافی خودرویی که هنوز به نام من نیست چه کار کنم؟"
            title="برای استعلام خلافی خودرویی که هنوز به نام من نیست چه کار کنم؟"
          >
            <p className="text-xs/6 md:text-sm/6 text-justify font-Kalame">
              برای مشاهده خلافی خودرو آنلاین و رویت جزییات خلافی به همراه تصویر
              نیاز است که کد ملی و شماره موبایل مالک خودرو یعنی فردی که نام وی
              روی کارت خودرو درج شده را وارد کنید. اما اگر به شماره موبایل مالک
              دسترسی ندارید و هنوز خودرویی مورد نظر را تغییر مالکیت نداده اید،
              تنها میتوانید مجموع خلافی را با وارد کردن پلاک مشاهده کنید
            </p>
          </AccordionItem>
          <AccordionItem
          className="font-DanaDemiBold text-sm"
            key="2"
            aria-label="Accordion 2"
            title="برای مشاهده مشاهده عکس خلافی خودرو چه کار کنم؟"
          >
            <p className="text-xs/6 md:text-sm/6 text-justify font-Kalame">
              در جریمه های دوربینی که عکس خودروییشما در حال تخلف ثبت شده است این
              امکان وجود دارد که با پرداخت هزینه مازاد ۱۵۰۰ تومان برای هر عکس ،
              عکس محل تخلف خودرو خود را مشاهده کنید. سایر انواع جریمه ها مانند
              دوبرگی و تسلیمی و الصاقی امکان مشاهده تصویر را ندارند.
            </p>
          </AccordionItem>
          <AccordionItem
          className="font-DanaDemiBold text-sm"
            key="3"
            aria-label="Accordion 3"
            title="چند روز پس از پرداخت خلافی جریمه ما پاک می شود؟ پرداخت خلافی فوری چگونه است؟"
          >
            <p className="text-xs/6 md:text-sm/6 text-justify font-Kalame">
              اطلاعات پرداخت شما به محض پرداخت به مرکز راهور ارسال می شود و
              فرآیند پاک کردن جریمه پرداخت شده از خلافی شما اجرا خواهد شد و
              معمولا در روزهای اداری چندساعت پس از پرداخت از لیست خلافی شما پاک
              خواهد شد.
            </p>
          </AccordionItem>
          <AccordionItem
          className="font-DanaDemiBold text-sm"
            key="4"
            aria-label="Accordion 3"
            title="استعلام خلافی خودرو به صورت (رایگان) چگونه است؟"
          >
            <p className="text-xs/6 md:text-sm/6 text-justify font-Kalame">
              در حال حاضر استعلام خلافی خوردو آنلاین با پرداخت کارمزد هر خلافی
              ۶۲۰۰ تومان برای مشاهده خلافی با جزییات، یا خلافی مجموع امکان پذیر
              است و تنها راه مشاهده خلافی رایگان مراجعه به سایت راهور ۱۲۰ است.
            </p>
          </AccordionItem>
        </Accordion>
        <div>
          <img src="/images/motor6.png" alt="اعتراض دوبرگی" />
        </div>
      </div>
    </>
  );
}

import { Car } from "iconsax-react";
import React from "react";

const Describtion = () => {
  return (
    <div className=" flex justify-center items-center gap-x-5 flex-col md:flex-row">
      <div >
        <h2 className="md:text-lg font-KalameBold mb-4 mx-2 text-right flex gap-x-1">
                <Car size={25} color="#0f766e" variant="Bulk" />
          خلافی خودرو رایگان
          
        </h2>
      <p className="font-Kalame text-justify px-2 max-w-md flex text-xs/6 md:text-sm/6">
        استعلام خلافی خودرو رایگان تنها به روش مراجعه به سایت راهور و سامانه سخا
        امکان پذیر است که برای این منظور باید موبایل متعلق به مالک و کدملی مالک
        خودرو را بر روی کارت خودرو ثبت شده به همراه داشته باشید. چرا که
        برای استعلام خلافی به صورت رایگان نیاز به احراز هویت در سامانه سخا می
        باشد. برای گرفتن خلافی خودرو با پلاک ملی می توانید از سایت یا اپ
        فرمون استفاده کنید
      </p>
      </div>
      <div className="px-1 mt-3 md:mt-0">
        <video
          className="rounded-lg shadow-lg"
          width="450"
          height="240"
          controls
        >
          <source src="/videos/video.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Describtion;

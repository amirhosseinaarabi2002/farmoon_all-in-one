import React from "react";
export const ViolationRecord = ({ digit3, digit5 }) => {
  return (
    <div className="div-plaque">
      <div dir="ltr" className="flex justify-center items-center flex-row">
        <div className="bg-blue-800 p-2 flex flex-col items-center gap-y-0.5 mr-1 rounded-l-xl mb-10">
          <img
            src="/images/iran_flag.png"
            alt="Iran Flag"
            width={30}
            height={30}
          />
          <div className="font-light text-[10px] text-center text-white">
            IR
          </div>
          <div className="font-light text-[10px] text-center text-white">
            IRAN
          </div>
        </div>
        <div className="bg-gray-100 h-[70px] flex justify-center items-center text-lg px-2 rounded-md mr-1 font-DanaDemiBold mb-10">
          <span>{digit3}</span>
        </div>
        {/* <div className="bg-gray-100 h-[70px] flex justify-center items-center text-lg px-2 rounded-md mr-1 font-DanaDemiBold mb-10">
          <span>{letter}</span>
        </div> */}
        <div className="bg-gray-100 h-[70px] flex justify-center items-center text-lg px-2 rounded-md mr-1 font-DanaDemiBold mb-10">
          <span>{digit5}</span>
        </div>
        {/* <div className="bg-gray-100 h-[70px] flex justify-center items-center text-lg px-2 rounded-md mr-1 font-DanaDemiBold mb-10">
          <span>{iranNum}</span>
        </div> */}
        <div className="font-Kalame rotate-90 mb-9">
          <span>ایران</span>
        </div>
      </div>
    </div>
  );
};

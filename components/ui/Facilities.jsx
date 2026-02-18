import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Element4, MessageQuestion } from "iconsax-react";
import Link from "next/link";
import React from "react";

const Facilities = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        className="flex items-center-safe justify-start bg-transparent text-sm md:text-sm font-Kalame font-semibold"
        onPress={onOpen}
      >
        <Element4 size="28" color="#0f766e" />
        سایر امکانات 
      </Button>
      <Modal
      size="full"
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center items-center gap-1">
                <img src="/images/logo.png" alt="Logo" width={40} height={40} />
                <h1 className="font-KalameBold text-base text-warning-900">
                  امکانات فرمون
                </h1>
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-3 grid-rows-4 gap-6">
                  <a href="/licenseStatus" className="rounded-xl bg-gray-100 py-5">
                    <img src="/images/ic_licesnse_status.png" alt="farmoon icon" className="flex justify-center-safe items-center-safe mx-auto w-20" />
                    <p className="text-center text-xs font-Kalame mt-2">وضعیت گواهینامه</p>
                  </a>
                  <a href="/negative" className="rounded-xl bg-gray-100 py-5">
                    <img src="/images/ic_license_negative.png" alt="farmoon icon" className="flex justify-center-safe items-center-safe mx-auto w-20" />
                    <p className="text-center text-xs font-Kalame mt-2 line-clamp-1">نمره منفی گواهینامه</p>
                  </a>
                  <div className="rounded-xl bg-gray-100 py-5">
                    <img src="/images/ic_car_sanad.png" alt="farmoon icon" className="flex justify-center-safe items-center-safe mx-auto w-11" />
                    <p className="text-center text-xs font-Kalame mt-2 line-clamp-1">وضعیت سند و کارت ماشین</p>
                  </div>
                  {/* <div className="rounded-xl bg-gray-100 py-5">
                    <img src="/images/ic_freeway.png" alt="farmoon icon" className="flex justify-center-safe items-center-safe mx-auto w-12" />
                    <p className="text-center text-xs font-Kalame mt-2 line-clamp-1">عوارض آزادراهی</p>
                  </div> */}
                  <div className="rounded-xl bg-gray-100 py-5">
                    <img src="/images/ic_active_plaque.png" alt="farmoon icon" className="flex justify-center-safe items-center-safe mx-auto w-20" />
                    <p className="text-center text-xs font-Kalame mt-2 line-clamp-1">پلاک فعال</p>
                  </div>
                  <div className="rounded-xl bg-gray-100 py-5">
                    <img src="/images/ic_annual.png" alt="farmoon icon" className="flex justify-center-safe items-center-safe mx-auto w-13" />
                    <p className="text-center text-xs font-Kalame mt-2 line-clamp-1">عوارض سالیانه خودرو</p>
                  </div>
                  {/* <div className="rounded-xl bg-gray-100 py-5">
                    <img src="/images/ic_tarh.png" alt="farmoon icon" className="flex justify-center-safe items-center-safe mx-auto w-12" />
                    <p className="text-center text-xs font-Kalame mt-2 line-clamp-1">طرح ترافیک تهران</p>
                  </div> */}
                  <div className="rounded-xl bg-gray-100 py-5">
                    <img src="/images/ic_car_pricing.png" alt="farmoon icon" className="flex justify-center-safe items-center-safe mx-auto w-16" />
                    <p className="text-center text-xs font-Kalame mt-2 line-clamp-1">قیمت گذاری خودرو</p>
                  </div>
                  {/* <div className="rounded-xl bg-gray-100 py-5">
                    <img src="/images/esalat.png" alt="farmoon icon" className="flex justify-center-safe items-center-safe mx-auto w-16" />
                    <p className="text-center text-xs font-Kalame mt-1.5 line-clamp-1">بیمه شخص ثالث</p>
                  </div> */}
                  <div className="rounded-xl bg-gray-100 py-5">
                    <img src="/images/ic_driving_test.png" alt="farmoon icon" className="flex justify-center-safe items-center-safe mx-auto w-12" />
                    <p className="text-center text-xs font-Kalame mt-2 line-clamp-1">آزمون آیین نامه</p>
                  </div>
                  <div className="rounded-xl bg-gray-100 py-5">
                    <img src="/images/car_total.png" alt="farmoon icon" className="flex justify-center-safe items-center-safe mx-auto w-20" />
                    <p className="text-center text-xs font-Kalame mt-2 line-clamp-1">مجموع خلافی خودرو</p>
                  </div>
                  <div className="rounded-xl bg-gray-100 py-5">
                    <img src="/images/motorcycle_total.png" alt="farmoon icon" className="flex justify-center-safe items-center-safe mx-auto w-18" />
                    <p className="text-center text-xs font-Kalame mt-2 line-clamp-1">مجموع خلافی موتور</p>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Facilities;

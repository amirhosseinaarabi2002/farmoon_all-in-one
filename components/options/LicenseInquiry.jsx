"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  addToast,
} from "@heroui/react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { getLicenseStatusApi } from "@/api/facility/licenseStatus_api";

const LicenseInquiry = () => {
  const [mobile, setMobile] = useState("");
  const [national, setNational] = useState("");
  const [loading, setLoading] = useState(false);
  const [licenses, setLicenses] = useState([]);
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const token = Cookies.get("token");

  const handleInquiry = async () => {
    if (!mobile || !national) {
      return toast.error("لطفا اطلاعات را کامل وارد کنید");
    }

    if (mobile.length !== 11) {
      return toast.error("شماره موبایل نامعتبر است");
    }

    if (national.length !== 10) {
      return toast.error("کد ملی نامعتبر است");
    }

    // ✅ check token first
    if (!token) {
      addToast({
        title: "ابتدا وارد حساب کاربری شوید",
        promise: new Promise((resolve) => setTimeout(resolve, 3000)),
        variant: "flat",
        color: "danger",
      });
      router.push("/loginOtp");
      return;
    }

    try {
      setLoading(true);

      const res = await getLicenseStatusApi(mobile, national);

      const validLicenses = res.filter((item) => item.nationalNo !== "-");

      // ✅ store result for next page
      localStorage.setItem(
        "licenseStatusResult",
        JSON.stringify(validLicenses)
      );

      // ✅ navigate to result page
      router.push("/licenseStatusResult");
    } catch (error) {
      addToast({
        title: error.message,
        color: "danger",
      });
    }finally{
      setLoading(false);
    }
  };

  return (
    <>
      {/* Form */}
      <div className="flex flex-col gap-4 p-4">
        <h2 className="text-center">وضعیت گواهینامه</h2>
        <img
          src="/images/ic_licesnse_status.png"
          alt="ic_licesnse_status"
          className="w-28 mx-auto"
        />
        <p className="text-center text-xs md:text-sm">
          هزینه ی یکبار استعلام وضعیت گذاری ۱۶,170 تومان می باشد
        </p>
        <p className="text-center text-xs md:text-sm">
          برای پیگیری وضعیت صدور گواهینامه اطلاعات زیر را تکمیل کنید
        </p>
        <Input
          label="کد ملی"
          type="tel"
          maxLength={10}
          value={national}
          onChange={(e) => setNational(e.target.value)}
          className="max-w-80 mx-auto"
        />

        <Input
          label="شماره موبایل"
          type="tel"
          maxLength={11}
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="max-w-80 mx-auto"
        />

        <Button
          size="lg"
          onPress={handleInquiry}
          isLoading={loading}
          className="font-DanaDemiBold bg-teal-600 text-white w-80 mx-auto"
        >
          استعلام وضعیت گواهینامه
        </Button>
        <p className="text-center text-xs md:text-sm">
          در صورت داشتن هرگونه ابهام و یا سوال در مورد این سرویس می توانید از
          منو در صفحه اصلی با پشتیبانی ارتباط بگیرید
        </p>
      </div>

      {/* Result Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="opaque"
        size="lg"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-Kalame font-bold text-center">
                نتیجه استعلام گواهینامه
              </ModalHeader>

              <ModalBody>
                {licenses.length === 0 ? (
                  <div className="text-center text-sm text-gray-500 py-4">
                    اطلاعاتی یافت نشد
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {licenses.map((item, index) => (
                      <div
                        key={index}
                        dir="rtl"
                        className="bg-gray-100 rounded-xl p-4 text-sm"
                      >
                        <div className="grid grid-cols-2 gap-2">
                          <span>نام:</span>
                          <span className="font-bold">{item.firstName}</span>

                          <span>نام خانوادگی:</span>
                          <span className="font-bold">{item.lastName}</span>

                          <span>نوع گواهینامه:</span>
                          <span className="font-bold">{item.title}</span>

                          <span>وضعیت:</span>
                          <span className="font-bold text-teal-700">
                            {item.rahvarStatus}
                          </span>

                          <span>تاریخ چاپ:</span>
                          <span>{item.printDate}</span>

                          <span>مدت اعتبار:</span>
                          <span>{item.validYears} سال</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ModalBody>

              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  بستن
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default LicenseInquiry;

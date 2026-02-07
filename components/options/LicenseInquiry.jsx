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
} from "@heroui/react";
import toast from "react-hot-toast";
import getLicenseStatusApi from "@/api/facility/licenseStatus_api";

const LicenseInquiry = () => {
  const [mobile, setMobile] = useState("");
  const [national, setNational] = useState("");
  const [loading, setLoading] = useState(false);
  const [licenses, setLicenses] = useState([]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleInquiry = async () => {
    // ✅ validation
    if (!mobile || !national) {
      return toast.error("لطفا اطلاعات را کامل وارد کنید");
    }

    if (mobile.length !== 11) {
      return toast.error("شماره موبایل نامعتبر است");
    }

    if (national.length !== 10) {
      return toast.error("کد ملی نامعتبر است");
    }

    try {
      setLoading(true);

      const res = await getLicenseStatusApi(mobile, national);

      // ✅ remove dummy rows
      const validLicenses = res.filter(
        (item) => item.nationalNo !== "-"
      );

      setLicenses(validLicenses);
      onOpen();
    } catch (error) {
      console.error(error);
      toast.error(
        error.message === "User not logged in"
          ? "ابتدا وارد حساب کاربری شوید"
          : "خطا در دریافت اطلاعات"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Form */}
      <div className="flex flex-col gap-4 p-4">
        <Input
          label="شماره موبایل"
          type="tel"
          maxLength={11}
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <Input
          label="کد ملی"
          type="tel"
          maxLength={10}
          value={national}
          onChange={(e) => setNational(e.target.value)}
        />

        <Button
          color="primary"
          onPress={handleInquiry}
          isLoading={loading}
          className="font-DanaDemiBold"
        >
          استعلام گواهینامه
        </Button>
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

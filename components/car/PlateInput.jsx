"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { toast, Toaster } from "react-hot-toast";
import { getAppDataApi, getChargeWalletGateWayApi } from "@/api/car/wallet_api";
import { redirectToFarmoon } from "../RedirectFlutter";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Button,
  cn,
  Input,
  Select,
  SelectItem,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import CarPlates from "./CarPlates";
import { addToast } from "@heroui/toast";
import { getCarViolation } from "@/api/car/inquiry_api";
import { ViolationResponse } from "@/model/carViolationResponse";
import { ScaleLoader } from "react-spinners";

const CarPlateInput = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [selectedLetter, setSelectedLetter] = useState("ب");
  const [violationData] = useState(null);
  const router = useRouter();
  const [requestSource, setRequestSource] = useState("cache"); // Default source
  const [updateInquiryLoading, setUpdateInquiryLoading] = useState(false);
  const [cacheInquiryLoading, setCacheInquiryLoading] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isChargingWallet, setIsChargingWallet] = useState(false);
  const [isChargingWallets, setIsChargingWallets] = useState(false);
  const [violationPrice, setViolationPrice] = useState("");
  const [isGoTotalViolationDialogVisible, setIsGoTotalViolationVisible] =
    useState(false);
  const token = Cookies.get("token");
  const walletCredit = Cookies.get("walletCredit");
  const items = [
    "ب",
    "ت",
    "ج",
    "چ",
    "ح",
    "خ",
    "د",
    "ذ",
    "ر",
    "ز",
    "س",
    "ش",
    "ص",
    "ض",
    "ظ",
    "ط",
    "ع",
    "غ",
    "ف",
    "ق",
    "ک",
    "ل",
    "م",
    "ن",
    "و",
    "ه",
    "ی",
  ];

  // HeroUI modal controls
  const {
    isOpen: isPaymentModalOpen,
    onOpen: onPaymentModalOpen,
    onOpenChange: onPaymentModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isTotalViolationModalOpen,
    onOpen: onTotalViolationModalOpen,
    onOpenChange: onTotalViolationModalOpenChange,
  } = useDisclosure();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("violationFormData"));
    if (savedData) {
      setValue("digit2", savedData.digit2);
      setSelectedLetter(savedData.selectedLetter);
      setValue("digit3", savedData.digit3);
      setValue("iranNum", savedData.iranNum);
      setValue("mobileNumber", savedData.mobileNumber);
      setValue("country", savedData.country);
      setRequestSource(savedData.requestSource || "cache");
    }
  }, [setValue]);

  const getViolationSubmit = async (data) => {
    if (!token) {
      // Save form data to local storage
      localStorage.setItem(
        "violationFormData",
        JSON.stringify({
          digit2: data.digit2,
          selectedLetter,
          digit3: data.digit3,
          iranNum: data.iranNum,
          mobileNumber: data.mobileNumber,
          country: data.country,
          requestSource,
        })
      );
      router.push("/loginOtp");
      return;
    }

    const requestData = {
      plate: {
        "2digit": data.digit2,
        alphabet: selectedLetter,
        "3digit": data.digit3,
        iran: data.iranNum,
      },
      mobile_number: data.mobileNumber,
      national_code: data.country,
      source: requestSource,
    };

    try {
      if (requestSource === "update") {
        setUpdateInquiryLoading(true);
      } else {
        setCacheInquiryLoading(true);
      }
      const response = await getCarViolation(requestData);
      if (response.status === 200) {
        const violationResponse = new ViolationResponse(
          response.data.bills,
          response.data.plaque,
          response.data.totalPrice,
          response.data.totalPaperId,
          response.data.totalPaymentId,
          response.data.vehicleType,
          response.data.wallet
        );
        localStorage.setItem(
          "violationData",
          JSON.stringify(violationResponse)
        );
        localStorage.removeItem("violationFormData");
        Cookies.set("natCode", data.country, {
          secure: false,
          sameSite: "lax",
        });
        Cookies.set("inquiryMobileNumber", data.mobileNumber, {
          secure: false,
          sameSite: "Lax",
        });

        router.push({
          pathname: "/carViolation",
        });
      } else if (response.status === 499) {
        setIsDialogVisible(true);
        onPaymentModalOpen();
      } else if (response.status === 480) {
        setIsGoTotalViolationVisible(true);
        onTotalViolationModalOpen();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      // toast.error("ظاهرا دسترسی شما به اینترنت قطع شده است");
    } finally {
      if (requestSource === "update") {
        setUpdateInquiryLoading(false);
      } else {
        setCacheInquiryLoading(false);
      }
    }
  };

  const handlePlateClick = (plate) => {
    setValue("digit2", plate.plateInfo.digit2);
    setSelectedLetter(plate.plateInfo.alphabet);
    setValue("digit3", plate.plateInfo.digit3);
    setValue("iranNum", plate.plateInfo.iranNum);
    setValue("mobileNumber", plate.mobileNumber);
    setValue("country", plate.nationalCode);
  };

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        const response = await getAppDataApi();
        if (response && response.data) {
          setViolationPrice(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch wallet credit:", error);
      } finally {
      }
    };

    fetchAppData();
  }, []);

  const getChargeWalletGateWaySubmit = async (amount) => {
    const requestBodyParameter = {
      amount: amount,
      page: "/",
      description: "افزایش اعتبار کیف پول",
    };
    try {
      if (amount === violationPrice.naji_price) {
        setIsChargingWallet(true);
      } else {
        setIsChargingWallets(true);
      }

      const response = await getChargeWalletGateWayApi(requestBodyParameter);
      if (response.status === 200) {
        toast.success("در حال انتقال به درگاه پرداخت");
        window.open(response.data.url, "_self");
        setIsDialogVisible(false);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      // toast.error("ظاهرا دسترسی شما به اینترنت قطع شده است");
    } finally {
      if (amount === violationPrice.naji_price) {
        setIsChargingWallet(false);
      } else {
        setIsChargingWallets(false);
      }
    }
  };

  // Input handler to limit numbers only and enforce max length
  const handleNumberInput = (e, maxLength) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > maxLength) {
      value = value.slice(0, maxLength);
    }
    e.target.value = value;
  };

  return (
    <div className="flex justify-center items-center gap-x-10 flex-col md:flex-row">
      <form
        onSubmit={handleSubmit(getViolationSubmit)}
        className="car-plate-form flex justify-center items-center flex-col bg-white mt-5 md:px-10 py-5 rounded-2xl shadow-sm md:shadow-md"
      >
        <h2 className=" font-KalameBold mb-1">
         جزئیات کامل خلافی همراه تصویر مکان تخلف
        </h2>
        <p className="mb-8 text-sm text-gray-600">
          (هزینه ی استعلام خلافی ۱۶٬۱۷۰ تومان)
        </p>

        <div className="car-plate-container flex flex-row-reverse justify-center items-center mb-5 w-[340px]">
          <div className="iran-flag bg-blue-800 p-2 flex flex-col items-center gap-y-0.5 mr-1 rounded-l-xl">
            <img
              src="/images/iran_flag.png"
              alt="Iran Flag"
              width={12}
              height={10}
            />
            <div className="font-light text-[8px] text-center text-white">
              IR
            </div>
            <div className="font-light text-[8px] text-center text-white">
              IRAN
            </div>
          </div>
          <input
            size="lg"
            type="text"
            {...register("digit2", { 
              required: true, 
              maxLength: 2,
              pattern: {
                value: /^[0-9]{2}$/,
                message: "قسمت اول پلاک باید دو رقمی باشد"
              }
            })}
            placeholder="_ _"
            inputMode="numeric"
            onInput={(e) => handleNumberInput(e, 2)}
            className="plate-input mr-2 font-DanaDemiBold w-12 h-12 text-center border-none outline-none bg-gray-100 rounded-lg"
          />
          <select
            size="lg"
            placeholder="ب"
            value={selectedLetter}
            onChange={(e) => setSelectedLetter(e.target.value)}
            className="plate-input font-DanaDemiBold mr-2 w-12 h-12 text-center border-none outline-none bg-gray-100 rounded-lg"
          >
            {items.map((item, index) => (
              <option
                key={index}
                value={item}
                className="text-black font-DanaDemiBold"
              >
                {item}
              </option>
            ))}
          </select>
          <input
            size="lg"
            type="text"
            {...register("digit3", { 
              required: true, 
              maxLength: 3,
              pattern: {
                value: /^[0-9]{3}$/,
                message: "قسمت سوم پلاک باید سه رقمی باشد"
              }
            })}
            placeholder="_ _ _"
            inputMode="numeric"
            onInput={(e) => handleNumberInput(e, 3)}
            className="plate-input mr-2 font-DanaDemiBold w-12 h-12 text-center border-none outline-none bg-gray-100 rounded-lg"
          />
          <input
            size="lg"
            type="text"
            {...register("iranNum", { 
              required: true, 
              maxLength: 2,
              pattern: {
                value: /^[0-9]{2}$/,
                message: "شماره ایران باید دو رقمی باشد"
              }
            })}
            placeholder="_ _"
            inputMode="numeric"
            onInput={(e) => handleNumberInput(e, 2)}
            className="plate-input font-DanaDemiBold w-12 h-12 text-center border-none outline-none bg-gray-100 rounded-lg"
          />
          <div className="iran-text rotate-90 text-sm font-Kalame">
            <div>ایران</div>
          </div>
        </div>

        <input
        dir="rtl"
          size="lg"
          type="tel"
          {...register("mobileNumber", {
            required: "شماره موبایل الزامی است",
            minLength: {
              value: 11,
              message: "شماره موبایل باید 11 رقمی باشد"
            },
            maxLength: {
              value: 11,
              message: "شماره موبایل باید 11 رقمی باشد"
            },
            pattern: {
              value: /^09[0-9]{9}$/,
              message: "شماره موبایل معتبر نیست (با 09 شروع شود)"
            }
          })}
          placeholder="(شماره موبایل)"
          maxLength={11}
          inputMode="numeric"
          onInput={(e) => handleNumberInput(e, 11)}
          className="font-DanaDemiBold mb-3 w-72 h-12 border-none outline-none bg-gray-100 rounded-lg pr-4"
        />
        <input
          size="lg"
          type="text"
          {...register("country", { 
            required: "کد ملی الزامی است",
            minLength: {
              value: 10,
              message: "کد ملی باید 10 رقمی باشد"
            },
            maxLength: {
              value: 10,
              message: "کد ملی باید 10 رقمی باشد"
            },
            pattern: {
              value: /^[0-9]{10}$/,
              message: "کد ملی باید عددی باشد"
            }
          })}
          placeholder="(کد ملی)"
          inputMode="numeric"
          onInput={(e) => handleNumberInput(e, 10)}
          className="nat-mobile-input font-DanaDemiBold mb-3 w-72 h-12 border-none outline-none bg-gray-100 rounded-lg pr-4"
        />

        <Button
          size="lg"
          type="submit"
          className="submit-button w-[300px] mb-2 bg-teal-700 text-white"
          onPress={() => setRequestSource("update")}
        >
          {updateInquiryLoading ? (
            <ScaleLoader color="#fff" height={15} width={2} />
          ) : (
            <span className="font-DanaDemiBold">استعلام خلافی</span>
          )}
        </Button>
        <Button
          variant="shadow"
          size="lg"
          type="submit"
          className="submit-button w-[300px] mb-2"
          onPress={() => setRequestSource("cache")}
        >
          {cacheInquiryLoading ? (
            <ScaleLoader color="#0f766e" height={15} width={2} />
          ) : (
            <span className="font-DanaDemiBold">تاریخچه خلافی</span>
          )}
        </Button>

        {violationData && (
          <div className="violation-data">
            <h3>Violation Data:</h3>
            <pre>{JSON.stringify(violationData, null, 2)}</pre>
          </div>
        )}

        <div className="error-div-cotainer flex flex-col text-sm font-Kalame">
          {errors.digit2 && (
            <span className="textfiled-error">
              {errors.digit2.message || "‼️ قسمت اول پلاک باید دو رقمی باشد"}
            </span>
          )}
          {errors.digit3 && (
            <span className="textfiled-error">
              {errors.digit3.message || "‼️ قسمت سوم پلاک باید سه رقمی باشد"}
            </span>
          )}
          {errors.iranNum && (
            <span className="textfiled-error">
              {errors.iranNum.message || "‼️ لطفا شماره ایران را وارد کنید"}
            </span>
          )}
          {errors.mobileNumber && (
            <span className="textfiled-error">
              {errors.mobileNumber.message || "‼️ شماره موبایل معتبر نیست"}
            </span>
          )}
          {errors.country && (
            <span className="textfiled-error">
              {errors.country.message || "‼️ کد ملی معتبر نیست"}
            </span>
          )}
        </div>

        <div>
          <CarPlates onPlateClick={handlePlateClick} />
        </div>

        {/* Payment Modal */}
        <Modal
          isOpen={isPaymentModalOpen}
          onOpenChange={onPaymentModalOpenChange}
          backdrop="opaque"
          classNames={{
            backdrop:
              "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                <ModalBody>
                  <div>
                    <h2>
                      {!violationPrice ? (
                        <p className="text-gray-500 text-center mt-5">
                          در حال بارگذاری قیمت...
                        </p>
                      ) : walletCredit < violationPrice.naji_price ? (
                        <p className="font-Kalame font-semibold text-red-700 text-center mt-5">
                          موجودی کافی نیست
                        </p>
                      ) : (
                        <p className="font-Kalame font-semibold text-teal-700 text-center mt-3">
                          اعتبار کیف پول : {walletCredit}
                        </p>
                      )}
                    </h2>

                    <p className="font-Kalame text-center font-semibold my-3">
                      هزینه ی استعلام خلافی{" "}
                      {violationPrice?.naji_price?.toLocaleString("fa-IR") ??
                        "۰"}{" "}
                      تومان می باشد
                    </p>
                    <Button
                      size="lg"
                      color="secondary"
                      className="font-DanaDemiBold mx-2"
                      onPress={() =>
                        getChargeWalletGateWaySubmit(violationPrice.naji_price)
                      }
                    >
                      {isChargingWallet ? (
                        <ScaleLoader color="#fff" height={15} width={2} />
                      ) : (
                        <span>
                          افزایش اعتبار{" "}
                          {violationPrice?.naji_price?.toLocaleString(
                            "fa-IR"
                          ) ?? "۰"}{" "}
                          تومان {"("} یک بار استعلام خلافی {")"}
                        </span>
                      )}
                    </Button>
                    <Button
                      size="lg"
                      color="secondary"
                      className="font-DanaDemiBold mx-2 mt-2"
                      onPress={() =>
                        getChargeWalletGateWaySubmit(
                          violationPrice.naji_price * 2
                        )
                      }
                    >
                      {isChargingWallets ? (
                        <ScaleLoader color="#fff" height={15} width={2} />
                      ) : (
                        <span>
                          افزایش اعتبار{" "}
                          {(violationPrice.naji_price * 2).toLocaleString(
                            "fa-IR"
                          )}{" "}
                          تومان {"("} دوبار استعلام خلافی {")"}
                        </span>
                      )}
                    </Button>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    className="font-DanaDemiBold my-3"
                    onPress={onClose}
                  >
                    بستن
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        {/* Total Violation Modal */}
        <Modal
          isOpen={isTotalViolationModalOpen}
          onOpenChange={onTotalViolationModalOpenChange}
          backdrop="opaque"
          classNames={{
            backdrop:
              "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                <ModalBody>
                  <div className="dialog-content p-5">
                    <h3 className="text-center font-Kalame font-semibold mb-3 text-lg">
                      کدملی با شماره موبایل تطابق ندارد
                    </h3>
                    <p className="font-Kalame text-center mb-3">
                      اگر به اطلاعات مالک دسترسی ندارید، میتوانید از استعلام
                      خلافی مجموع بدون نیاز به کدملی استفاده کنید
                    </p>
                    <div className="flex justify-center items-center">
                      <Button
                        className="font-Kalame"
                        color="primary"
                        variant="shadow"
                        onPress={onClose}
                      >
                        ویرایش اطلاعات
                      </Button>
                    </div>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </form>
      <div className="mt-8">
        <h1 className="md:text-lg font-KalameBold mb-4 mx-2 lg:mr-20">
          گرفتن رایگان خلافی خودرو با پلاک و خلافی خودرو (رایگان)
        </h1>
        <p className="max-w-96 font-Kalame text-xs/7 md:text-sm/7 text-justify mx-2 lg:mr-20">
          برای <strong>استعلام رایگان خلافی خودرو</strong> تنها روشی که در حال
          حاضر وجود دارد از طریق اینترنت و ورود به سایت پلیس راهور یا همان سایت
          راهور 120 است. اما سایر روش های <strong>خلافی خودرو (رایگان)</strong>{" "}
          و جریمه ماشین با پرداخت هزینه اندکی انجام می شود و رایگان نیستند
        </p>
        <div className="mt- mx-2 md:mx-0">
          <img
            src="/images/file (3).png"
            alt="خلافی خودرو (رایگان)"
            className="w-[550px] md:h-80"
          />
        </div>
      </div>
    </div>
  );
};

export default CarPlateInput;
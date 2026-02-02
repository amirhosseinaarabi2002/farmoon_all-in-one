"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { getCarViolation } from "../api/inquiry_api";
import { getAppDataApi, getChargeWalletGateWayApi } from "../api/wallet_api";
import { redirectToFarmoon } from "../components/RedirectFlutter";
import { ViolationResponse } from "../model/MotorViolationResponse";
import Link from "next/link";
import { useRouter } from "next/router";
import { addToast } from "@heroui/toast";
import {
  Button,
  cn,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import CarPlates from "./MororPlates";
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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

  // Input handler to limit numbers only and enforce max length
  const handleNumberInput = (e, maxLength) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > maxLength) {
      value = value.slice(0, maxLength);
    }
    e.target.value = value;
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("violationFormData"));
    if (savedData) {
      // setSelectedLetter(savedData.selectedLetter);
      setValue("digit3", savedData.digit3);
      setValue("digit5", savedData.digit5);
      // setValue("iranNum", savedData.iranNum);
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
          // selectedLetter,
          digit3: data.digit3,
          digit5: data.digit5,
          // iranNum: data.iranNum,
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
        // alphabet: selectedLetter,
        "3digit": data.digit3,
        "5digit": data.digit5,
        // iran: data.iranNum,
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
          pathname: "/violation",
        });
      } else if (response.status === 499) {
        setIsDialogVisible(true);
      } else if (response.status === 480) {
        setIsGoTotalViolationVisible(true);
      } else {
        // toast.error(response.message);
        addToast({
          title: response.message || "مشکلی رخ داده است، لطفا مجددا تلاش کنید.",
          promise: new Promise((resolve) => setTimeout(resolve, 3000)),
          variant: "flat",
          color: "danger",
        });
      }
    } catch (error) {
      //   toast.error("ظاهرا دسترسی شما به اینترنت قطع شده است");
      // addToast({
      //   title: response.message || "ظاهرا دسترسی شما به اینترنت قطع شده است",
      //   promise: new Promise((resolve) => setTimeout(resolve, 3000)),
      //   variant: "flat",
      //   color: "danger",
      // });
    } finally {
      if (requestSource === "update") {
        setUpdateInquiryLoading(false);
      } else {
        setCacheInquiryLoading(false);
      }
    }
  };

  const handlePlateClick = (plate) => {
    // setSelectedLetter(plate.plateInfo.alphabet);
    setValue("digit3", plate.plateInfo.digit3);
    setValue("digit5", plate.plateInfo.digit5);
    // setValue("iranNum", plate.plateInfo.iranNum);
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
        // toast.success("در حال انتقال به درگاه پرداخت");
        addToast({
          title: response.message || "در حال انتقال به درگاه پرداخت",
          promise: new Promise((resolve) => setTimeout(resolve, 3000)),
          variant: "flat",
          color: "danger",
        });
        window.open(response.data.url, "_self");
        setIsDialogVisible(false);
      } else {
        // toast.error(response.message);
        addToast({
          title: response.message || "مشکلی رخ داده است، لطفا مجددا تلاش کنید.",
          promise: new Promise((resolve) => setTimeout(resolve, 3000)),
          variant: "flat",
          color: "danger",
        });
      }
    } catch (error) {
      //   toast.error("ظاهرا دسترسی شما به اینترنت قطع شده است");
      // addToast({
      //   title: "ظاهرا دسترسی شما به اینترنت قطع شده است",
      //   promise: new Promise((resolve) => setTimeout(resolve, 3000)),
      //   variant: "flat",
      //   color: "danger",
      // });
    } finally {
      if (amount === violationPrice.naji_price) {
        setIsChargingWallet(false);
      } else {
        setIsChargingWallets(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center gap-x-10 flex-col md:flex-row ">
      <form
        onSubmit={handleSubmit(getViolationSubmit)}
        className="car-plate-form flex justify-center items-center flex-col bg-white px-5 md:px-10 py-5 rounded-2xl shadow-sm md:shadow-md"
      >
        <h2 className=" font-KalameBold mb-1">
         جزئیات کامل خلافی همراه تصویر مکان تخلف
        </h2>
        <p className="mb-8 text-sm text-gray-600">
          (هزینه ی استعلام خلافی ۱۶٬۱۷۰ تومان)
        </p>

        <div className="border-2 rounded-3xl w-40 mb-5 py-3 border-gray-700">
          <div className="car-plate-container flex flex-row-reverse justify-center">
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
            {/* <select
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
              </select> */}
            <div className="flex flex-col gap-y-1 items-center-safe">
              <input
                size="lg"
                type="text" // Changed from "number" to "text"
                {...register("digit3", { 
                  required: true, 
                  maxLength: 3,
                  pattern: {
                    value: /^[0-9]{3}$/,
                    message: "قسمت اول پلاک باید سه رقمی باشد"
                  }
                })}
                placeholder="_ _ _"
                inputMode="numeric"
                onInput={(e) => handleNumberInput(e, 3)}
                className="plate-input mr-2 font-DanaDemiBold w-12 h-12 text-center border-none outline-none bg-gray-100 rounded-lg"
              />
              <input
                size="lg"
                type="text" // Changed from "number" to "text"
                {...register("digit5", { 
                  required: true, 
                  maxLength: 5,
                  pattern: {
                    value: /^[0-9]{5}$/,
                    message: "قسمت دوم پلاک باید پنج رقمی باشد"
                  }
                })}
                placeholder="_ _ _ _ _"
                inputMode="numeric"
                onInput={(e) => handleNumberInput(e, 5)}
                className="plate-input mr-2 font-DanaDemiBold w-18 h-12 text-center border-none outline-none bg-gray-100 rounded-lg"
              />
            </div>
          </div>
          {/* <input
            size="lg"
            type="text"
            {...register("iranNum", { required: true, maxLength: 2 })}
            placeholder="_ _"
            className="plate-input font-DanaDemiBold w-12 h-12 text-center border-none outline-none bg-gray-100 rounded-lg"
            maxLength={2}
          /> */}
          {/* <div className="iran-text rotate-90 text-sm font-Kalame">
            <div>ایران</div>
          </div> */}
        </div>

        <input
          dir="rtl"
          size="lg"
          type="tel" // Better for phone numbers
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
          inputMode="numeric"
          onInput={(e) => handleNumberInput(e, 11)}
          className="font-DanaDemiBold mb-3 w-72 h-12 border-none outline-none bg-gray-100 rounded-lg pr-4"
        />
        <input
          size="lg"
          type="text" // Changed from "number" to "text"
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
          {errors.digit3 && (
            <span className="textfiled-error">
              {errors.digit3.message || "‼️ قسمت اول پلاک باید سه رقمی باشد"}
            </span>
          )}
          {errors.digit5 && (
            <span className="textfiled-error">
              {errors.digit5.message || "‼️ قسمت دوم پلاک باید پنج رقمی باشد"}
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

        {violationPrice && (
          <Modal
            isOpen={isDialogVisible}
            backdrop="opaque"
            classNames={{
              backdrop:
                "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
            }}
            onOpenChange={(open) => setIsDialogVisible(open)}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                  <ModalBody>
                    <div className="mb-6">
                      <h2>
                        {walletCredit < violationPrice.naji_price ? (
                          <p className="font-Kalame font-semibold text-red-700 text-center mt-5">
                            موجودی کافی نیست
                          </p>
                        ) : (
                          <p className="font-Kalame font-semibold text-teal-700 text-center mt-3">
                            اعتبار کیف پول : {walletCredit}
                          </p>
                        )}
                      </h2>

                      <p className="font-Kalame text-center font-semibold my-4">
                        هزینه‌ی استعلام خلافی{" "}
                        {violationPrice.naji_price.toLocaleString("fa-IR")}{" "}
                        تومان می‌باشد
                      </p>

                      <Button
                        size="lg"
                        color="secondary"
                        variant="shadow"
                        className="font-DanaDemiBold w-80 text-sm flex justify-center items-center mx-auto"
                        onPress={() =>
                          getChargeWalletGateWaySubmit(
                            violationPrice.naji_price
                          )
                        }
                      >
                        {isChargingWallet ? (
                          <ScaleLoader color="#fff" height={15} width={2} />
                        ) : (
                          <span>
                            افزایش اعتبار{" "}
                            {violationPrice.naji_price.toLocaleString("fa-IR")}{" "}
                            تومان {"("} یک‌بار استعلام خلافی {")"}
                          </span>
                        )}
                      </Button>

                      <Button
                        size="lg"
                        color="secondary"
                        variant="shadow"
                        className="font-DanaDemiBold mt-3 w-80 text-sm flex justify-center items-center mx-auto"
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
                            تومان {"("} دو بار استعلام خلافی {")"}
                          </span>
                        )}
                      </Button>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={() => setIsDialogVisible(false)}
                    >
                      بستن
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        )}

        <Modal
          isOpen={isGoTotalViolationDialogVisible}
          onOpenChange={(open) => setIsGoTotalViolationVisible(open)}
          backdrop="opaque"
          classNames={{
            backdrop:
              "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
          }}
        >
          <ModalContent className="flex justify-center items-center flex-col mx-auto w-[400px]">
            <div className="dialog-content p-5">
              <h3 className="text-center font-Kalame font-semibold mb-3 text-lg">
                کدملی با شماره موبایل تطابق ندارد
              </h3>
              <p className="font-Kalame text-center mb-3">
                اگر به اطلاعات مالک دسترسی ندارید، میتوانید از استعلام خلافی
                مجموع بدون نیاز به کدملی استفاده کنید
              </p>
              <div className="flex justify-center items-center gap-x-4">
                <Button
                  className="font-Kalame"
                  color="primary"
                  variant="shadow"
                  onPress={() => setIsGoTotalViolationVisible(false)}
                >
                  ویرایش اطلاعات
                </Button>
              </div>
            </div>
          </ModalContent>
        </Modal>
      </form>
      <div className="mt-8">
        <h1 className="md:text-lg font-KalameBold mb-4 mx-2 lg:mr-20 ">
          استعلام خلافی موتور سیکلت با پلاک انلاین
        </h1>
        <p className="max-w-96 font-Kalame text-xs/7 md:text-sm/7 text-justify mx-2 lg:mr-20 ">
          برای استعلام خلافی موتور سیکلت خود می توانید با وارد کردن پلاک موتور
          سیکلت به صورت انلاین جزییات خلافی و حتی عکس محل تخلف را مشاهده کنید.
          توجه داشته باشید وارد کردن کدملی مالک موتور سیکلت ضروری است.
        </p>
        <div className="mt- mx-2 md:mx-0">
          <img
            src="/images/motor1.png"
            alt="خلافی موتور سیکلت"
            className="w-[550px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default CarPlateInput;
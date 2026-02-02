"use client"; // Required for client-side rendering in Next.js App Router
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { getCarViolationImageApi } from "../api/inquiry_api";
import moment from "moment-jalaali";
import { ViolationRecord } from "../components/ViolationRecord";
import { payFineApi } from "../api/pay_fine_api";
import Image from "next/image";

import { getAppDataApi, getChargeWalletGateWayApi } from "@/api/wallet_api";

import {
  addToast,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import Link from "next/link";

const ViolationSumResult = () => {
  const [showViolationImage, setShowViolationImage] = useState(false);
  const [loadingStates, setLoadingStates] = useState([]);
  const [payFineLoadingStates, setPayFineLoadingStates] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [violationData, setViolationData] = useState(null); // Initialize state for violation data
  const { isOpen, isOpen2, onOpen, onOpenChange } = useDisclosure();
  const [isChargingWallet, setIsChargingWallet] = useState(false);
  const [isChargingWallets, setIsChargingWallets] = useState(false);
  const [violationPrice, setViolationPrice] = useState("");
  const mobileNumber = Cookies.get("inquiryMobileNumber");
  const natCode = "1490009078";
  const router = useRouter();
  const REDIRECT_LINK = "https://farmooon.com/mag/tools/";
  const token = Cookies.get("token");
  const walletCredit = Cookies.get("wallet");

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  //   useEffect(() => {
  //     const fetchAppData = async () => {
  //       try {
  //         const response = await getAppDataApi();
  //         if (response && response.data) {
  //           setViolationPrice(response.data);
  //         }
  //       } catch (error) {
  //         console.error("Failed to fetch wallet credit:", error);
  //       } finally {
  //       }
  //     };

  //     fetchAppData();
  //   }, []);

  useEffect(() => {
    // Redirect to loginOtp if mobileNumber is not present
    if (!mobileNumber) {
      router.push("/loginOtp");
    }
  }, [mobileNumber, router]);

  useEffect(() => {
    // Fetch violation data from localStorage on the client
    const storedData = localStorage.getItem("violationSumData");
    if (storedData) {
      setViolationData(JSON.parse(storedData));
    }
  }, []);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("fa-IR").format(amount) + " ریال";
  };

  const toJalaliDate = (gregorianDate) => {
    return moment(gregorianDate, "YYYY/MM/DD HH:mm:ss").format("jYYYY/jMM/jDD");
  };

  const getPayFineGateWaySubmit = async (billId, payId) => {
    const requestData = {
      bills: [
        {
          BillID: billId,
          PaymentID: payId,
        },
      ],
      mobile_number: mobileNumber,
      redirect_link: REDIRECT_LINK,
    };
    try {
      setPayFineLoadingStates(() => {
        const newState = true;
        return newState;
      });
      const response = await payFineApi(requestData);
      if (response.status === 200) {
        addToast({
          title: "انتقال به درگاه پرداخت",
          promise: new Promise((resolve) => setTimeout(resolve, 3000)),
          variant: "flat",
          color: "danger",
        });
        window.open(response.data.PaymentLink, "_self");
      } else if (response.status === 480) {
        addToast({
          title:
            "تمام قبوض انتخاب شده، قبلا از طریق این سامانه پرداخت شده اند.",
          promise: new Promise((resolve) => setTimeout(resolve, 3000)),
          variant: "flat",
          color: "danger",
        });
      }
    } catch (error) {
      // addToast({
      //   title: "ظاهرا دسترسی شما به اینترنت قطع شده است",
      //   promise: new Promise((resolve) => setTimeout(resolve, 3000)),
      //   variant: "flat",
      //   color: "danger",
      // });
    } finally {
      setPayFineLoadingStates(() => {
        const newState = false;
        return newState;
      });
    }
  };

  const getCarViolationImageSubmit = async (uniqueId, serialNumber, index) => {
    const requestData = {
      plate: {
        "3digit": violationData?.plaque["3digit"],
        "5digit": violationData?.plaque["5digit"],
      },
      mobile_number: mobileNumber,
      UniqueID: uniqueId,
      national_code: natCode,
      serialNo: serialNumber,
      type: "car",
    };
    try {
      setLoadingStates((prev) => {
        const newState = [...prev];
        newState[index] = true;
        return newState;
      });

      const response = await getCarViolationImageApi(requestData);
      if (response.status === 200) {
        setImageUrl(response.data.vehicle_image);
        setShowViolationImage(true);
      } else if (response.status === 499) {
        setShowViolationImage(true);
      } else {
        // toast.error(response.message);
      }
    } catch (error) {
      //   toast.error("ظاهرا دسترسی شما به اینترنت قطع شده است");
    } finally {
      setLoadingStates(() => {
        const newState = false;
        return newState;
      });
    }
  };

  //   const totalFine = Array.isArray(violationData?.bills)
  //   ? violationData.bills.reduce((sum, bill) => {
  //       const amount =
  //         typeof bill.amount === "string" ? parseFloat(bill.amount) : bill.amount;
  //       return sum + (isNaN(amount) ? 0 : amount);
  //     }, 0)
  //   : 0;

  if (!violationData) {
    return (
      <div
        style={{
          marginTop: "16px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p>در حال بارگذاری اطلاعات...</p>
      </div>
    );
  }

  //   if (totalFine === 0) {
  //     return (
  //       <div className="flex justify-center items-center flex-col mt-10 md:mt-20">
  //         <ViolationRecord
  //           digit3={violationData?.plaque["3digit"]}
  //           digit5={violationData?.plaque["5digit"]}

  //         />
  //         <span className="font-Kalame font-semibold mb-8 text-lg md:text-xl">
  //           هیچ خلافی ای برای شما یافت نشد
  //         </span>
  //         <Image
  //           src="/mag/tools/images/empty_result.png"
  //           alt="Empty result"
  //           width={250}
  //           height={250}
  //         />
  //       </div>
  //     );
  //   }

  //   const getChargeWalletGateWaySubmit = async (amount) => {
  //     const requestBodyParameter = {
  //       amount: amount,
  //       page: "/Violation",
  //       description: "افزایش اعتبار کیف پول",
  //     };
  //     try {
  //       if (amount === violationPrice.image_price) {
  //         setIsChargingWallet(true);
  //       } else {
  //         setIsChargingWallets(true);
  //       }

  //       const response = await getChargeWalletGateWayApi(requestBodyParameter);
  //       if (response.status === 200) {
  //         // toast.success("در حال انتقال به درگاه پرداخت");
  //         window.open(response.data.url, "_self");
  //         setIsDialogVisible(false);
  //       } else {
  //         // toast.error(response.message);
  //       }
  //     } catch (error) {
  //       //   toast.error("ظاهرا دسترسی شما به اینترنت قطع شده است");
  //     } finally {
  //       if (amount === violationPrice.image_price) {
  //         setIsChargingWallet(false);
  //       } else {
  //         setIsChargingWallets(false);
  //       }
  //     }
  //   };

  return (
    <div className="div-result-container">
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      <h2 className="font-KalameBold text-xl mt-5 mx-auto flex justify-center">
        جزییات خلافی
      </h2>
      <p className="font-Kalame font-thin text-base mt-5 mx-auto flex justify-center">
        مجموع مبلغ جرایم : {formatAmount(violationData.Amount)}
      </p>
      <div className="div-plaque mt-5">
        {violationData.plaque && (
          <div dir="ltr" className="flex justify-center items-center flex-row">
            <div className="iran-flag bg-blue-800 p-2 flex flex-col items-center gap-y-0.5 mr-1 rounded-l-xl mb-10">
              <Image
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
              {violationData.plaque["3digit"]}
            </div>

            <div className="bg-gray-100 h-[70px] flex justify-center items-center text-lg px-2 rounded-md mr-1 font-DanaDemiBold mb-10">
              {violationData.plaque["5digit"]}
            </div>

            <div className="font-Kalame rotate-90 mb-9">
              <span>ایران</span>
            </div>
          </div>
        )}
      </div>

      <div className="border border-teal-700 rounded-lg flex mx-auto flex-col w-80 sm:w-96 md:w-1/3 p-4 m-4 text-right">
        <div className="flex justify-around gap-x-24 xl:gap-x-72 items-center border-b-2 w-full pb-2">
          <p className="text-xs font-Kalame">مجموع مبلغ جرایم :‌</p>
          <p>{formatAmount(violationData.Amount)}</p>
          {/* <span className="text-xs font-Kalame">
              {toJalaliDate(violationData.violationOccureTime)}
            </span> */}
        </div>
        <div className="font-Kalame text-right md:px-4 text-sm mt-3 md:text-base text-teal-600">
          {violationData.description}
        </div>
        <div className="font-Kalame text-right md:px-4 text-xs mt-2 md:text-sm">
          <span>وضعیت شکایت :‌ {violationData.ComplaintStatus}</span>
        </div>
        {/* <div className="font-Kalame text-right md:px-4 text-xs mt-2 md:text-sm">
          <span>شرح تخلف :‌ {violationData.type}</span>
        </div> */}
        <div className="font-Kalame text-right md:px-4 text-xs mt-2 md:text-sm">
          <span>شناسه ی قبض :‌ {violationData.BillID}</span>
        </div>
        <div className="border-b-2 pb-3 font-Kalame text-right md:px-4 text-xs mt-2 md:text-sm">
          <span>شناسه ی پرداخت :‌ {violationData.PaymentID}</span>
        </div>
        <div className="flex justify-between items-center flex-row mt-5">
          {violationData.Amount == 0 ? <></> : <Button
            variant="shadow"
            className="bg-teal-700 text-white font-DanaDemiBold text-xs"
            type="submit"
            onPress={() =>
              getPayFineGateWaySubmit(
                violationData.BillID,
                violationData.PaymentID
              )
            }
          >
            {/* {payFineLoadingStates ? (
              <Spinner size={10} color="white" />
            ) : ( */}
              پرداخت جریمه
            {/* )} */}
          </Button>}

          {/* {bill.type === "دوربین" ? (
              <Button
                onPress={onOpen}
                onClick={() =>
                  getCarViolationImageSubmit(bill.uniqueId, bill.serial, index)
                }
                variant="shadow"
                color="warning"
                className="text-white font-DanaDemiBold text-xs"
              >
                {loadingStates[index] ? (
                  <Spinner size={10} color="default" />
                ) : (
                  <span>
                    تصویر {"("} {(violationPrice?.image_price || 0).toLocaleString("fa-IR")} تومان {")"}
                  </span>
                )}
              </Button>
            ) : (
              <>
                <Button
                  as={Link}
                  href="/complaint"
                  variant="shadow"
                  color="danger"
                  className="text-white font-DanaDemiBold text-xs"
                >
                  <span>اعتراض</span>
                </Button>
              </>
            )} */}
        </div>
      </div>

      {/* {imageUrl ? (
        <Modal
          isOpen={showViolationImage}
          onClose={() => setShowViolationImage(false)}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            <>
              <ModalHeader></ModalHeader>
              <ModalBody>
                {imageUrl ? (
                  <>
                    <img src={imageUrl} alt="تصویر خلافی" />
                  </>
                ) : (
                  <>
                    <Spinner color="white" />
                  </>
                )}
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          </ModalContent>
        </Modal>
      ) : (
        <Modal
          isOpen={showViolationImage}
          onClose={() => setShowViolationImage(false)}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            <>
              <ModalHeader></ModalHeader>
              <ModalBody>
                <h2>
                  {walletCredit < violationPrice.image_price ? (
                    <p className="font-Kalame font-semibold text-red-700 text-center mt-5">
                      موجودی کافی نیست
                    </p>
                  ) : (
                    <span className="font-Kalame font-semibold text-teal-700 text-center">
                      اعتبار کیف پول : {walletCredit}
                    </span>
                  )}
                </h2>
                <p className="font-Kalame text-center font-semibold my-3">
                  هزینه ی استعلام عکس {(violationPrice?.image_price || 0).toLocaleString("fa-IR")} تومان می باشد
                </p>
                <Button
                  size="lg"
                  color="secondary"
                  className="font-DanaDemiBold mx-2"
                  onPress={() =>
                    getChargeWalletGateWaySubmit(violationPrice.image_price)
                  }
                >
                  {isChargingWallet ? (
                    <Spinner size={10} color="white" />
                  ) : (
                    <span className="text-sm">
                      افزایش اعتبار {(violationPrice?.image_price || 0).toLocaleString("fa-IR")} تومان {"("} یک
                      بار استعلام عکس {")"}
                    </span>
                  )}
                </Button>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          </ModalContent>
        </Modal>
      )} */}
    </div>
  );
};

export default ViolationSumResult;

"use client"; // Required for client-side rendering in Next.js App Router
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { getCarViolationImageApi } from "@/api/car/inquiry_api";
import { toast, Toaster } from "react-hot-toast";
import moment from "moment-jalaali";
import { payFineApi } from "@/api/car/pay_fine_api";
import Image from "next/image";
import { Button, Input, Spinner } from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { getAppDataApi, getChargeWalletGateWayApi } from "@/api/wallet_api";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { Car } from "iconsax-react";
// import { Car } from "iconsax/react";

const ViolationResultSum = () => {
  const [showViolationImage, setShowViolationImage] = useState(false);
  const [loadingStates, setLoadingStates] = useState([]);
  const [payFineLoadingStates, setPayFineLoadingStates] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [violationData, setViolationData] = useState(null); // Initialize state for violation data
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isComplaintModalOpen, onOpen: onComplaintModalOpen, onOpenChange: onComplaintModalOpenChange } = useDisclosure();
  const [isChargingWallet, setIsChargingWallet] = useState(false);
  const [isChargingWallets, setIsChargingWallets] = useState(false);
  const [violationPrice, setViolationPrice] = useState("");
  const mobileNumber = Cookies.get("inquiryMobileNumber");
  const natCode = Cookies.get("1490009078");
  const router = useRouter();
  const REDIRECT_LINK = "https://farmooon.com/";
  const token = Cookies.get("token");
  const walletCredit = Cookies.get("wallet");

  //   useEffect(() => {
  //       const fetchAppData = async () => {
  //         try {
  //           const response = await getAppDataApi();
  //           if (response && response.data) {
  //             setViolationPrice(response.data);
  //           }
  //         } catch (error) {
  //           console.error("Failed to fetch wallet credit:", error);
  //         } finally {
  //         }
  //       };

  //       fetchAppData();
  //     }, []);

  useEffect(() => {
    // Redirect to loginOtp if mobileNumber is not present
    if (!mobileNumber) {
      router.push("/loginOtp");
    }
  }, [mobileNumber, router]);

  useEffect(() => {
    // Fetch violation data from localStorage on the client
    const storedData = localStorage.getItem("carViolationSumData");
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
        toast.success("انتقال به درگاه پرداخت");
        window.open(response.data.PaymentLink, "_self");
      } else if (response.status === 480) {
        toast.success(
          "تمام قبوض انتخاب شده، قبلا از طریق این سامانه پرداخت شده اند."
        );
      }
    } catch (error) {
      // toast.error("ظاهرا دسترسی شما به اینترنت قطع شده است");
    } finally {
      setPayFineLoadingStates(() => {
        const newState = false;
        return newState;
      });
    }
  };

  //   const getCarViolationImageSubmit = async (uniqueId, serialNumber, index) => {
  //     const requestData = {
  //       plate: {
  //         "2digit": violationData?.plaque["2digit"],
  //         "3digit": violationData?.plaque["3digit"],
  //         alphabet: violationData?.plaque["alphabet"],
  //         iran: violationData?.plaque["iran"],
  //       },
  //       mobile_number: mobileNumber,
  //       UniqueID: uniqueId,
  //       national_code: natCode,
  //       serialNo: serialNumber,
  //       type: "car",
  //     };
  //     try {
  //       setLoadingStates((prev) => {
  //         const newState = [...prev];
  //         newState[index] = true;
  //         return newState;
  //       });

  //       const response = await getCarViolationImageApi(requestData);
  //       if (response.status === 200) {
  //         setImageUrl(response.data.vehicle_image);
  //         setShowViolationImage(true);
  //       } else if (response.status === 499) {
  //         setShowViolationImage(true);
  //       } else {
  //         toast.error(response.message);
  //       }
  //     } catch (error) {
  //       toast.error("ظاهرا دسترسی شما به اینترنت قطع شده است");
  //     } finally {
  //       setLoadingStates((prev) => {
  //         const newState = [...prev];
  //         newState[index] = false;
  //         return newState;
  //       });
  //     }
  //   };

  //   const totalFine = violationData?.bills.reduce((sum, bill) => {
  //     const amount =
  //       typeof bill.amount === "string" ? parseFloat(bill.amount) : bill.amount;
  //     return sum + (isNaN(amount) ? 0 : amount);
  //   }, 0);

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
  //           digit2={violationData?.plaque["2digit"]}
  //           digit3={violationData?.plaque["3digit"]}
  //           iranNum={violationData?.plaque.iran}
  //           letter={violationData?.plaque.alphabet}
  //         />
  //         <span className="font-Kalame font-semibold mb-8 text-lg md:text-xl">
  //           هیچ خلافی ای برای شما یافت نشد
  //         </span>
  //         <Image
  //           src="/images/empty_result.png"
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
  //         toast.success("در حال انتقال به درگاه پرداخت");
  //         window.open(response.data.url, "_self");
  //         setIsDialogVisible(false);
  //       } else {
  //         toast.error(response.message);
  //       }
  //     } catch (error) {
  //       toast.error("ظاهرا دسترسی شما به اینترنت قطع شده است");
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
      <Toaster position="top-center" reverseOrder={false} />
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
              {violationData.plaque["2digit"]}
            </div>
            <div className="bg-gray-100 h-[70px] flex justify-center items-center text-lg px-2 rounded-md mr-1 font-DanaDemiBold mb-10">
              {violationData.plaque["alphabet"]}
            </div>
            <div className="bg-gray-100 h-[70px] flex justify-center items-center text-lg px-2 rounded-md mr-1 font-DanaDemiBold mb-10">
              {violationData.plaque["3digit"]}
            </div>
            <div className="bg-gray-100 h-[70px] flex justify-center items-center text-lg px-2 rounded-md mr-1 font-DanaDemiBold mb-10">
              <span>{violationData.plaque["iran"]}</span>
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
          <p className="font-Kalame">{formatAmount(violationData.Amount)}</p>
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
        <div className="font-Kalame text-right md:px-4 text-xs mt-2 md:text-sm">
          <span>شناسه ی قبض :‌ {violationData.BillID}</span>
        </div>
        <div className="font-Kalame text-right md:px-4 text-xs mt-2 md:text-sm">
          <span>شناسه ی پرداخت :‌ {violationData.PaymentID}</span>
        </div>
        {/* <div className="border-b-2 pb-3 font-Kalame text-right md:px-4 text-xs mt-2 md:text-sm">
            <span>شناسه ی پرداخت :‌ {bill.payId}</span>
          </div> */}
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

          {/* Complaint Button */}
          <Button
            onClick={onComplaintModalOpen}
            variant="bordered"
            color="warning"
            className=" font-DanaDemiBold text-xs"
          >
            <span>اعتراض</span>
          </Button>
        </div>
      </div>

      {/* Complaint Modal */}
      <Modal 
        isOpen={isComplaintModalOpen} 
        onOpenChange={onComplaintModalOpenChange}
        size="5xl"
        scrollBehavior="inside"
        backdrop="opaque"
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex gap-x-1.5">
                  <Car color="#0f766e" size={25} variant="Bulk" className="mr-2" />
                  <h2 className="md:text-lg font-KalameBold">
                    آدرس واحدهای رسیدگی به تخلفات رانندگی تهران بزرگ
                  </h2>
                </div>
              </ModalHeader>
              <ModalBody>
                <p className="max-w-screen-lg mx-auto mt-3 font-Kalame text-xs md:text-sm px-4">
                  ✅ تهران – بزرگراه شیخ فضل الله نوری – بلوار مرزداران
                  -شهرک آزمایش پلیس راهنمایی و رانندگی نیروی انتظامی جمهوری
                  اسلامی ایران
                </p>
                <div className="flex gap-x-1.5 max-w-screen-lg mx-auto mt-6 md:mt-10">
                  <Car color="#0f766e" variant="Bulk" size={25} className="mr-2" />
                  <h2 className="md:text-lg font-KalameBold">
                    آدرس واحدهای رسیدگی به تخلفات رانندگی تهران بزرگ
                  </h2>
                </div>
                <Table
                  aria-label="Example static collection table"
                  className="max-w-screen-lg mx-auto mt-6 font-Kalame"
                >
                  <TableHeader>
                    <TableColumn className="text-sm text-teal-700">
                      شماره تلفن
                    </TableColumn>
                    <TableColumn className="text-sm text-teal-700">
                      آدرس پستی
                    </TableColumn>
                    <TableColumn className="text-sm text-teal-700">
                      یگان
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="1">
                      <TableCell></TableCell>
                      <TableCell className="text-xs md:text-sm">
                        بزرگراه یادگار امام (ره) – خیابان حبیب الهی – خیابان
                        زنجان شمالی – جنب آتش نشانی{" "}
                      </TableCell>
                      <TableCell className="text-xs md:text-sm">
                        اداره اجرائیات فاتب{" "}
                      </TableCell>
                    </TableRow>
                    <TableRow key="2">
                      <TableCell className="text-xs md:text-sm">
                        ۴۴۵۳۸۸۰۸
                      </TableCell>
                      <TableCell className="text-xs md:text-sm">
                        تهرانسر ـ انتهای بلوار یاس
                      </TableCell>
                      <TableCell className="text-xs md:text-sm">
                        منطقه ۲۱{" "}
                      </TableCell>
                    </TableRow>
                    <TableRow key="3">
                      <TableCell></TableCell>
                      <TableCell className="text-xs md:text-sm">
                        واحد شماره ۳ مستقر در منطقه ۱۲ پلیس راهور تهران بزرگ
                        . آدرس: خیابان شوش نرسیده به میدان شوش پشت بوستان
                        بهاران جنب کلانتری ۱۱۲
                      </TableCell>
                      <TableCell className="text-xs md:text-sm">
                        منطقه ۱۲{" "}
                      </TableCell>
                    </TableRow>
                    <TableRow key="4">
                      <TableCell className="text-xs md:text-sm">
                        ۳۳۰۵۷۵۲۸
                      </TableCell>
                      <TableCell className="text-xs md:text-sm">
                        خیابان نبرد ـ میدان نبرد ـ انتهای خیابان شهید
                        ابراهیم بیدی
                      </TableCell>
                      <TableCell className="text-xs md:text-sm">
                        منطقه ۱۴{" "}
                      </TableCell>
                    </TableRow>
                    <TableRow key="5">
                      <TableCell></TableCell>
                      <TableCell className="text-xs md:text-sm">
                        واحد شماره ۵ مستقر در منطقه یک پلیس راهور تهران بزرگ
                        . آدرس: بزرگراه ارتش بلوار اوشان نبش میدان اوشان
                      </TableCell>
                      <TableCell className="text-xs md:text-sm">
                        منطقه ۱{" "}
                      </TableCell>
                    </TableRow>
                    <TableRow key="6">
                      <TableCell className="text-xs md:text-sm">
                        ۵۵۴۳۷۱۶۱
                      </TableCell>
                      <TableCell className="text-xs md:text-sm">
                        بزرگراه نواب ـ تقاطع خیابان محبوب مجاز (ویژه
                        جانبازان ـ ایثارگران و خانواده شهداء){" "}
                      </TableCell>
                      <TableCell className="text-xs md:text-sm">
                        منطقه ۱0{" "}
                      </TableCell>
                    </TableRow>
                    <TableRow key="7">
                      <TableCell className="text-xs md:text-sm">
                        ۵۵۹۰۲۱۱۰
                      </TableCell>
                      <TableCell className="text-xs md:text-sm">
                        شهرری ـ خیابان استخر ـ روبروی فروشگاه شهروند{" "}
                      </TableCell>
                      <TableCell className="text-xs md:text-sm">
                        منطقه 20{" "}
                      </TableCell>
                    </TableRow>
                    <TableRow key="8">
                      <TableCell className="text-xs md:text-sm">
                        ۸۶۰۸۳۲۴۴
                      </TableCell>
                      <TableCell className="text-xs md:text-sm">
                        بزرگراه حقانی ـ نرسیده به تقاطع جهان کودک ـ مقابل
                        پارک آب و آتش{" "}
                      </TableCell>
                      <TableCell className="text-xs md:text-sm">
                        منطقه 3{" "}
                      </TableCell>
                    </TableRow>
                    <TableRow key="9">
                      <TableCell className="text-xs md:text-sm">
                        ۴۴۷۳۶۸۴۰
                      </TableCell>
                      <TableCell className="text-xs md:text-sm">
                        همت غرب ـ آزادگان جنوب ـ شهرک گلستان ـ بلوار گلها ـ
                        خیابان یاسمن جنوبی{" "}
                      </TableCell>
                      <TableCell className="text-xs md:text-sm">
                        منطقه 22{" "}
                      </TableCell>
                    </TableRow>
                    <TableRow key="10">
                      <TableCell></TableCell>
                      <TableCell className="text-xs md:text-sm">
                        واحد رسیدگی دادسرای ناحیه ۳۲. آدرس: خیابان آزادی نبش
                        رودکی پشت راهنمایی و رانندگی تهران بزرگ
                      </TableCell>
                      <TableCell className="text-xs md:text-sm">
                        منطقه ۱{" "}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="shadow"
                  className="font-DanaDemiBold text-sm"
                  onPress={onClose}
                >
                  بستن
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

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
                  هزینه ی استعلام عکس {violationPrice.image_price} تومان می باشد
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
                      افزایش اعتبار {violationPrice.image_price} تومان {"("} یک
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

export default ViolationResultSum;
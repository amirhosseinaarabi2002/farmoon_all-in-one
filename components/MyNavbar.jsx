"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getAppDataApi, getChargeWalletGateWayApi } from "../api/wallet_api";
import { getWalletCreditApi } from "../api/wallet_api";
import { useRouter } from "next/router";
import { MotorcycleIcon, SignOutIcon } from "@phosphor-icons/react";
import Link from "next/link";
import {
  addToast,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import App from "./ui/SupportBtn";
import { List, X } from "@phosphor-icons/react";
import { Car } from "iconsax-react";
import { ScaleLoader } from "react-spinners";
import Facilities from "./ui/Facilities";

export default function MyNavbar() {
  const token = Cookies.get("token");
  const mobileNumber = Cookies.get("mobileNumber");
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isChargingWallet, setIsChargingWallet] = useState(false);
  const [isChargingWallets, setIsChargingWallets] = useState(false);
  const [walletCredit, setWalletCredit] = useState(0);
  const [showWalletCreditLoading, setShowWalletCreditLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [violationPrice, setViolationPrice] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    const fetchWalletCredit = async () => {
      try {
        setShowWalletCreditLoading(true);
        const response = await getWalletCreditApi();
        if (response && response.data) {
          Cookies.set("wallet", response.data.wallet, {
            secure: false,
            sameSite: "lax",
          });
          setWalletCredit(response.data.wallet);
        }
      } catch (error) {
        console.error("Failed to fetch wallet credit:", error);
      } finally {
        setShowWalletCreditLoading(false);
      }
    };

    if (token) {
      fetchWalletCredit();
    }
  }, [token]);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
  };

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
        addToast({
          title: response.message || "در حال انتقال به درگاه پرداخت",
          promise: new Promise((resolve) => setTimeout(resolve, 3000)),
          variant: "flat",
          color: "danger",
        });
        window.open(response.data.url, "_self");
        setIsDialogVisible(false);
      } else {
        addToast({
          title: response.message || "مشکلی رخ داده است، لطفا مجددا تلاش کنید.",
          promise: new Promise((resolve) => setTimeout(resolve, 3000)),
          variant: "flat",
          color: "danger",
        });
      }
    } catch (error) {

    } finally {
      if (amount === violationPrice.naji_price) {
        setIsChargingWallet(false);
      } else {
        setIsChargingWallets(false);
      }
    }
  };

  const handleClick = () => {
    if (token && mobileNumber) {
      setIsDialogVisible(true);
    } else {
      // toast.error("لطفا وارد حساب خود شوید");
    }
  };

  const handleClick2 = () => {
    if (token && mobileNumber) {
      onOpen();
    } else {
      router.push("/loginOtp");
    }
  };

  const handleLogOut = () => {
    Cookies.remove("token");
    Cookies.remove("mobileNumber");
    Cookies.remove("wallet");
    Cookies.remove("walletCredit");
    setIsDrawerOpen(false);
    router.reload();
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleNavLinkClick = () => {
    closeDrawer();
  };

  return (
    <>
      <Navbar isBordered>
        {/* Mobile Menu Button */}
        <NavbarContent className="sm:hidden" justify="start">
          <Button
            isIconOnly
            variant="light"
            className="text-white"
            onPress={toggleDrawer}
          >
            {isDrawerOpen ? <X size={24} /> : <List color="#000" size={24} />}
          </Button>
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
      
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            <img 
              src="/images/logo.png" 
              className="bg-white p-1 rounded-full" 
              alt="Logo" 
              width={36} 
              height={36} 
            />
          </NavbarBrand>
          
          <NavbarItem>
            <Link
              color="foreground"
              className="font-Kalame font-bold text-sm"
              href="/"
            >
              خلافی خودرو با جزئیات
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color="foreground"
              className="font-Kalame font-semibold text-sm"
              href="/?tab=sumation"
              onClick={(e) => {
                e.preventDefault();
                router.push('/?tab=sumation');
              }}
            >
              مجموع خلافی خودرو
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color="foreground"
              className="font-Kalame font-semibold text-sm"
              href="/motor"
            >
              خلافی موتور با جزئیات
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color="foreground"
              className="font-Kalame font-semibold text-sm"
              href="/motor?tab=sumation"
              onClick={(e) => {
                e.preventDefault();
                router.push('/motor?tab=sumation');
              }}
            >
              مجموع خلافی موتور
            </Link>
          </NavbarItem>
          <NavbarItem>
            <App />
          </NavbarItem>
          <NavbarItem>
            <Facilities />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="flex items-center gap-x-4">
            <Button
              onPress={handleClick2}
              as={token && mobileNumber ? "button" : Link}
              href={!token || !mobileNumber ? "/loginOtp" : undefined}
              color="default"
              variant="ghost"
              className="font-DanaDemiBold text-xs"
            >
              {token && mobileNumber ? (
                <>
                  {mobileNumber}{" "}
                  <span className="border-r-2 border-r-gray-300 pr-2">
                    اعتبار:{" "}
                  </span>
                  {showWalletCreditLoading ? (
                    <ScaleLoader color="#000" height={15} width={2} />
                  ) : (
                    formatAmount(walletCredit)
                  )}
                </>
              ) : (
                "ورود | ثبت نام"
              )}
            </Button>
            {token && mobileNumber ? (
              <Button
                onPress={handleLogOut}
                color="danger"
                variant="shadow"
                className="font-Kalame items-center hidden md:flex"
              >
                خروج
                <SignOutIcon className="rotate-180" color="#fff" size={20} />
              </Button>
            ) : (
              <></>
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* Custom Drawer Menu */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          onClick={closeDrawer}
        />
        
        {/* Drawer Content */}
        <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img 
                src="/images/logo.png" 
                className="bg-white p-1 rounded-full border" 
                alt="Logo" 
                width={40} 
                height={40} 
              />
              <span className="font-Kalame font-bold text-lg">منو</span>
            </div>
            <Button
              isIconOnly
              variant="light"
              onPress={closeDrawer}
              className="text-gray-600"
            >
              <X size={24} />
            </Button>
          </div>

          {/* Drawer Body */}
          <div className="p-6 flex flex-col h-full">
            {/* Navigation Links */}
            <div className="flex flex-col gap-6 mb-8">
              <Link
                href="/"
                className="font-Kalame font-bold text-sm hover:text-teal-700 transition-colors py-3 border-b border-gray-100 flex items-center-safe gap-x-1.5"
                onClick={handleNavLinkClick}
              >
                <Car size="28" color="#0f766e" />
                خلافی خودرو با جزئیات
              </Link>

              <Link
                href="/?tab=sumation"
                className="font-Kalame font-bold text-sm hover:text-teal-700 transition-colors py-3 border-b border-gray-100 flex items-center-safe gap-x-1.5"
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/?tab=sumation');
                  closeDrawer();
                }}
              >
                <Car size="28" color="#0f766e" />
                مجموع خلافی خودرو
              </Link>

              <Link
                href="/motor"
                className="font-Kalame font-bold text-sm hover:text-teal-700 transition-colors py-3 border-b border-gray-100 flex items-center-safe gap-x-1.5"
                onClick={handleNavLinkClick}
              >
                <MotorcycleIcon size="28" color="#0f766e" />
                خلافی موتور با جزئیات
              </Link>

              <Link
                href="/motor?tab=sumation"
                className="font-Kalame font-bold text-sm hover:text-teal-700 transition-colors py-3 border-b border-gray-100 flex items-center-safe gap-x-1.5"
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/motor?tab=sumation');
                  closeDrawer();
                }}
              >
                <MotorcycleIcon size="28" color="#0f766e" />
                مجموع خلافی موتور
              </Link>

              <div className="py-3 border-b border-gray-100">
                <App />
              </div>
              <div className="py-3 border-b border-gray-100">
                <Facilities />
              </div>
            </div>

            {/* User Info Section */}
            {token && mobileNumber && (
              <div className="">
                <Button
                  onPress={handleLogOut}
                  color="danger"
                  variant="shadow"
                  className="font-Kalame w-full flex items-center justify-center gap-2"
                >
                  خروج
                  <SignOutIcon className="rotate-180" color="#fff" size={20} />
                </Button>
              </div>
            )}

            {/* Version Info */}
            <div className="mt-4 text-center">
              <span className="font-Kalame font-thin text-gray-400 text-xs">
                {/* Add your version here if needed */}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Wallet */}
      <div className="flex flex-col gap-2">
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                <ModalBody>
                  <h2 style={{ fontSize: "18px" }}>
                    {walletCredit < violationPrice.naji_price ? (
                      <p className="font-Kalame font-semibold text-red-700 text-center">
                        موجودی کافی نیست
                      </p>
                    ) : (
                      <p className="font-Kalame font-semibold text-teal-700 text-center">
                        اعتبار کیف پول : {formatAmount(walletCredit)}
                      </p>
                    )}
                  </h2>
                  <p className="font-Kalame text-center font-semibold">
                    هزینه ی استعلام خلافی {violationPrice.naji_price.toLocaleString("fa-IR")} تومان می باشد
                  </p>
                  <Button
                    size="lg"
                    color="secondary"
                    className="font-DanaDemiBold"
                    onPress={() =>
                      getChargeWalletGateWaySubmit(violationPrice.naji_price)
                    }
                  >
                    {isChargingWallet ? (
                      <ScaleLoader color="#fff" height={15} width={2} />
                    ) : (
                      <span className="text-sm">
                        افزایش اعتبار {violationPrice.naji_price.toLocaleString("fa-IR")} تومان {"("} یک
                        بار استعلام خلافی {")"}
                      </span>
                    )}
                  </Button>
                  <Button
                    size="lg"
                    color="secondary"
                    className="font-DanaDemiBold"
                    onPress={() =>
                      getChargeWalletGateWaySubmit(violationPrice.naji_price * 2)
                    }
                  >
                    {isChargingWallets ? (
                      <ScaleLoader color="#fff" height={15} width={2} />
                    ) : (
                      <span className="text-sm">
                        افزایش اعتبار {(violationPrice.naji_price * 2).toLocaleString("fa-IR")} تومان {"("} دوبار استعلام خلافی {")"}
                      </span>
                    )}
                  </Button>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={onClose}
                    className="font-DanaDemiBold"
                  >
                    بستن
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
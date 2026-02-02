import React, { useEffect, useState } from "react";
import moment from "moment-jalaali";
import Link from "next/link";
import { getCarPlates } from "@/api/car/getPlates";
import {
  Spinner,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { ScaleLoader } from "react-spinners";
import { deletePlatesApi } from "@/api/car/deletePlate-api";

const CarPlates = ({ onPlateClick }) => {
  const [plates, setPlates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [plateToDelete, setPlateToDelete] = useState(null);

  // Modal controls
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const toJalaliDate = (gregorianDate) => {
    if (!gregorianDate) {
      return "ندارد";
    }
    try {
      return moment(gregorianDate, "YYYY/MM/DD HH:mm:ss").format(
        "jYYYY/jMM/jDD"
      );
    } catch (error) {
      return "تاریخ نامعتبر";
    }
  };

  const openDeleteModal = (plate, event) => {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
    setPlateToDelete(plate);
    onOpen();
  };

  const handleDeletePlate = async () => {
    if (!plateToDelete) return;

    setDeletingId(plateToDelete.id);
    try {
      await deletePlatesApi(plateToDelete.id);
      // Remove the deleted plate from state
      setPlates(plates.filter((plate) => plate.id !== plateToDelete.id));
      onClose();
    } catch (error) {
      console.error("Error deleting plate:", error);
      // You might want to show a toast notification here
    } finally {
      setDeletingId(null);
      setPlateToDelete(null);
    }
  };

  const handlePlateClick = (plate) => {
    onPlateClick(plate);
  };

  useEffect(() => {
    const fetchPlates = async () => {
      try {
        const platesList = await getCarPlates();
        setPlates(platesList);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlates();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <ScaleLoader color="#0f766e" height={15} width={2} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 rounded-lg mt-4 flex flex-col p-4 gap-y-2">
        <span className="font-Kalame text-xs">
          شما هنوز به حساب کاربری خود وارد نشده اید
        </span>
        <span className="font-Kalame text-xs">
          برای گرفتن خلافی باید به حساب کاربری خود وارد شوید
        </span>
        <Link
          className="text-xs bg-teal-800 text-white font-DanaDemiBold text-center p-2 rounded-xl mt-2"
          href="/loginOtp"
        >
          ورود به حساب کاربری
        </Link>
      </div>
    );
  }

  return (
    <div className="block">
      <div className="overflow-auto max-h-60 font-Kalame font-bold px-2">
        {plates.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            <p>هیچ پلاکی وجود ندارد</p>
          </div>
        ) : (
          plates.map((plate) => (
            <div
              key={plate.id}
              className="p-3 bg-gray-100 rounded-lg mb-2.5 w-full cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => handlePlateClick(plate)}
            >
              <div
                dir="ltr"
                className="flex flex-row justify-between text-sm items-center"
              >
                <div className="flex flex-row items-center bg-white p-0.5 rounded-sm">
                  <div className="iran-flag bg-blue-800 p-1 flex flex-col items-center gap-y-0.5 mr-2 rounded-l-xl">
                    <img
                      src="/images/iran_flag.png"
                      alt="Iran Flag"
                      width={10}
                      height={10}
                    />
                    <div className="font-light text-[6px] text-center text-white">
                      IR
                    </div>
                    <div className="font-light text-[6px] text-center text-white">
                      IRAN
                    </div>
                  </div>
                  <div className="plate-number-item">
                    <span>{plate.plateInfo.digit2} </span>
                  </div>
                  <div className="plate-number-item">
                    <span>{plate.plateInfo.alphabet} </span>
                  </div>
                  <div className="plate-number-item">
                    <span>{plate.plateInfo.digit3} </span>
                  </div>
                  <span className="plate-number-item">-</span>
                  <span className="plate-number-item">
                    {plate.plateInfo.iranNum}
                  </span>
                  <span className="plate-number-item text-[10px] text-gray-400 font-thin rotate-90 ml-1">
                    ایران
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-xs text-gray-500">
                      آخرین استعلام :{" "}
                    </span>
                    <span className="text-xs text-gray-500 font-thin">
                      {toJalaliDate(plate.lastInquriy)}
                    </span>
                  </div>

                  <Button
                    size="sm"
                    variant="light"
                    isIconOnly
                    onPress={(e) => openDeleteModal(plate, e)}
                    className="min-w-8 h-8"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="gray"
                      strokeWidth="2"
                    >
                      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-lg font-Kalame font-semibold">حذف پلاک</h3>
              </ModalHeader>
              <ModalBody>
                <div className="">
                  <p className="font-Kalame text-center mb-4">
                    آیا از حذف این پلاک اطمینان دارید؟
                  </p>
                  {/* {plateToDelete && (
                    <div className="bg-gray-100 p-3 rounded-lg text-center">
                      <div dir='ltr' className="flex flex-row justify-center items-center bg-white p-2 rounded-sm mx-auto w-fit">
                        <div className="iran-flag bg-teal-800 p-1 flex flex-col items-center gap-y-0.5 mr-2 rounded-l-xl">
                          <img
                            src="/mag/tools/images/iran_flag.png"
                            alt="Iran Flag"
                            width={12}
                            height={12}
                          />
                          <div className="font-light text-[6px] text-center text-white">
                            IR
                          </div>
                          <div className="font-light text-[6px] text-center text-white">
                            IRAN
                          </div>
                        </div>
                        <span className="font-DanaDemiBold">
                          {plateToDelete.plateInfo.digit2} {plateToDelete.plateInfo.alphabet} {plateToDelete.plateInfo.digit3} - {plateToDelete.plateInfo.iranNum}
                        </span>
                      </div>
                    </div>
                  )} */}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="light"
                  onPress={onClose}
                  className="font-DanaDemiBold"
                >
                  انصراف
                </Button>
                <Button
                  color="danger"
                  onPress={handleDeletePlate}
                  isLoading={deletingId !== null}
                  className="font-DanaDemiBold"
                >
                  {deletingId ? (
                    <ScaleLoader color="#fff" height={10} width={1} />
                  ) : (
                    "حذف پلاک"
                  )}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CarPlates;

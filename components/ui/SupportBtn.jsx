import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { TelegramLogo } from "@phosphor-icons/react";
import { MessageQuestion, Whatsapp } from "iconsax-react";
import Link from "next/link";

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className="flex items-center-safe justify-start bg-transparent text-sm md:text-sm font-Kalame font-semibold"
        onPress={onOpen}
      >
        <MessageQuestion size="28" color="#0f766e" />
        پشتیبانی 
      </Button>
      <Modal
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
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                />
                <h1 className="font-KalameBold text-base text-warning-900">
                  پشتیبانی فرمون
                </h1>
              </ModalHeader>
              <ModalBody>
                <div className="mb-2 flex items-center gap-x-1 mx-auto">
                  <MessageQuestion
                    size={30}
                    color="#fff"
                    className="bg-[#0f766e] p-1 rounded-lg"
                  />
                  <p className="text-sm font-Kalame">
                    ارتباط با پشتیبانی از طریق تلگرام و واتساپ
                  </p>
                </div>{" "}
                <div className="flex flex-col gap-y-6 pb-4">
                  <Button
                    as={Link}
                    href="https://t.me/crmapps"
                    color="primary"
                    variant="shadow"
                    className="text-white"
                  >
                    <TelegramLogo size={25} color="#fff" weight="light" />
                    Telegram
                  </Button>
                  <Button
                    as={Link}
                    href="https://api.whatsapp.com/send/?phone=989109838553"
                    color="success"
                    variant="shadow"
                    className="text-white"
                  >
                    <Whatsapp size={25} color="#fff" />
                    Whatsapp
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useTranslations } from "next-intl";

interface SmsCodeModalProps {
  checkPhoneSmsCode: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    code: string
  ) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SmsCodeModal: React.FC<SmsCodeModalProps> = ({
  checkPhoneSmsCode,
  open,
  setOpen,
}) => {
  const [passkey, setPasskey] = useState("");
  const t = useTranslations("Register");
  const closeModal = () => {
    setOpen(false);
  };

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    checkPhoneSmsCode(e, passkey);
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="bg-black">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between text-white">
            {t("confirmCode2")}
            <Image
              src="/images/closeIcon.svg"
              alt="close"
              width={20}
              height={20}
              onClick={closeModal}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>{t("confirmCode")}</AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPasskey(value)}
          >
            <InputOTPGroup className="flex mx-auto">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={validatePasskey}
            className="btn-primary w-full"
          >
            {t("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SmsCodeModal;

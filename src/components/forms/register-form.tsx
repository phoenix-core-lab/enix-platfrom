"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useRouter } from "@/i18n/routing";
import Image from "next/image";
import { GalleryVerticalEnd } from "lucide-react";
import LanguageSwitcher from "../dashboard/LanguageSwitcher";
import { useTranslations } from "next-intl";
import React from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import SmsCodeModal from "./smscode-modal";

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  phone: HTMLInputElement;
  password: HTMLInputElement;
  code: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export function RegistrationForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const t = useTranslations("Register");
  const router = useRouter();
  const [cookies, setCookie] = useCookies();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [phoneNum, setPhoneNum] = React.useState("+998");
  const [isMounted, setIsMounted] = React.useState(false);
  const [open, setOpen] = React.useState<boolean>(true);
  const signUp = (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formElements = event.currentTarget.elements as FormElements;
    axios
      .post(process.env.NEXT_PUBLIC_APP_API_URL + "/auth/register", {
        fullname: formElements.name.value,
        phone_number: formElements.phone.value,
        password: formElements.password.value,
      })
      .then((res) => {
        setCookie("secretToken", res.data.access_token);
        setOpen(true);
        setIsRegistered(true);
      })
      .catch((err) => {
        console.error(err);
        console.log(process.env.NEXT_PUBLIC_APP_API_URL);
        toast.error("Бундай фойдаланувчи аллақачон мавжуд!");
      });
    setIsLoading(false);
  };

  const checkPhoneSmsCode = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    code: string
  ) => {
    event.preventDefault();
    setIsLoading(true);
    axios
      .post(
        process.env.NEXT_PUBLIC_APP_API_URL + "/auth/verify-phone-code",
        {
          code: code,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.secretToken}`,
          },
        }
      )
      .then(() => {
        router.push("/dashboard");
        setCookie("phoneNumber", phoneNum, { path: "/" });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Нотўғри тасдиқлаш коди!");
      });
    setIsLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <SmsCodeModal
        setOpen={setOpen}
        open={open}
        checkPhoneSmsCode={checkPhoneSmsCode}
      />
      <div className="flex min-h-svh flex-col items-center justify-center gap-6  p-6 md:p-10 bg-[url('https://img.profinance.ru/news/571226-1')] bg-cover bg-center bg-no-repeat h-dvh">
        <div className="flex w-full max-w-sm flex-col gap-2">
          <div className="flex items-center gap-2 self-center font-medium text-white">
            <div className="flex h-8 w-8 items-center justify-center  ">
              <Image
                src="/images/favicon.png"
                alt="Enix"
                width={32}
                height={3}
              />
            </div>
            Enix AI
          </div>
          <div className={cn("flex  flex-col gap-6", className)} {...props}>
            <Card className="bg-black border-[#27272A]">
              <CardHeader className="text-center">
                <CardTitle className="text-xl text-white">
                  {t("registration")}
                </CardTitle>
                <CardDescription>{t("createAccount")}</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                    signUp(event);
                  }}
                >
                  <div className="grid gap-6">
                    <div className="flex flex-col gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full bg-black border-[#27272A] text-white hover:bg-[#27272A] hover:text-white"
                      >
                        <LanguageSwitcher />
                      </Button>
                    </div>
                    <div className=" relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border after:text-[#27272A]"></div>
                    <div className="grid gap-6">
                      <div className="grid gap-2 text-white">
                        <Label htmlFor="email">{t("name")}</Label>
                        <Input
                          className="bg-black text-white border-[#27272A]"
                          id="name"
                          type="text"
                          name="name"
                          required
                        />
                      </div>
                      <div className="grid gap-2 text-white">
                        <Label htmlFor="email">{t("telphoneNumber")}</Label>
                        <Input
                          className="bg-black text-white border-[#27272A]"
                          id="tel"
                          name="phone"
                          type="tel"
                          placeholder="+998 90 123 45 67"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center text-white">
                          <Label htmlFor="password">{t("password")}</Label>
                        </div>
                        <Input
                          className="bg-black text-white border-[#27272A]"
                          id="password"
                          type="password"
                          name="password"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full text-black bg-white hover:bg-white/80"
                      >
                        {t("register")}
                      </Button>
                    </div>
                    <div className="text-center text-sm text-white">
                      {t("alreadyHaveAccount")}
                      <Link
                        href="/signin"
                        className="underline underline-offset-4"
                      >
                        {t("login")}
                      </Link>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-white [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
              © ENIX & Phoenix Core Lab 2025
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

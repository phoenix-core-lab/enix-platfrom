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
import { useCookies } from "react-cookie";
import React from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

interface FormElements extends HTMLFormControlsCollection {
  phone: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
  newPass: HTMLInputElement;
  resetPhone: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const open = false;
  const t = useTranslations("SignIn");
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpenChangePassword, setIsOpenChangePassword] = React.useState(false);
  const isOpenSendPassword = true;
  const [phoneNum, setPhoneNum] = React.useState("+998");
  const [isMounted, setIsMounted] = React.useState(false);
  const [cookies, setCookie] = useCookies([
    "secretToken",
    "phoneNumber",
    "isActiveUser",
    "subscriptionDate",
  ]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    console.log(cookies, open);
    if (!inputValue.startsWith("+998")) {
      setPhoneNum("+998");
      return;
    }

    if (inputValue.length > 13) {
      return;
    }

    setPhoneNum(inputValue);
  };
  const signIn = async (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formElements = event.currentTarget.elements;

    axios
      .post(process.env.NEXT_PUBLIC_APP_API_URL + "/auth/login", {
        phone_number: formElements.phone.value,
        password: formElements.password.value,
      })
      .then((res) => {
        const token = res.data.access_token;
        if (token) {
          setCookie("phoneNumber", phoneNum, { path: "/" });
          setCookie("isActiveUser", res.data.is_active, { path: "/" });
          setCookie("subscriptionDate", res.data.until, { path: "/" });
          setCookie("secretToken", token, { path: "/" });
          router.push("dashboard");
        } else {
          toast.error(t("Tostify.errorGetToken"));
        }
      })
      .catch((err) => {
        console.error("Ошибка авторизации:", err);
        toast.error(t("Tostify.authError"));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 bg-black h-dvh">
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
                  {t("signSystem")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                    signIn(event);
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
                    {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border after:text-[#27272A]"></div> */}
                    <div className="grid gap-6">
                      <div className="grid gap-2 text-white">
                        <Label htmlFor="email">{t("telphoneNumber")}</Label>
                        <Input
                          className="bg-black text-white border-[#27272A]"
                          id="phone"
                          type="tel"
                          name="phone"
                          placeholder="+998 (97) 456-78-90"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center text-white">
                          <Label htmlFor="password">{t("password")}</Label>
                          <Link
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                          >
                            {t("forgotPassword")}
                          </Link>
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
                        {t("signIn")}
                      </Button>
                    </div>
                    <div className="text-center text-sm text-white ">
                      {t("newUser")}
                      <Link
                        href="/signup"
                        className="underline underline-offset-4 ml-1"
                      >
                        {t("register")}
                      </Link>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-white [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
              © ENIX & Phoenix Core Lab 2025
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

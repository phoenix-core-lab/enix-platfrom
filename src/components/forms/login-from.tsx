"use client";
import "./index.scss";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useRouter } from "@/i18n/routing";
import Image from "next/image";
import Globe from "@/components/forms/Globe";
import LanguageSwitcher from "../dashboard/LanguageSwitcher";
import { useTranslations } from "next-intl";
import { useCookies } from "react-cookie";
import React from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

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
  const t = useTranslations("SignIn");
  const router = useRouter();
  const [phone, setPhone] = React.useState("+998");
  const [showPassword, setShowPassword] = React.useState(false);
  const [cookies, setCookie] = useCookies([
    "secretToken",
    "isActiveUser",
    "subscriptionDate",
  ]);
  console.log(cookies);

  // const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const inputValue = e.target.value;
  //   console.log(cookies, open);
  //   if (!inputValue.startsWith("+998")) {
  //     setPhoneNum("+998");
  //     return;
  //   }

  //   if (inputValue.length > 13) {
  //     return;
  //   }

  //   setPhoneNum(inputValue);
  // };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^998(\d{2})(\d{3})(\d{2})(\d{2})$/);
    return match
      ? `+998 (${match[1]}) ${match[2]} ${match[3]} ${match[4]}`
      : value;
  };

  const handlePhoneChange = (e: { target: { value: string } }) => {
    let inputValue = e.target.value.replace(/\D/g, "");
    if (!inputValue.startsWith("998")) {
      inputValue = "998";
    }
    if (inputValue.length > 12) {
      return;
    }
    setPhone(formatPhoneNumber("+" + inputValue));
  };

  const signIn = async (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const rawPhone = phone.replace(/\D/g, "");
    const password = formElements.password.value;

    if (password.length < 8) {
      toast.error(t("passwordTooShort"));
      return;
    }

    axios
      .post(process.env.NEXT_PUBLIC_APP_API_URL + "/auth/login", {
        phone_number: "+" + rawPhone,
        password: password,
      })
      .then((res) => {
        const token = res.data.access_token;
        if (token) {
          setCookie("isActiveUser", res.data.is_active, { path: "/" });
          setCookie("subscriptionDate", res.data.until, { path: "/" });
          setCookie("secretToken", token, { path: "/" });
          router.push("dashboard");
        } else {
          toast.error(t("errorGetToken"));
        }
      })
      .catch(() => {
        toast.error(t("authError"));
      });
  };

  return (
    <>
      <ToastContainer />
      <div
        style={{
          width: "100%",
          height: "100dvh",
          backgroundColor: "#000",
          position: "absolute",
          zIndex: -1,
        }}
      >
        <Globe />
      </div>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 h-dvh overflow-hidden">
        <div className="flex w-full max-w-sm flex-col gap-2">
          <div className="flex items-center gap-2 self-center font-medium text-white mb-4 text-2xl">
            <div className="flex items-center justify-center w-12 h-12 rounded-3xl bg-[#27272A]">
              <Image src="/images/logo.png" alt="Enix" width={25} height={25} />
            </div>
            ENIX AI
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
                        className="authFormLang w-full bg-black border-[#27272A] text-white hover:bg-[#27272A] hover:text-white"
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
                          value={phone}
                          onChange={handlePhoneChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center text-white">
                          <Label htmlFor="password">{t("password")}</Label>
                          <Link
                            href="/resetpassword"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                          >
                            {t("forgotPassword")}
                          </Link>
                        </div>
                        <div className="relative">
                          <Input
                            className="bg-black text-white border-[#27272A] pr-10"
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
                          >
                            {showPassword ? (
                              <EyeOff size={20} />
                            ) : (
                              <Eye size={20} />
                            )}
                          </button>
                        </div>
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
            {/* <div className="text-balance text-center text-xs text-white [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
              © ENIX & Phoenix Core Lab 2025
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

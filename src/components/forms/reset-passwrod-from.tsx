"use client";
import "./index.scss";
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
import { useRouter } from "@/i18n/routing";
import Globe from "@/components/forms/Globe";
import Image from "next/image";
import LanguageSwitcher from "../dashboard/LanguageSwitcher";
import { useTranslations } from "next-intl";
import React from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import SmsCodeModal from "./smscode-modal";
import { Eye, EyeOff } from "lucide-react";
interface FormElements extends HTMLFormControlsCollection {
  passwordRepeat: HTMLInputElement;
  name: HTMLInputElement;
  phone: HTMLInputElement;
  password: HTMLInputElement;
  code: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const t = useTranslations("Register");
  const router = useRouter();
  const [cookies, setCookie] = useCookies();
  const [phone, setPhone] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [havePhoone, setHavePhone] = React.useState(false);
  const [open, setOpen] = React.useState<boolean>(false);

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

  const signUp = (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements as FormElements;
    if (phone && !havePhoone) {
      setHavePhone(true);
      return;
    }
    const rawPhone = phone.replace(/\D/g, "");

    if (formElements.password.value !== formElements.passwordRepeat.value) {
      toast.error(t("dontMatch"));
      return;
    }

    axios
      .post(process.env.NEXT_PUBLIC_APP_API_URL + "/auth/register", {
        fullname: formElements.name.value,
        phone_number: "+" + rawPhone,
        password: formElements.password.value,
      })
      .then((res) => {
        setCookie("secretToken", res.data.access_token);
        setOpen(true);
      })
      .catch((err) => {
        console.error(err);
        console.log(process.env.NEXT_PUBLIC_APP_API_URL);
        toast.error(t("authError"));
      });
  };

  const checkPhoneSmsCode = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    code: string
  ) => {
    event.preventDefault();
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
      })
      .catch((err) => {
        console.error(err);
        toast.error("Noto'g'ri tasdiqlash kodi!");
      });
  };
  console.log("phone", phone);

  return (
    <>
      <ToastContainer />
      <SmsCodeModal
        setOpen={setOpen}
        open={open}
        checkPhoneSmsCode={checkPhoneSmsCode}
      />
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
      <div className="flex min-h-svh flex-col items-center justify-center gap-4 p-4 md:p-10 h-dvh">
        <div className="flex w-full max-w-sm flex-col gap-2">
          <div className="flex items-center gap-2 self-center font-medium text-white mb-4 text-2xl">
            <div className="flex items-center justify-center w-12 h-12 rounded-3xl bg-[#27272A]">
              <Image src="/images/logo.png" alt="Enix" width={25} height={25} />
            </div>
            ENIX AI
          </div>
          <div className={cn("flex  flex-col gap-4", className)} {...props}>
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
                  <div className="grid gap-4">
                    <div className="flex flex-col gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="authFormLang w-full bg-black border-[#27272A] text-white hover:bg-[#27272A] hover:text-white"
                      >
                        <LanguageSwitcher />
                      </Button>
                    </div>
                    <div className="grid gap-4">
                      {!havePhoone ? (
                        <div className="grid gap-2 text-white">
                          <Label htmlFor="tel">{t("telphoneNumber")}</Label>
                          <Input
                            className="bg-black text-white border-[#27272A]"
                            id="tel"
                            name="phone"
                            type="tel"
                            placeholder="+998 (90) 123 45 67"
                            onChange={handlePhoneChange}
                            value={phone}
                            required
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {havePhoone ? (
                        <div>
                          <div className="grid gap-2">
                            <div className="flex items-center text-white">
                              <Label htmlFor="password">{t("password")}</Label>
                            </div>
                            <div className="relative">
                              <Input
                                className="bg-black text-white border-[#27272A]"
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="********"
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
                          <div className="grid gap-2">
                            <div className="flex items-center text-white">
                              <Label htmlFor="password">
                                {t("passwordRepeat")}
                              </Label>
                            </div>
                            <div className="relative">
                              <Input
                                className="bg-black text-white border-[#27272A]"
                                id="passwordRepeat"
                                type={showPassword ? "text" : "password"}
                                name="passwordRepeat"
                                placeholder="********"
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
                        </div>
                      ) : (
                        ""
                      )}
                      {havePhoone ? (
                        <Button
                          type="submit"
                          className="w-full text-black bg-white hover:bg-white/80"
                        >
                          {t("register")}
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="w-full text-black bg-white hover:bg-white/80"
                        >
                          {t("send")}
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";
import { ArrowLeft, CreditCard } from "lucide-react";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "@/i18n/routing";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useTranslations } from "next-intl";

interface FormData {
  card_number: string;
  expire_date: string;
  paymentMethod: string;
}

interface ApiErrorResponse {
  message?: string;
}

const BASE_URL = "https://api.enix.uz";

const API_PATHS = {
  clickCard: `${BASE_URL}/click/card`,
  clickOtp: `${BASE_URL}/click/cardOTP`,
  paymeCard: `${BASE_URL}/payme/card`,
  paymeOtp: `${BASE_URL}/payme/cardOTP`,
};

const Payment: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    card_number: "",
    expire_date: "",
    paymentMethod: "",
  });
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [smsCode, setSmsCode] = useState<string>("");
  const [cookies, setCookie] = useCookies(["secretToken", "isActiveUser"]);
  const t = useTranslations("Payment");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateCardDetails = (): boolean => {
    if (!/^\d{16}$/.test(formData.card_number)) {
      toast.error(t("Toastify.errorCardNumber"));
      return false;
    }
    if (!formData.expire_date) {
      toast.error(t("Toastify.errorExpire_date"));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (!formData.paymentMethod) {
      toast.error(t("Toastify.errorPaymentMethod"));
      return;
    }

    if (!cookies.secretToken) {
      toast.error(t("Toastify.errorAuth"));
      return;
    }

    if (!validateCardDetails()) return;

    // Удаление символа `/` из expire_date
    const formattedExpireDate = formData.expire_date.replace("/", "");

    const url =
      formData.paymentMethod === "Click"
        ? API_PATHS.clickCard
        : API_PATHS.paymeCard;

    try {
      const response = await axios.post(
        url,
        {
          card_number: formData.card_number,
          expire_date: formattedExpireDate, // Отправляем без "/"
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.secretToken}`,
          },
        }
      );
      console.log("Первый этап успешен:", response.data);
      setIsOtpStep(true); // Переход к вводу SMS-кода
    } catch (error) {
      const apiError = error as { response?: { data?: ApiErrorResponse } };
      const errorMessage =
        apiError.response?.data?.message ||
        "Произошла ошибка. Попробуйте снова.";
      console.error("Ошибка при отправке данных:", errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleOtpSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (!cookies.secretToken) {
      toast.error(t("Toastify.errorAuth"));
      return;
    }

    const otpUrl =
      formData.paymentMethod === "Click"
        ? API_PATHS.clickOtp
        : API_PATHS.paymeOtp;

    try {
      const response = await axios.post(
        otpUrl,
        {
          card_number: formData.card_number,
          sms_code: smsCode,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.secretToken}`,
          },
        }
      );
      console.log("Оплата завершена:", response.data);
      toast.success(t("Toastify.successPayment"));
      setCookie("isActiveUser", true, { path: "/" });
      router.push("/");
    } catch (error) {
      const apiError = error as { response?: { data?: ApiErrorResponse } };
      const errorMessage =
        apiError.response?.data?.message || t("Toastify.errorSmsCode");
      console.error("Ошибка при отправке OTP:", errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleExpire_dateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (name === "expire_date") {
      // Маска для срока действия карты
      let formattedValue = value.replace(/\D/g, ""); // Удаляем все нецифровые символы
      if (formattedValue.length > 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(
          2,
          4
        )}`;
      }
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <>
      <ToastContainer theme="dark" pauseOnHover={false} />
      <div className="min-h-screen bg-gray-50 py-8 text-black">
        <div className="mx-auto max-w-2xl px-4">
          <nav className="mb-8">
            <button
              onClick={() => router.push("/prices")}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("back")}
            </button>
          </nav>

          <div className="grid grid-cols-1 gap-8">
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-semibold">{t("title")}</h1>
                <div className="mt-2 text-4xl font-bold">
                  {t("text1Priice")}
                  <span className="text-base font-normal text-gray-500">
                    {t("titleText")}
                  </span>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="flex justify-between border-b pb-4">
                  <div>
                    <div className="font-medium">Enix Premium Subscription</div>
                    <div className="text-sm text-gray-500">
                      {t("title1Text")}
                    </div>
                  </div>
                  <div>15 000 uzs</div>
                </div>

                <div className="flex justify-between border-b py-4">
                  <div className="flex items-center">
                    <span>{t("title2")}</span>
                  </div>
                  <div>0,00 uzs</div>
                </div>

                <div className="flex justify-between pt-4">
                  <div className="font-medium">{t("title3")}</div>
                  <div className="font-medium">15 000 uzs</div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-lg flex flex-col justify-between h-full">
              {!isOtpStep ? (
                <form onSubmit={handleSubmit} className="flex flex-col h-full">
                  <h2 className="mb-4 text-lg font-medium">{t("PayMethod")}</h2>
                  <div className="grid md:grid-cols-2 gap-4 mb-4 sm:grid-cols-1">
                    <div className="">
                      <div className="flex items-center border rounded-md p-3">
                        <CreditCard className="mr-2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="card_number"
                          placeholder="1234 1234 1234 1234"
                          className="border-none focus:ring-0 focus:border-none  outline-none "
                          value={formData.card_number}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="w-full flex items-center border rounded-md p-3">
                      <input
                        type="text"
                        name="expire_date"
                        placeholder={t("expire_datePlaceholder")}
                        className="border-none focus:ring-0 focus:border-none  outline-none"
                        value={formData.expire_date}
                        onChange={handleExpire_dateChange}
                        maxLength={5}
                      />
                    </div>
                  </div>
                  <div className="mb-8">
                    <h2 className="mb-4 text-lg font-medium">
                      {t("ChoosePaymentWay")}
                    </h2>
                    <div className="flex items-center space-x-6">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="Click"
                          className="hidden"
                          checked={formData.paymentMethod === "Click"}
                          onChange={handleInputChange}
                        />
                        <span
                          className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                            formData.paymentMethod === "Click"
                              ? "border-green-500"
                              : "border-gray-300"
                          }`}
                        >
                          {formData.paymentMethod === "Click" && (
                            <span className="h-2.5 w-2.5 bg-green-500 rounded-full"></span>
                          )}
                        </span>
                        <span className="text-sm font-medium">Click</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="Payme"
                          className="hidden"
                          checked={formData.paymentMethod === "Payme"}
                          onChange={handleInputChange}
                        />
                        <span
                          className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                            formData.paymentMethod === "Payme"
                              ? "border-green-500"
                              : "border-gray-300"
                          }`}
                        >
                          {formData.paymentMethod === "Payme" && (
                            <span className="h-2.5 w-2.5 bg-green-500 rounded-full"></span>
                          )}
                        </span>
                        <span className="text-sm font-medium">Payme</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-md bg-[#10A37F] py-3 text-white hover:bg-[#1A7F64] transition-colors mt-auto"
                  >
                    {t("ButtonText")}
                  </button>
                </form>
              ) : (
                <form
                  onSubmit={handleOtpSubmit}
                  className="flex flex-col h-full"
                >
                  <div className="mb-8">
                    <h2 className="mb-4 text-lg font-medium">
                      {t("EnterSmsCode")}
                    </h2>
                    <input
                      type="text"
                      placeholder={t("EnterSmsCode")}
                      className="rounded-md border p-2 w-full"
                      value={smsCode}
                      onChange={(e) => setSmsCode(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-md bg-[#10A37F] py-3 text-white hover:bg-[#1A7F64] transition-colors mt-auto"
                  >
                    {t("confirm")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;

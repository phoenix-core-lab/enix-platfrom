"use client";
import { Check, ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
export default function Prices() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("personal");
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white pt-6 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => router.push("/")}
          className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад
        </button>
        <h1 className="text-4xl font-bold text-center mb-8">
          Обновите свой план
        </h1>
        {/* <div className="flex justify-center mb-8 lg:mb-20">
          <div className="bg-[#2C2C2C] rounded-full p-1 inline-flex">
            <button
              onClick={() => setActiveTab("personal")}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeTab === "personal"
                  ? "bg-[#1A1A1A] text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Личный план
            </button>
            <button
              onClick={() => setActiveTab("business")}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeTab === "business"
                  ? "bg-[#1A1A1A] text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Business
            </button>
          </div>
        </div> */}

        {activeTab === "personal" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-8 lg:gap-0">
            {/* Plus Tier */}
            <div className="rounded-lg bg-[#222222] p-8 border-2 border-[#00A67E] relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00A67E] text-white px-3 py-1 rounded-full text-sm">
                популярный
              </span>
              <h2 className="text-2xl font-bold mb-4">Premium</h2>
              <div className="flex items-baseline mb-8">
                <span className="text-5xl font-extrabold">15 000</span>
                <span className="ml-1 text-gray-400">сум/месяц</span>
              </div>
              <p className="mb-8">Повысьте продуктивность и креативность!</p>
              <button
                onClick={() => router.push("./payment")}
                className="w-full py-3 px-4 rounded-md bg-[#00A67E] text-white mb-8"
              >
                Получить Plus
              </button>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                  <span>Все в бесплатной версии</span>
                </li>
                <li className="flex items-start">
                  <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                  <span>
                    Расширенные ограничения на обмен сообщениями, загрузку
                    файлов, расширенный анализ данных и создание изображений
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                  <span>Стандартный и расширенный режимы</span>
                </li>
                <li className="flex items-start">
                  <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                  <span>Ограниченный доступ к Premium функциям</span>
                </li>
                <li className="flex items-start">
                  <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                  <span>Возможности тестировать новые функции</span>
                </li>
                <li className="flex items-start">
                  <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                  <span>
                    Ограниченный доступ к созданию изображений для
                    поддерживаемых стран и территорий
                  </span>
                </li>
              </ul>
              <div className="text-sm text-gray-400">Действуют ограничения</div>
            </div>

            {/* Free Tier */}
            <div className="rounded-lg bg-[#222222] p-8">
              <h2 className="text-2xl font-bold mb-4">Бесплатно</h2>
              <div className="flex items-baseline mb-8">
                <span className="text-5xl font-extrabold">20</span>
                <span className="ml-1 text-gray-400">запросов/месяц</span>
              </div>
              <p className="mb-8">
                Узнайте, как ИИ может помочь вам в повседневных задачах
              </p>
              <button
                onClick={() => router.push("/")}
                className="w-full py-3 px-4 rounded-md bg-gray-600 text-white mb-8"
              >
                Ваш текущий план
              </button>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                  <span>Доступ к Enix mini</span>
                </li>
                <li className="flex items-start">
                  <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                  <span>Стандартный режим</span>
                </li>
                <li className="flex items-start">
                  <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                  <span>Ограниченный доступ к моделям</span>
                </li>
                <li className="flex items-start">
                  <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                  <span>
                    Ограниченный доступ к расширенному анализу, просмотру
                    веб-страниц и созданию изображений
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                  <span>Доступ к скачиванию результатов</span>
                </li>
              </ul>
              <div className="text-sm text-gray-400">
                У вас уже есть Premium план?{" "}
                <a href="/payment" className="text-[#00A67E] hover:underline">
                  помощь по выставлению счетов
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            {/* Team Tier */}
            <div className="rounded-lg bg-[#222222] p-8">
              <h2 className="text-2xl font-bold mb-4">Team</h2>
              <div className="flex items-baseline mb-8">
                <span className="text-2xl">$</span>
                <span className="text-5xl font-extrabold">25</span>
                <span className="ml-1 text-gray-400">USD/месяц</span>
              </div>
              <p className="mb-8">
                Улучшите работу своей команды с помощью безопасного рабочего
                пространства для совместной работы
              </p>
              <button className="w-full py-3 px-4 rounded-md bg-[#00A67E] text-white mb-8">
                Получить Team
              </button>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                  <span>
                    Более высокие ограничения на количество сообщений для GPT-4,
                    GPT-4o и такие инструменты, как DALL·E, просмотр
                    веб-страниц, анализ данных и многое другое
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                  <span>Ограниченный доступ к o1 и o1-mini</span>
                </li>
                <li className="flex items-start">
                  <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                  <span>Стандартный и расширенный голосовые режимы</span>
                </li>
                <li className="flex items-start">
                  <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                  <span>Создавайте и делитесь GPT в своей рабочей области</span>
                </li>
                <li className="flex items-start">
                  <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                  <span>
                    Консоль администратора для управления рабочей областью
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                  <span>
                    Данные команды исключены из обучения по умолчанию.{" "}
                    <a className="text-[#00A67E] hover:underline">
                      Узнать больше
                    </a>
                  </span>
                </li>
              </ul>
              <div className="text-sm text-gray-400">
                Для 2+ пользователей, ежегодное выставление счетов
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-16">
          <p className="text-gray-400 mb-2">
            Вам нужны дополнительные возможности для вашего бизнеса?
          </p>
          <a
            href="https://t.me/timur_ktr"
            className="text-[#00A67E] hover:underline"
          >
            См. Enix Enterprise
          </a>
        </div>
      </div>
    </div>
  );
}

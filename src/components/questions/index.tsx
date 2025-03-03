"use client";
import React, { useState } from "react";
import "./QuestionsContent.scss";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
const QuestionsContent = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const router = useRouter();
  const t = useTranslations("Plan");
  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const sections = [
    {
      title: "Our Privacy Policy explains:",
      content: `What information we collect and why we collect it. How we use that information. The choices we offer, including how to access and update information. We've tried to keep it as simple as possible, but if you're not familiar with terms like cookies, IP addresses, pixel tags and browsers, then read about these key terms first. Your privacy matters to us.
      We collect information to provide better services to all of our users – from figuring out basic stuff like which language you speak, to more complex things like which ads you'll find most useful, the people who matter most to you online, or which YouTube videos you might like.`,
    },
    {
      title: "We collect information in the following ways:",
      content: `Information you give us. For example, many of our services require you to sign up for an account. When you do, we'll ask for personal information, like your name, email address, telephone number or credit card to store with your account.`,
    },
    {
      title: "Log Information:",
      content: `When you use our services or view content provided by us, we automatically collect and store certain information in server logs. This includes: details of how you used our service, such as your search queries. Internet protocol address, browser type, browser language, the date and time of your request and referral URL, cookies that may uniquely identify your browser or your Account.`,
    },
    {
      title: "Location Information:",
      content: `When you use our services, we may collect and process information about your actual location.`,
    },
    {
      title: "Local Storage:",
      content: `We may collect and store information (including personal information) locally on your device.`,
    },
    {
      title: "Cookies and Similar Technologies:",
      content: `We and our partners use various technologies to collect and store information when you visit our service.`,
    },
  ];

  return (
    <main className="QuestionsContentMain">
      <button className="backButton" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("Back")}
      </button>
      <div className="container">
        <div className="QuestionsContentMainContainer">

        <div className="header">
          <h1 className="title">PRIVACY POLICY</h1>
          <div className="divider"></div>
        </div>
        <div className="sections">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`section ${openIndex === index ? "open" : ""}`}
            >
              <button
                className="sectionHeader"
                onClick={() => toggleSection(index)}
              >
                <span className="icon">
                  {openIndex === index ? <Minus /> : <Plus />}
                </span>
                {section.title}
              </button>
              <div className="sectionContent">
                <div>{section.content}</div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </main>
  );
};

export default QuestionsContent;

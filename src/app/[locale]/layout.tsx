import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const gilroy = localFont({
  src: [
    {
      path: "fonts/Gilroy-Regular.woff2",
    },
    {
      path: "fonts/Gilroy-Medium.woff2",
    },
  ],
});

import "./globals.css";
import ContextProvider from "@/providers/contextProvider";

export const metadata: Metadata = {
  title: "ENIX AI Assistent",
  description: "ENIX AI Assistant — aqlli va tez yordamchi, salqin vibe bilan. Savollarga javob beradi, vazifalarga yordam beradi va hayotni osonlashtiradi. 🚀"
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // Ensure it's always a Promise
}) {
  const resolvedParams = await params; // Await the promise here
  const { locale } = resolvedParams;

  if (!routing.locales.includes(locale as "uz" | "ru")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <ContextProvider>
      <html lang={locale}>
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <title>ENIX AI Assistent</title>
        </head>
        <body className={`${gilroy.className}`}>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    </ContextProvider>
  );
}


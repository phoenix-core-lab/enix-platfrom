"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const SignInForm = dynamic(() => import("@/components/forms/SignInForm"), {
  ssr: false, // Динамическая загрузка отключает серверный рендеринг
});
const SignInRoute = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInForm />
    </Suspense>
  );
};

export default SignInRoute;

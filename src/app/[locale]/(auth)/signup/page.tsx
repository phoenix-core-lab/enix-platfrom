"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const SignUpForm = dynamic(() => import("@/components/forms/SignUpForm"), {
  ssr: false, // Динамическая загрузка отключает серверный рендеринг
});
const SignUpRoute = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpForm />
    </Suspense>
  );
};

export default SignUpRoute;

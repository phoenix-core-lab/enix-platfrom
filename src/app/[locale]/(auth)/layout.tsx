import React from "react";
import "./layout.sass";

export default function AuthLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="authContainer">
      {children}
    </div>
  );
}

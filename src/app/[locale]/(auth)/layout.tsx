import React from "react";
import "./layout.scss";

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

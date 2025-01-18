"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}
const AccordionItem = ({ title, children }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left hover:bg-gray-50 focus:outline-none"
      >
        <span className="text-gray-700">{title}</span>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <div className="pb-4 text-gray-600">{children}</div>}
    </div>
  );
};
export default AccordionItem;

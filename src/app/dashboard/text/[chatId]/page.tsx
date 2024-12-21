import React from "react";
import Dashboard from "@/components/dashboard/Dashboard";

export default async function ImageDashboard({
  params,
}: {
  params: Promise<{ chatId: string }>,
}) {
  const chatId = (await params).chatId;
  return <Dashboard type="text" chatId={chatId} />;
}

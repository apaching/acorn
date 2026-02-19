"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import React from "react";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "./ui/sidebar";
import capitalizeFirstLetter from "@/utils/string-utils";

const routeData: Record<string, { label: string; description: string }> = {
  overview: {
    label: "Quick Overview",
    description:
      "Get a clear snapshot of what’s happening with your finances this month. View your an overview of your recent transactions, and a summary of your income and expenses.",
  },
  transactions: {
    label: "Transactions",
    description:
      "View and manage all your financial transactions. Track your income, and expenses organized by category.",
  },
  analytics: {
    label: "Analytics",
    description:
      "Explore your financial data in depth. Analyze spending patterns, income trends, and category breakdowns to make informed financial decisions.",
  },
};

export default function ApplicationHeader() {
  const pathName = usePathname();

  const segments = pathName?.split("/").filter(Boolean);

  const lastSegment = pathName?.split("/").filter(Boolean).pop();
  const currentRouteData = lastSegment ? routeData[lastSegment] : undefined;

  return (
    <div className="mb-6 flex w-full flex-col">
      <header className="flex h-12 w-full shrink-0 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              {segments.map((segment, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <BreadcrumbSeparator />}

                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-xs sm:text-[14px]">
                      {capitalizeFirstLetter(segment)}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-col px-4">
        <h1 className="text-primary text-2xl font-bold">
          {currentRouteData?.label}
        </h1>
        <p className="text-sm">{currentRouteData?.description}</p>
      </div>
    </div>
  );
}

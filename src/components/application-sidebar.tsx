"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarRail,
  SidebarMenu,
  SidebarGroup,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/sidebar";
import { Nut } from "lucide-react";
import { Separator } from "./ui/separator";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Collapsible } from "./ui/collapsible";
import { Settings, CreditCard, LayoutDashboard, BarChart3 } from "lucide-react";

export const sidebarItems = [
  {
    title: "Overview",
    url: "/dashboard/overview",
    icon: LayoutDashboard,
  },
  {
    title: "Transactions",
    url: "/dashboard/transactions",
    icon: CreditCard,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function ApplicationSidebar() {
  const { isMobile, toggleSidebar, setOpen } = useSidebar();

  const handleMobileTabClick = () => {
    isMobile ?? toggleSidebar();
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 group-data-[collapsible=icon]:p-3">
        <div className="flex flex-row items-center gap-4 transition-all">
          <div className="bg-primary flex size-10 shrink-0 items-center justify-center rounded-full group-data-[collapsible=icon]:size-6">
            <Nut className="text-primary-foreground group-data-[collapsible=icon]:size-4" />
          </div>
          <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden">
            <p className="truncate text-lg font-bold">Acorn</p>
            <p className="text-muted-foreground truncate text-xs">
              Expense Tracker
            </p>
          </div>
        </div>
      </SidebarHeader>
      <Separator orientation="horizontal" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item, index) => (
                <Collapsible key={index} asChild className="group/collapsible">
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip={item.title} asChild>
                      <Link
                        href={item.url}
                        onClick={handleMobileTabClick}
                        className="flex flex-row items-center gap-3"
                      >
                        <item.icon className="text-muted-foreground" />
                        <p className="text-sm font-medium">{item.title}</p>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="py-2">
            <SidebarMenuButton size="lg">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/sana_placeholder.jpg" />
              </Avatar>
              <div className="flex flex-col">
                <p className="truncate text-sm font-medium">Yves</p>
                <p className="text-muted-foreground truncate text-xs">
                  y@example.com
                </p>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

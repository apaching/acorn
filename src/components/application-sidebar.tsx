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
} from "@/components/ui/sidebar";
import { Nut } from "lucide-react";
import { Separator } from "./ui/separator";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Settings, CreditCard, LayoutDashboard } from "lucide-react";
import { Collapsible, CollapsibleTrigger } from "./ui/collapsible";

export const sidebarItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Transactions",
    url: "/dashboard/transactions",
    icon: CreditCard,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function ApplicationSidebar() {
  const router = useRouter();

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
              {/* {sidebarItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex flex-row items-center gap-2"
                    >
                      <item.icon className="text-muted-foreground" />
                      <p className="text-sm font-medium">{item.title}</p>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))} */}
              {sidebarItems.map((item, index) => (
                <Collapsible key={index} asChild className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className="flex flex-row items-center gap-3"
                        >
                          <item.icon className="text-muted-foreground" />
                          <p className="text-sm font-medium">{item.title}</p>
                        </Link>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
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

/**
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-4 rounded-md p-4">
          <div className="bg-primary flex aspect-square size-10 items-center justify-center rounded-full">
            <Nut className="text-primary-foreground size-6" />
          </div>
          <div className="grid flex-1 text-left leading-tight">
            <span className="truncate text-lg font-bold">Acorn</span>
            <span className="text-muted-foreground text-xs">
              Expense Tracker
            </span>
          </div>
        </div>
      </SidebarHeader>
      <Separator className="my-2" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center gap-3 px-3 py-2"
                    >
                      <item.icon className="text-muted-foreground" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="flex items-center gap-3 px-3 py-2 hover:cursor-pointer">
                <span>Logout</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar> 
 */

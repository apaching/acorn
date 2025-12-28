import ApplicationHeader from "@/components/application-header";
import { ApplicationSidebar } from "@/components/application-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <ApplicationSidebar />
      <SidebarInset>
        <ApplicationHeader />
        <main className="h-full overflow-hidden">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

"use client";

import { useAuthStore } from "@/store/use-auth-store";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      redirect("/login");
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="hidden lg:flex w-64 flex-col fixed inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r bg-white dark:bg-gray-900">
          <div className="flex items-center h-16 px-4 border-b">
            <h1 className="text-lg font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex-1 flex flex-col pb-4 overflow-y-auto">
            {/* Sidebar content - sẽ thêm sau */}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Navbar */}
        <div className="sticky top-0 z-10 flex-shrink-0 h-16 bg-white dark:bg-gray-900 border-b">
          <div className="px-4 flex items-center justify-end h-full">
            <ThemeToggle />
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
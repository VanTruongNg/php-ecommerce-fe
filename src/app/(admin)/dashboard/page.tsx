"use client";

import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore((state) => ({
    user: state.user,
    logout: state.logout,
  }));

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Tổng quan Admin
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors"
        >
          Đăng xuất
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
          Thông tin người dùng
        </h2>
        <div className="space-y-2 text-gray-600 dark:text-gray-300">
          <p>
            <span className="font-medium text-gray-900 dark:text-white">Tên:</span>{" "}
            {user?.name}
          </p>
          <p>
            <span className="font-medium text-gray-900 dark:text-white">Email:</span>{" "}
            {user?.email}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="font-medium mb-2 text-gray-900 dark:text-white">
            Tổng người dùng
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="font-medium mb-2 text-gray-900 dark:text-white">
            Tổng sản phẩm
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="font-medium mb-2 text-gray-900 dark:text-white">
            Tổng đơn hàng
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
        </div>
      </div>
    </div>
  );
}
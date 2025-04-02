"use client";

import { useAuth } from "@/hooks/auth";
import { useLogout } from "@/hooks/auth/use-logout";
import Link from "next/link";
import { useRef, useState, useEffect, memo } from "react";
import { ThemeToggle } from "./theme-toggle";
import { User } from "@/lib/api/types";

// Tạo component con để tối ưu render
const UserMenu = memo(
  ({ user, onLogout }: { user: User | null; onLogout: () => void }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Xử lý click outside để đóng dropdown
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          setIsMenuOpen(false);
        }
      }

      // Thêm event listener khi menu mở
      if (isMenuOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      // Cleanup function
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isMenuOpen]);

    // Lấy ký tự đầu tiên của tên người dùng an toàn
    const getInitials = () => {
      if (!user || !user.name) return "U";
      return user.name.charAt(0).toUpperCase();
    };

    return (
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
        >
          <div className="w-8 h-8 bg-primary rounded-full text-white flex items-center justify-center">
            {getInitials()}
          </div>
          <span className="font-medium hidden sm:inline">
            {user?.name || "Người dùng"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-700 z-10">
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.name || "Người dùng"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email || ""}
              </p>
            </div>

            {user?.role === "admin" && (
              <Link
                href="/admin/dashboard"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Quản trị viên
              </Link>
            )}

            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Hồ sơ
            </Link>

            <Link
              href="/orders"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Đơn hàng
            </Link>

            <button
              onClick={() => {
                onLogout();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    );
  }
);

UserMenu.displayName = "UserMenu";

// Tạo component AuthButtons cho trường hợp chưa đăng nhập
const AuthButtons = memo(() => (
  <>
    <Link
      href="/auth/login"
      className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 transition-colors"
    >
      Đăng nhập
    </Link>
    <Link
      href="/auth/register"
      className="rounded-md border border-primary px-4 py-2 text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
    >
      Đăng ký
    </Link>
  </>
));

AuthButtons.displayName = "AuthButtons";

// Component Loading
const LoadingState = memo(() => (
  <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
));

LoadingState.displayName = "LoadingState";

export function Header() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const logout = useLogout();

  const handleLogout = (e?: React.MouseEvent) => {
    // Ngăn chặn event bubbling
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    logout.mutate();
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold hover:text-primary transition-colors"
        >
          E-Commerce
        </Link>
        <div className="flex items-center gap-4">
          {isLoading ? (
            <LoadingState />
          ) : isAuthenticated && user ? (
            <UserMenu user={user} onLogout={handleLogout} />
          ) : (
            <AuthButtons />
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        E-Commerce Frontend
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl">
        Website thương mại điện tử được xây dựng bằng Next.js, TanStack Query và
        Zustand
      </p>

      {/* Các section khác sẽ được thêm sau */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Sản phẩm đa dạng
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Khám phá hàng ngàn sản phẩm chất lượng cao từ các thương hiệu uy tín
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Thanh toán an toàn
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Giao dịch bảo mật với nhiều phương thức thanh toán khác nhau
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Giao hàng nhanh chóng
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Vận chuyển tận nơi với dịch vụ giao hàng chuyên nghiệp
          </p>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Xóa import Navbar và Footer ở đây vì page.tsx đã tự gọi rồi

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "SMAR Agency - Biến Dữ Liệu Thành Doanh Số",
  description: "SMAR 2026: Đóng gói giá trị - Đột phá tăng trưởng",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        {/* CHỈ để lại children ở đây */}
        {children}
      </body>
    </html>
  );
}
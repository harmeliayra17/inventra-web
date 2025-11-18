// middleware.ts

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Kita akan gunakan withAuth dengan "callbacks"
export default withAuth(
  // 1. Fungsi 'middleware' ini akan berjalan HANYA jika 'authorized' di bawah mengembalikan 'true'
  function middleware(req) {
    console.log("✅ [Middleware] BERJALAN: Pengguna SUDAH login.");
    console.log("   Path:", req.nextUrl.pathname);
    console.log("   Token:", req.nextauth.token);
    console.log("====================================");

    // (Anda bisa tambahkan logika role di sini nanti)
    return NextResponse.next();
  },

  // 2. Blok 'callbacks' ini adalah KUNCINYA
  {
    callbacks: {
      // 'authorized' akan berjalan SEBELUM fungsi 'middleware' di atas
      authorized: ({ token }) => {
        console.log("--- [Callback: authorized] ---");
        console.log("   Mengecek token...");

        // 'token' akan ada (bukan null) JIKA pengguna sudah login
        // 'return !!token' adalah cara singkat bilang:
        // "Jika ada token (true), izinkan. Jika tidak ada (false), redirect."
        if (!token) {
          console.log("   Token: TIDAK ADA. 🔴 Redirecting ke /login...");
          console.log("---------------------------------");
        } else {
          console.log("   Token: Ditemukan. ✅ Diizinkan.");
          console.log("---------------------------------");
        }

        return !!token;
      },
    },
  }
);

// 3. Matcher Anda (ini sudah benar)
export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
  ],
};
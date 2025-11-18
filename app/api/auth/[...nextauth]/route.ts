// app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  // 2. Tentukan "Providers", cara kita login
  providers: [
    CredentialsProvider({
      // Ini adalah nama provider kita
      name: "Credentials",

      // Ini adalah kredensial yang kita minta dari form login
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      // 3. Fungsi "authorize" inilah yang mengecek login
      async authorize(credentials, req) {
        
        // 1. Cek dulu apakah 'credentials' ada
        if (!credentials) {
          return null;
        }

        // 2. Sekarang kita bisa "destructure" dengan aman
        const { username, password } = credentials;

        // 3. Cek apakah isinya ada
        if (!username || !password) {
          return null;
        }

        // Cari user di database
        const user = await prisma.user.findUnique({
          where: { username: username }, // <-- Sekarang ini aman
        });

        // Jika user tidak ditemukan
        if (!user) {
          return null;
        }

        // Cek password
        const isPasswordValid = await bcrypt.compare(
            password, // <-- Gunakan variabel 'password'
            user.password! 
        );



        // Jika password salah
        if (!isPasswordValid) {
          return null;
        }

        // Jika user & password benar, kembalikan data user
        return {
          id: user.id,
          username: user.username,
          role: user.role, // Kita sertakan role-nya!
        };
      },
    }),
  ],

  // 4. Atur bagaimana session bekerja
  session: {
    strategy: "jwt", // Kita gunakan JWT (JSON Web Token)
  },

  // 5. Callback untuk menambahkan 'role' ke token
  // 5. Callback untuk menambahkan 'role' ke token
  callbacks: {
    async jwt({ token, user }) {
      // 'user' HANYA ada saat pertama kali login.
      if (user) {
        token.id = user.id;
        // Kita "paksa" TypeScript di sini
        token.role = (user as any).role; 
      }
      return token;
    },
    
    async session({ session, token }) {
      if (session.user) {
        // Kita "paksa" TypeScript di sini juga
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },

  // 6. Tentukan halaman kustom
  pages: {
    signIn: "/login", // Arahkan pengguna ke /login jika mereka belum login
    signOut: "/login",
    error: "/login", // Arahkan ke /login jika ada error
  },
};

// Ekspor handler-nya
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
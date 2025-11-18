// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, Eye, EyeOff, UserCircle } from 'lucide-react';
import { signIn } from 'next-auth/react'; // 1. Impor signIn

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

  // 2. Ganti total fungsi handleSubmit
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(''); // Reset error

    try {
      // 3. Panggil fungsi signIn dari NextAuth
      const result = await signIn('credentials', {
        // 'credentials' adalah nama provider yang kita buat
        redirect: false, // Kita tangani redirect manual
        username: username,
        password: password,
      });

      if (result?.error) {
        // Jika NextAuth mengembalikan error (misal: password salah)
        setError('Invalid username or password');
      } else if (result?.ok) {
        // Jika login sukses, arahkan ke dashboard
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('An unexpected error occurred.');
    }
  };

  // ... sisa file Anda (render form) tidak perlu diubah ...
  // ... (pastikan form Anda memanggil onSubmit={handleSubmit}) ...

  // ... (Ini adalah sisa kode render Anda, tidak perlu diubah) ...
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl md:grid md:grid-cols-2">
        {/* Kolom Form */}
        <div className="p-8 md:p-12">
          <h2 className="mb-4 text-4xl font-bold text-maroon">Login</h2>
          <p className="mb-8 text-gray-600">
            Welcome back! Please login to your account.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <UserCircle size={20} />
                </span>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full rounded-lg border-gray-300 py-3 pl-10 pr-4 shadow-sm focus:border-maroon focus:ring-maroon"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <span
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                >
                  {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Gunakan password yang di-hash"
                  className="w-full rounded-lg border-gray-300 py-3 pl-4 pr-10 shadow-sm focus:border-maroon focus:ring-maroon"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-maroon focus:ring-maroon"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember Me
                </label>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            {/* Tombol Submit */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-maroon px-4 py-3 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-maroon-dark focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2"
            >
              <LogIn size={20} />
              <span>Login</span>
            </button>
          </form>
        </div>

        {/* Kolom Gambar (Pastikan bg.jpg ada di /public/bg.jpg) */}
        <div className="relative hidden bg-cover bg-center md:block" style={{ backgroundImage: "url('/bg.jpg')" }}>
          <div className="absolute inset-0 bg-maroon opacity-30"></div>
        </div>
      </div>
    </div>
  );
}
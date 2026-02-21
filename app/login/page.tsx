'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [createMessage, setCreateMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Email atau password tidak valid');
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const createDemoUsers = async () => {
    try {
      const response = await fetch('/api/create-demo-users', {
        method: 'POST',
      });
      
      const data = await response.json();
      setCreateMessage(data.message);
      
      setTimeout(() => setCreateMessage(''), 3000);
    } catch (error) {
      setCreateMessage('Gagal membuat demo users');
      setTimeout(() => setCreateMessage(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/80 via-green-50/60 to-blue-50/80 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Nature Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-400/10 rounded-full animate-float blur-xl"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-green-400/15 rounded-full animate-wave blur-lg"></div>
        <div className="absolute top-1/2 left-8 w-16 h-16 bg-blue-400/10 rounded-full animate-pulse blur-md"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white/90 backdrop-blur-xl shadow-2xl shadow-emerald-500/10 rounded-3xl border border-emerald-100 overflow-hidden">
          {/* Header dengan gradien */}
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.41 8.86L20 7.5L15.59 12L20 16.5L13.41 15.14L12 22L10.59 15.14L4 16.5L8.41 12L4 7.5L10.59 8.86L12 2Z" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Selamat Datang
            </h2>
            <p className="text-emerald-100 text-sm">
              Masuk ke akun Karwanua Anda
            </p>
          </div>

          {/* Form Content */}
          <div className="px-8 py-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 transition-all duration-300 hover:shadow-md"
                      placeholder="Masukkan email Anda"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 transition-all duration-300 hover:shadow-md"
                      placeholder="Masukkan password Anda"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative flex w-full justify-center rounded-md bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-green-500 hover:to-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Memproses...
                      </>
                    ) : (
                      <>
                        Masuk ke Karwanua
                        <svg className="ml-2 -mr-1 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Belum punya akun?{" "}
              <Link href="/register" className="font-semibold leading-6 text-green-600 hover:text-green-500">
                Daftar di sini
              </Link>
            </p>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Demo Login:</h3>
              <div className="text-xs text-gray-600 space-y-1">
                <div>
                  <strong>Admin:</strong> admin@karwanua.com / admin123
                </div>
                <div>
                  <strong>User:</strong> user1@example.com / user123
                </div>
              </div>
              
              <div className="mt-3">
                <button
                  onClick={createDemoUsers}
                  className="w-full text-xs bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-500"
                >
                  Buat Demo Users (Jika Belum Ada)
                </button>
                {createMessage && (
                  <div className="mt-2 text-xs text-center">
                    {createMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

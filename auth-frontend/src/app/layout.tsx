// src/app/layout.tsx

import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { Toaster } from "react-hot-toast";

import { GoogleOAuthProvider } from '@react-oauth/google';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Your App',
  description: 'Your App Description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <GoogleOAuthProvider clientId="548740690615-6jm5ctm0ra1j3tel27etm3bh8idrc66n.apps.googleusercontent.com">

          <AuthProvider>
            <Navbar />
            <Toaster />
            <main className="p-4 max-w-4xl mx-auto">{children}</main>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}

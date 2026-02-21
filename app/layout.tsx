import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Karwanua - Hitung Emisimu, Tebus Karbonmu",
  description: "Platform untuk menghitung jejak karbon pribadi dan menebusnya melalui aksi nyata seperti menanam pohon dan berdonasi.",
  keywords: ["karbon", "emisi", "jejak karbon", "lingkungan", "keberlanjutan", "pohon", "Indonesia", "sustainability"],
  authors: [{ name: "Karwanua Team" }],
  creator: "Karwanua",
  publisher: "Karwanua",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "Karwanua - Tebus Karbon",
    title: "Karwanua - Hitung Emisimu, Tebus Karbonmu 🌱",
    description: "Hitung jejak karbon pribadi Anda dan ambil aksi nyata untuk menebus emisi melalui penanaman pohon, donasi, atau tantangan hijau.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Karwanua - Platform Tebus Karbon Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karwanua - Hitung Emisimu, Tebus Karbonmu 🌱",
    description: "Platform untuk menghitung jejak karbon pribadi dan menebusnya melalui aksi nyata.",
    images: ["/images/og-image.png"],
    creator: "@karwanua",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon/favicon.ico",
    shortcut: "/icon/favicon-16x16.png",
    apple: "/icon/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-white flex flex-col antialiased">
        <AuthProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}

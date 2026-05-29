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
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-[#030a08] text-slate-200 flex flex-col antialiased" suppressHydrationWarning>
        <AuthProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}

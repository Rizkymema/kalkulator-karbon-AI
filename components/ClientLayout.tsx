'use client'

import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { data: session } = useSession()
  
  // Hide navbar for admin pages OR when user is admin (regardless of page)
  const isAdminPage = pathname?.startsWith('/admin')
  const isAdminUser = session?.user?.role === 'ADMIN'
  const hideNavbar = isAdminPage || isAdminUser

  return (
    <>
      {/* Only show navbar and footer for non-admin pages and non-admin users */}
      {!hideNavbar && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
      {!hideNavbar && <Footer />}
      
      {/* AI Chatbot - Only show for non-admin pages and non-admin users */}
      {!hideNavbar && <Chatbot className="bottom-6 right-6" />}
    </>
  )
}

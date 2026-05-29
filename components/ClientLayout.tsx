'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'
import Lenis from 'lenis'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { data: session } = useSession()

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [pathname]) // Re-init or reset on path changes

  
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

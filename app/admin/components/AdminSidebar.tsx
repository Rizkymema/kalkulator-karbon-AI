"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings,
  User,
  LogOut,
  Home
} from "lucide-react";

const AdminSidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navigationItems = [
    {
      name: "Dashboard Admin",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Kelola User",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "Kelola Konten",
      href: "/admin/content",
      icon: FileText,
    },
    {
      name: "Pengaturan Sistem",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen fixed left-0 top-0 z-40">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold text-blue-400">
          Admin Dashboard
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Karwanua Management
        </p>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 group ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Admin Profile & Actions */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-slate-700">
        {session && (
          <>
            {/* Admin Profile Info */}
            <div className="p-4 border-b border-slate-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">
                    Admin Karwanua
                  </div>
                  <div className="text-xs text-slate-400 truncate">
                    {session.user.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Actions */}
            <div className="p-3 space-y-1">
              <Link
                href="/profil"
                className="flex items-center px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors duration-200"
              >
                <User className="w-4 h-4 mr-3" />
                <span>Profil Saya</span>
              </Link>
              
              <Link
                href="/"
                className="flex items-center px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors duration-200"
              >
                <Home className="w-4 h-4 mr-3" />
                <span>Kembali ke Website</span>
              </Link>
              
              <button
                onClick={() => signOut()}
                className="w-full flex items-center px-3 py-2 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-lg transition-colors duration-200"
              >
                <LogOut className="w-4 h-4 mr-3" />
                <span>Keluar</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminSidebar;

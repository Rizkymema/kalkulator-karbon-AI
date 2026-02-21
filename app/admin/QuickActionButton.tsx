'use client'

import { Target } from "lucide-react";

export default function QuickActionButton() {
  const handleCreateDemoUsers = () => {
    if (confirm('Apakah Anda ingin membuat demo users?\n\nAdmin: admin@karwanua.com\nUser: user1@example.com')) {
      fetch('/api/create-demo-users')
        .then(res => res.json())
        .then(data => {
          alert('Demo users berhasil dibuat!\n\nAdmin: admin@karwanua.com (password: admin123)\nUser: user1@example.com (password: user123)');
          window.location.reload();
        })
        .catch(err => alert('Error: ' + err.message));
    }
  };

  return (
    <button 
      onClick={handleCreateDemoUsers}
      className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer text-left w-full"
    >
      <Target className="h-8 w-8 text-orange-600 mb-2" />
      <p className="font-medium text-sm">Demo Users</p>
      <p className="text-xs text-gray-500">Buat akun demo</p>
    </button>
  );
}

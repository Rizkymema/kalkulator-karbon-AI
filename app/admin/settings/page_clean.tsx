import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Database, 
  Shield, 
  Mail, 
  FileText, 
  Settings, 
  Server,
  AlertTriangle
} from "lucide-react";

export default function SystemSettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Pengaturan Sistem</h1>
        <p className="text-slate-600 mt-1">
          Kelola konfigurasi dan pengaturan sistem Karwanua
        </p>
      </div>

      {/* System Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Database Settings */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Database className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-lg font-semibold">Database</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Status Koneksi</span>
              <span className="text-sm font-medium text-green-600">Terhubung</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Total Records</span>
              <span className="text-sm font-medium">25,847</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Backup Terakhir</span>
              <span className="text-sm font-medium">2 jam lalu</span>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-3">
              Backup Database
            </Button>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 text-green-600 mr-3" />
            <h2 className="text-lg font-semibold">Keamanan</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">2FA Status</span>
              <span className="text-sm font-medium text-green-600">Aktif</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">SSL Certificate</span>
              <span className="text-sm font-medium text-green-600">Valid</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">API Rate Limiting</span>
              <span className="text-sm font-medium text-blue-600">Enabled</span>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-3">
              Update Security
            </Button>
          </div>
        </Card>

        {/* Email Configuration */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Mail className="w-6 h-6 text-purple-600 mr-3" />
            <h2 className="text-lg font-semibold">Email Configuration</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">SMTP Status</span>
              <span className="text-sm font-medium text-green-600">Aktif</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Email Queue</span>
              <span className="text-sm font-medium">12 pending</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Daily Limit</span>
              <span className="text-sm font-medium">500/1000</span>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-3">
              Test Email
            </Button>
          </div>
        </Card>

        {/* Content Management */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <FileText className="w-6 h-6 text-orange-600 mr-3" />
            <h2 className="text-lg font-semibold">Content Management</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Total Articles</span>
              <span className="text-sm font-medium">127</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Published</span>
              <span className="text-sm font-medium text-green-600">98</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Draft</span>
              <span className="text-sm font-medium text-yellow-600">29</span>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-3">
              Content Analytics
            </Button>
          </div>
        </Card>
      </div>

      {/* System Actions */}
      <Card className="p-6">
        <div className="flex items-center mb-4">
          <Settings className="w-6 h-6 text-slate-600 mr-3" />
          <h2 className="text-lg font-semibold">System Actions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="flex items-center justify-center h-12">
            <Server className="w-4 h-4 mr-2" />
            Restart Server
          </Button>
          <Button variant="outline" className="flex items-center justify-center h-12">
            <Database className="w-4 h-4 mr-2" />
            Clear Cache
          </Button>
          <Button variant="destructive" className="flex items-center justify-center h-12">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Maintenance Mode
          </Button>
        </div>
      </Card>

      {/* System Information */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">System Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">99.9%</div>
            <div className="text-sm text-slate-600">Uptime</div>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">45%</div>
            <div className="text-sm text-slate-600">CPU Usage</div>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">62%</div>
            <div className="text-sm text-slate-600">Memory Usage</div>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">23GB</div>
            <div className="text-sm text-slate-600">Storage Used</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

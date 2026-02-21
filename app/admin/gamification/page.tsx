import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function GamificationManagement() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  // Get user achievements data
  const users = await prisma.user.findMany({
    include: {
      emissions: {
        select: { totalEmisi: true, createdAt: true }
      }
    }
  });

  // Calculate achievements for each user
  const usersWithAchievements = users.map(user => {
    const totalEmissions = user.emissions.reduce((sum, e) => sum + e.totalEmisi, 0);
    const calculationCount = user.emissions.length;
    const streak = calculateStreak(user.emissions);
    
    return {
      ...user,
      totalEmissions,
      calculationCount,
      streak,
      badges: generateBadges(totalEmissions, calculationCount, streak)
    };
  });

  // Achievement statistics
  const achievementStats = {
    totalUsers: users.length,
    activeUsers: usersWithAchievements.filter(u => u.calculationCount > 0).length,
    ecoWarriors: usersWithAchievements.filter(u => u.badges.includes('Eco Warrior')).length,
    carbonTrackers: usersWithAchievements.filter(u => u.badges.includes('Carbon Tracker')).length,
    streakMasters: usersWithAchievements.filter(u => u.streak >= 7).length
  };

  // Leaderboard
  const topUsers = usersWithAchievements
    .sort((a, b) => b.calculationCount - a.calculationCount)
    .slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">🎮 Manajemen Gamifikasi</h1>
        <p className="text-purple-100">
          Kelola sistem badge, achievement, dan leaderboard untuk meningkatkan engagement
        </p>
      </div>

      {/* Achievement Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              👥
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Pengguna</h3>
              <p className="text-2xl font-bold text-gray-900">{achievementStats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              ⚡
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Pengguna Aktif</h3>
              <p className="text-2xl font-bold text-gray-900">{achievementStats.activeUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              🏆
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Eco Warriors</h3>
              <p className="text-2xl font-bold text-gray-900">{achievementStats.ecoWarriors}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100 text-orange-600">
              🔥
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Streak Masters</h3>
              <p className="text-2xl font-bold text-gray-900">{achievementStats.streakMasters}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Badge Management & Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Badge System */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">🏅 Sistem Badge</h2>
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
              + Buat Badge
            </button>
          </div>
          
          <div className="space-y-4">
            {[
              {
                name: "First Steps",
                icon: "🌱",
                description: "Melakukan kalkulasi pertama",
                criteria: "1 kalkulasi",
                color: "bg-green-100 text-green-800",
                earned: usersWithAchievements.filter(u => u.calculationCount >= 1).length
              },
              {
                name: "Carbon Tracker",
                icon: "📊",
                description: "Melakukan 5 kalkulasi",
                criteria: "5 kalkulasi",
                color: "bg-blue-100 text-blue-800",
                earned: usersWithAchievements.filter(u => u.calculationCount >= 5).length
              },
              {
                name: "Eco Warrior",
                icon: "🏆",
                description: "Melakukan 10+ kalkulasi",
                criteria: "10+ kalkulasi",
                color: "bg-yellow-100 text-yellow-800",
                earned: usersWithAchievements.filter(u => u.calculationCount >= 10).length
              },
              {
                name: "Streak Master",
                icon: "🔥",
                description: "7 hari berturut-turut",
                criteria: "Streak 7 hari",
                color: "bg-red-100 text-red-800",
                earned: usersWithAchievements.filter(u => u.streak >= 7).length
              },
              {
                name: "Green Champion",
                icon: "🌍",
                description: "Emisi rendah konsisten",
                criteria: "Rata-rata < 500kg CO₂",
                color: "bg-emerald-100 text-emerald-800",
                earned: usersWithAchievements.filter(u => u.calculationCount > 0 && (u.totalEmissions / u.calculationCount) < 500).length
              }
            ].map((badge, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{badge.icon}</span>
                    <div>
                      <h3 className="font-medium text-gray-900">{badge.name}</h3>
                      <p className="text-sm text-gray-600">{badge.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${badge.color}`}>
                      {badge.earned} earned
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Edit
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Kriteria: {badge.criteria}</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{
                        width: `${achievementStats.totalUsers > 0 ? (badge.earned / achievementStats.totalUsers) * 100 : 0}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">🏆 Leaderboard Top 10</h2>
          <div className="space-y-3">
            {topUsers.map((user, index) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                  </span>
                  <div>
                    <h4 className="font-medium text-gray-900">{user.name}</h4>
                    <p className="text-sm text-gray-500">
                      {user.calculationCount} kalkulasi • Streak {user.streak} hari
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {user.badges.slice(0, 3).map((badge, badgeIndex) => (
                    <span key={badgeIndex} className="text-lg" title={badge}>
                      {getBadgeIcon(badge)}
                    </span>
                  ))}
                  {user.badges.length > 3 && (
                    <span className="text-xs text-gray-500">+{user.badges.length - 3}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gamification Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">⚙️ Pengaturan Gamifikasi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Point System</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">Per Kalkulasi</span>
                <span className="font-medium">10 poin</span>
                <button className="text-blue-600 text-sm">Edit</button>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">Streak Bonus</span>
                <span className="font-medium">5 poin</span>
                <button className="text-blue-600 text-sm">Edit</button>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">Badge Reward</span>
                <span className="font-medium">50 poin</span>
                <button className="text-blue-600 text-sm">Edit</button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Notifications</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm text-gray-700">Badge earned notifications</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm text-gray-700">Leaderboard updates</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-700">Weekly summaries</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm text-gray-700">Streak reminders</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Display Settings</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm text-gray-700">Show leaderboard</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm text-gray-700">Public badges</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-700">Anonymous mode</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm text-gray-700">Progress animations</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-end space-x-4">
            <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
              Reset Default
            </button>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
              Simpan Pengaturan
            </button>
          </div>
        </div>
      </div>

      {/* Achievement Analytics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">📈 Analytics Pencapaian</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Badge Distribution</h3>
            <div className="space-y-2">
              {['First Steps', 'Carbon Tracker', 'Eco Warrior', 'Streak Master', 'Green Champion'].map((badge) => (
                <div key={badge} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">{badge}</span>
                  <span className="text-sm font-medium">
                    {Math.floor(Math.random() * 50) + 10}%
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Engagement Metrics</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Daily Active Users</span>
                <span className="text-sm font-medium">{Math.floor(achievementStats.activeUsers * 0.3)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Return Rate</span>
                <span className="text-sm font-medium">67%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Badge Completion</span>
                <span className="text-sm font-medium">43%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Average Session</span>
                <span className="text-sm font-medium">8.5 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function calculateStreak(emissions: Array<{ createdAt: Date }>): number {
  if (emissions.length === 0) return 0;
  
  const sortedDates = emissions
    .map(e => new Date(e.createdAt).toDateString())
    .sort()
    .filter((date, index, arr) => arr.indexOf(date) === index);
  
  let streak = 1;
  for (let i = sortedDates.length - 1; i > 0; i--) {
    const current = new Date(sortedDates[i]);
    const previous = new Date(sortedDates[i - 1]);
    const diffTime = Math.abs(current.getTime() - previous.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

function generateBadges(totalEmissions: number, calculationCount: number, streak: number): string[] {
  const badges: string[] = [];
  
  if (calculationCount >= 1) badges.push('First Steps');
  if (calculationCount >= 5) badges.push('Carbon Tracker');
  if (calculationCount >= 10) badges.push('Eco Warrior');
  if (streak >= 7) badges.push('Streak Master');
  if (calculationCount > 0 && (totalEmissions / calculationCount) < 500) {
    badges.push('Green Champion');
  }
  
  return badges;
}

function getBadgeIcon(badge: string): string {
  const icons: { [key: string]: string } = {
    'First Steps': '🌱',
    'Carbon Tracker': '📊',
    'Eco Warrior': '🏆',
    'Streak Master': '🔥',
    'Green Champion': '🌍'
  };
  return icons[badge] || '🏅';
}

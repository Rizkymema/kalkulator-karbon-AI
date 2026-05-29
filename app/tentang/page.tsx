import Image from 'next/image'
import { Users, Target, Heart } from 'lucide-react'
import Card from '../../components/Card'

export default function TentangPage() {
  const teamMembers = [
    {
      name: 'Rizky Mema',
      role: 'Founder & Developer',
      description: 'Pengembang dan pendiri Karwanua yang berdedikasi untuk membangun solusi teknologi ramah lingkungan.',
      image: '/images/foto profil.png',
    },
  ]

  const values = [
    {
      icon: <Target className="w-8 h-8 text-emerald-400" />,
      title: 'Misi Jelas',
      description: 'Membantu setiap individu memahami dan mengurangi jejak karbon mereka untuk masa depan bumi yang lebih berkelanjutan.',
    },
    {
      icon: <Heart className="w-8 h-8 text-rose-400" />,
      title: 'Peduli Lingkungan',
      description: 'Kami percaya bahwa setiap tindakan kecil dapat memberikan dampak besar bagi kelestarian lingkungan.',
    },
    {
      icon: <Users className="w-8 h-8 text-blue-400" />,
      title: 'Komunitas',
      description: 'Membangun komunitas global yang peduli lingkungan dan bertindak nyata untuk perubahan positif.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#030a08] text-slate-200 pt-36 pb-12 relative overflow-hidden">
      {/* Background glow matching homepage */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/90 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white mb-6 uppercase">
            Tentang <span className="text-[#3AA17E]">Karwanua</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto font-medium">
            Platform digital yang membantu individu dan komunitas untuk memahami,
            menghitung, dan menebus jejak karbon mereka melalui aksi nyata.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="text-center !bg-slate-900/40 !border-white/5" hover>
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Misi Kami</h2>
            <p className="text-slate-400 leading-relaxed font-medium">
              Memberdayakan setiap individu untuk menjadi agen perubahan dalam memerangi
              perubahan iklim melalui pemahaman yang lebih baik tentang jejak karbon dan
              aksi konkret untuk menguranginya.
            </p>
          </Card>

          <Card className="text-center !bg-slate-900/40 !border-white/5" hover>
            <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Visi Kami</h2>
            <p className="text-slate-400 leading-relaxed font-medium">
              Mewujudkan dunia di mana setiap orang sadar akan dampak lingkungan dari
              aktivitas mereka dan secara aktif berkontribusi dalam menciptakan masa
              depan yang berkelanjutan.
            </p>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-white text-center mb-12 uppercase tracking-tight">
            Nilai-Nilai Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center !bg-slate-900/40 !border-white/5" hover>
                <div className="w-16 h-16 bg-slate-950/60 border border-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Story */}
        <Card className="mb-16 !bg-slate-900/40 !border-white/5">
          <h2 className="text-3xl font-bold text-white mb-6">Cerita Kami</h2>
          <div className="prose max-w-none text-slate-400 font-medium leading-relaxed">
            <p className="mb-4">
              Karwanua lahir dari keprihatinan mendalam terhadap perubahan iklim yang
              semakin nyata dampaknya. Kami menyadari bahwa meskipun masalah perubahan
              iklim terasa sangat besar dan kompleks, setiap individu memiliki kekuatan
              untuk membuat perbedaan.
            </p>
            <p className="mb-4">
              Karwanua dimulai dari keinginan untuk menciptakan solusi teknologi yang
              dapat mendorong perubahan positif terhadap lingkungan. Banyak orang ingin
              berkontribusi untuk lingkungan, tetapi tidak tahu harus mulai dari mana.
            </p>
            <p>
              Itulah mengapa kami menciptakan platform yang tidak hanya menghitung jejak
              karbon, tetapi juga memberikan solusi konkret dan mudah diakses untuk
              menebus emisi tersebut. Dari penanaman pohon hingga perubahan gaya hidup,
              kami percaya bahwa setiap tindakan kecil dapat menciptakan dampak besar.
            </p>
          </div>
        </Card>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-white text-center mb-12 uppercase tracking-tight">
            Tim Kami
          </h2>
          <div className="flex justify-center">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center max-w-sm w-full !bg-slate-900/40 !border-white/5" hover>
                <div className="flex justify-center mb-4">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-emerald-500/20 shadow-md bg-slate-950 flex items-center justify-center p-1">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="max-w-full max-h-full object-contain rounded-xl"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-emerald-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  {member.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Impact Stats */}
        <div className="bg-gradient-to-r from-slate-900/80 to-emerald-950/20 border border-white/5 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-black text-white text-center mb-8 uppercase tracking-tight">
            Dampak Bersama
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-400 mb-2">1,247+</div>
              <p className="text-slate-400 font-semibold uppercase tracking-wider text-xs">Pengguna Aktif</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-400 mb-2">850+</div>
              <p className="text-slate-400 font-semibold uppercase tracking-wider text-xs">Ton CO₂ Dikurangi</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-400 mb-2">5,600+</div>
              <p className="text-slate-400 font-semibold uppercase tracking-wider text-xs">Pohon Ditanam</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-400 mb-2">15+</div>
              <p className="text-slate-400 font-semibold uppercase tracking-wider text-xs">Kota Terlibat</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

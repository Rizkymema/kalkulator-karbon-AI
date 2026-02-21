import { Users, Target, Heart, Mail, MapPin, Phone } from 'lucide-react'
import Card from '../../components/Card'

export default function TentangPage() {
  const teamMembers = [
    {
      name: 'Marlon Kamagi',
      role: 'Environmental Scientist',
      description: 'Ahli lingkungan dengan 15+ tahun pengalaman dalam penelitian perubahan iklim.',
      image: '👩‍💻',
    },
    {
      name: 'Rizky Mema',
      role: 'Software Engineer',
      description: 'Developer berpengalaman dalam membangun aplikasi ramah lingkungan.',
      image: '👨‍💻',
    },
    {
      name: 'Kevin Pesik',
      role: 'Sustainability Expert',
      description: 'Konsultan keberlanjutan yang membantu perusahaan mengurangi jejak karbon.',
      image: '👩‍🌾',
    },
  ]

  const values = [
    {
      icon: <Target className="w-8 h-8 text-green-600" />,
      title: 'Misi Jelas',
      description: 'Membantu setiap individu memahami dan mengurangi jejak karbon mereka untuk masa depan bumi yang lebih berkelanjutan.',
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: 'Peduli Lingkungan',
      description: 'Kami percaya bahwa setiap tindakan kecil dapat memberikan dampak besar bagi kelestarian lingkungan.',
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: 'Komunitas',
      description: 'Membangun komunitas global yang peduli lingkungan dan bertindak nyata untuk perubahan positif.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Tentang <span className="text-[#3AA17E]">Karwanua</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Platform digital yang membantu individu dan komunitas untuk memahami,
            menghitung, dan menebus jejak karbon mereka melalui aksi nyata.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="text-center" hover>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Misi Kami</h2>
            <p className="text-gray-600 leading-relaxed">
              Memberdayakan setiap individu untuk menjadi agen perubahan dalam memerangi
              perubahan iklim melalui pemahaman yang lebih baik tentang jejak karbon dan
              aksi konkret untuk menguranginya.
            </p>
          </Card>

          <Card className="text-center" hover>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Visi Kami</h2>
            <p className="text-gray-600 leading-relaxed">
              Mewujudkan dunia di mana setiap orang sadar akan dampak lingkungan dari
              aktivitas mereka dan secara aktif berkontribusi dalam menciptakan masa
              depan yang berkelanjutan.
            </p>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nilai-Nilai Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center" hover>
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Story */}
        <Card className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Cerita Kami</h2>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              Karwanua lahir dari keprihatinan mendalam terhadap perubahan iklim yang
              semakin nyata dampaknya. Kami menyadari bahwa meskipun masalah perubahan
              iklim terasa sangat besar dan kompleks, setiap individu memiliki kekuatan
              untuk membuat perbedaan.
            </p>
            <p className="mb-4">
              Didirikan pada tahun 2024, Karwanua dimulai sebagai proyek kecil dari
              sekelompok ahli lingkungan, developer, dan aktivis yang percaya bahwa
              teknologi dapat menjadi alat untuk mendorong perubahan positif. Kami
              melihat bahwa banyak orang ingin berkontribusi untuk lingkungan, tetapi
              tidak tahu harus mulai dari mana.
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
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Tim Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center" hover>
                <div className="text-6xl mb-4">
                  {member.image}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-[#3AA17E] font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Impact Stats */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Dampak Bersama
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#3AA17E] mb-2">1,247+</div>
              <p className="text-gray-600">Pengguna Aktif</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#3AA17E] mb-2">850+</div>
              <p className="text-gray-600">Ton CO₂ Dikurangi</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#3AA17E] mb-2">5,600+</div>
              <p className="text-gray-600">Pohon Ditanam</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#3AA17E] mb-2">15+</div>
              <p className="text-gray-600">Kota Terlibat</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <Card>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Hubungi Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">info@karwanua.com</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Telepon</h3>
              <p className="text-gray-600">+62 21 1234 5678</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Alamat</h3>
              <p className="text-gray-600">Jakarta, Indonesia</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600 mb-4">
              Ada pertanyaan atau ingin berkolaborasi? Kami selalu terbuka untuk diskusi!
            </p>
            <a
              href="mailto:info@karwanua.com"
              className="bg-[#3AA17E] text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors inline-flex items-center"
            >
              <Mail className="w-4 h-4 mr-2" />
              Kirim Email
            </a>
          </div>
        </Card>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { BookOpen, Lightbulb, TreePine, Recycle, Zap, Droplets, ChevronRight, Award } from 'lucide-react'

export default function EdukasiPage() {
  const [selectedCategory, setSelectedCategory] = useState('semua')
  const [quizScore, setQuizScore] = useState<number | null>(null)
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])

  const categories = [
    { id: 'semua', label: 'Semua', icon: BookOpen },
    { id: 'transportasi', label: 'Transportasi', icon: TreePine },
    { id: 'energi', label: 'Energi', icon: Zap },
    { id: 'sampah', label: 'Sampah', icon: Recycle },
    { id: 'air', label: 'Air', icon: Droplets },
  ]

  const articles = [
    {
      id: 1,
      title: 'Mengapa Jejak Karbon Penting untuk Masa Depan Bumi?',
      category: 'semua',
      excerpt: 'Jejak karbon adalah ukuran emisi gas rumah kaca yang dihasilkan oleh aktivitas manusia. Memahami dan mengurangi jejak karbon adalah kunci untuk memerangi perubahan iklim.',
      readTime: '5 menit',
      tips: [
        'Satu mobil menghasilkan rata-rata 4.6 ton CO₂ per tahun',
        'Transportasi berkontribusi 24% dari emisi global',
        'Berjalan kaki 1 km dapat menghemat 0.21 kg CO₂',
      ],
    },
    {
      id: 2,
      title: 'Tips Mengurangi Emisi dari Transportasi',
      category: 'transportasi',
      excerpt: 'Transportasi adalah salah satu penyumbang terbesar emisi karbon. Berikut cara mengurangi jejak karbon dari perjalanan sehari-hari.',
      readTime: '4 menit',
      tips: [
        'Gunakan transportasi umum untuk menghemat 45% emisi',
        'Bersepeda untuk jarak dekat (< 5 km)',
        'Carpooling dapat mengurangi emisi hingga 75%',
        'Pilih kendaraan listrik jika memungkinkan',
      ],
    },
    {
      id: 3,
      title: 'Hemat Energi di Rumah, Selamatkan Bumi',
      category: 'energi',
      excerpt: 'Konsumsi energi rumah tangga berkontribusi signifikan terhadap emisi karbon. Pelajari cara menghemat energi dengan mudah.',
      readTime: '6 menit',
      tips: [
        'Ganti lampu dengan LED untuk hemat 80% energi',
        'Cabut charger yang tidak digunakan',
        'Gunakan AC pada suhu 25°C untuk efisiensi optimal',
        'Panel surya dapat mengurangi emisi hingga 90%',
      ],
    },
    {
      id: 4,
      title: 'Kelola Sampah untuk Mengurangi Emisi Metana',
      category: 'sampah',
      excerpt: 'Sampah organik yang membusuk menghasilkan gas metana yang berbahaya. Pengelolaan sampah yang baik dapat mengurangi emisi secara signifikan.',
      readTime: '5 menit',
      tips: [
        'Kompos sampah organik di rumah',
        'Pilah sampah sesuai jenisnya',
        'Kurangi penggunaan plastik sekali pakai',
        'Daur ulang kertas, plastik, dan kaleng',
      ],
    },
    {
      id: 5,
      title: 'Konservasi Air untuk Iklim yang Lebih Baik',
      category: 'air',
      excerpt: 'Penggunaan air yang bijak tidak hanya menghemat tagihan, tetapi juga mengurangi energi yang dibutuhkan untuk memproses air.',
      readTime: '4 menit',
      tips: [
        'Matikan keran saat menyikat gigi',
        'Perbaiki keran yang bocor segera',
        'Gunakan shower daripada berendam',
        'Kumpulkan air hujan untuk menyiram tanaman',
      ],
    },
  ]

  const quizQuestions = [
    {
      question: 'Berapa rata-rata emisi CO₂ yang dihasilkan mobil per tahun?',
      options: ['2.3 ton', '4.6 ton', '6.8 ton', '8.2 ton'],
      correct: 1,
    },
    {
      question: 'Sektor apa yang berkontribusi paling besar terhadap emisi global?',
      options: ['Transportasi (24%)', 'Energi (73%)', 'Pertanian (18%)', 'Industri (21%)'],
      correct: 1,
    },
    {
      question: 'Berapa persen energi yang dapat dihemat dengan lampu LED?',
      options: ['50%', '65%', '80%', '95%'],
      correct: 2,
    },
    {
      question: 'Suhu AC yang paling efisien untuk mengurangi emisi adalah?',
      options: ['22°C', '23°C', '25°C', '27°C'],
      correct: 2,
    },
    {
      question: 'Satu pohon dewasa dapat menyerap berapa kg CO₂ per tahun?',
      options: ['10-15 kg', '15-20 kg', '20-25 kg', '25-30 kg'],
      correct: 1,
    },
  ]

  const filteredArticles = selectedCategory === 'semua' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory)

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuiz] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz(currentQuiz + 1)
    } else {
      calculateScore()
    }
  }

  const calculateScore = () => {
    const correct = selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizQuestions[index].correct ? 1 : 0)
    }, 0)
    setQuizScore(Math.round((correct / quizQuestions.length) * 100))
  }

  const resetQuiz = () => {
    setCurrentQuiz(0)
    setSelectedAnswers([])
    setQuizScore(null)
  }

  return (
    <div className="min-h-screen bg-[#030a08] text-slate-200 pt-36 pb-12 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.06),transparent_50%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black font-display uppercase tracking-tight text-white mb-4">
            Edukasi Lingkungan
          </h1>
          <p className="text-slate-400 font-medium max-w-2xl mx-auto">
            Pelajari tips dan trik untuk hidup lebih ramah lingkungan dan mengurangi jejak karbon Anda
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                selectedCategory === category.id
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-950/40 text-slate-400 hover:bg-white/5 border border-white/5'
              }`}
            >
              <category.icon className="w-4 h-4 text-emerald-450" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight font-display">
              Artikel & Tips
            </h2>
            <div className="space-y-6">
              {filteredArticles.map((article) => (
                <div key={article.id} className="bg-slate-900/40 border border-white/5 backdrop-blur-md rounded-xl p-6 hover:border-white/10 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white flex-1 leading-tight">
                      {article.title}
                    </h3>
                    <span className="text-sm text-slate-400 font-medium ml-4">
                      {article.readTime}
                    </span>
                  </div>
                  
                  <p className="text-slate-350 leading-relaxed mb-4 text-sm">
                    {article.excerpt}
                  </p>

                  <div className="space-y-2 mb-4">
                    <h4 className="font-semibold text-slate-300 flex items-center text-sm">
                      <Lightbulb className="w-4 h-4 mr-2 text-yellow-405 animate-pulse" />
                      Tips Praktis:
                    </h4>
                    <ul className="space-y-1">
                      {article.tips.map((tip, index) => (
                        <li key={index} className="text-sm text-slate-400 flex items-start">
                          <ChevronRight className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="text-emerald-400 font-bold hover:text-emerald-350 transition-colors cursor-pointer text-sm">
                    Baca Selengkapnya →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz Section */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/40 border border-white/5 backdrop-blur-md rounded-xl p-6 sticky top-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center uppercase tracking-tight font-display">
                <Award className="w-5 h-5 mr-2 text-yellow-500" />
                Kuis Lingkungan
              </h2>

              {quizScore === null ? (
                <>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-slate-400">
                        Pertanyaan {currentQuiz + 1} dari {quizQuestions.length}
                      </span>
                      <span className="text-xs text-emerald-450 font-bold">
                        {Math.round(((currentQuiz) / quizQuestions.length) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div
                        className="bg-emerald-600 h-2 rounded-full transition-all"
                        style={{ width: `${((currentQuiz) / quizQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-white mb-4 text-sm leading-relaxed">
                      {quizQuestions[currentQuiz].question}
                    </h3>
                    <div className="space-y-2">
                      {quizQuestions[currentQuiz].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuizAnswer(index)}
                          className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer text-sm ${
                            selectedAnswers[currentQuiz] === index
                              ? 'border-emerald-500 bg-emerald-950/40 text-emerald-450 font-semibold'
                              : 'border-white/5 bg-slate-950/40 text-slate-350 hover:border-white/10'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={nextQuestion}
                    disabled={selectedAnswers[currentQuiz] === undefined}
                    className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {currentQuiz === quizQuestions.length - 1 ? 'Selesai' : 'Lanjut'}
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-950/40 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-green-400 animate-bounce" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Skor Anda: {quizScore}%
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    {quizScore >= 80 
                      ? 'Luar biasa! Anda sangat peduli lingkungan!' 
                      : quizScore >= 60 
                      ? 'Bagus! Terus belajar tentang lingkungan.' 
                      : 'Jangan menyerah! Baca artikel di sebelah untuk belajar lebih banyak.'}
                  </p>
                  <button
                    onClick={resetQuiz}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}
            </div>

            {/* Quick Facts */}
            <div className="bg-gradient-to-br from-green-950/15 to-emerald-950/15 border border-green-500/10 rounded-xl p-6 mt-6">
              <h3 className="font-bold text-white mb-4 text-sm flex items-center gap-1.5"><Lightbulb className="h-4 w-4 text-yellow-500" /> Fakta Menarik</h3>
              <div className="space-y-3">
                <div className="text-xs text-slate-300 leading-relaxed">
                  <strong>🌍</strong> Suhu bumi telah naik 1.1°C sejak era pra-industri
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  <strong>🌳</strong> 1 pohon dapat menyerap 22kg CO₂ per tahun
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  <strong>♻️</strong> Daur ulang 1 ton kertas menghemat 17 pohon
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  <strong>💡</strong> LED menghemat 80% energi dibanding lampu pijar
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Edukasi Lingkungan
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pelajari tips dan trik untuk hidup lebih ramah lingkungan dan mengurangi jejak karbon Anda
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-[#3AA17E] text-white'
                  : 'bg-white text-gray-700 hover:bg-green-50'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Artikel & Tips
            </h2>
            <div className="space-y-6">
              {filteredArticles.map((article) => (
                <div key={article.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 flex-1">
                      {article.title}
                    </h3>
                    <span className="text-sm text-gray-500 ml-4">
                      {article.readTime}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    {article.excerpt}
                  </p>

                  <div className="space-y-2 mb-4">
                    <h4 className="font-medium text-gray-900 flex items-center">
                      <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
                      Tips Praktis:
                    </h4>
                    <ul className="space-y-1">
                      {article.tips.map((tip, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="text-[#3AA17E] font-medium hover:text-green-600 transition-colors">
                    Baca Selengkapnya →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-500" />
                Kuis Lingkungan
              </h2>

              {quizScore === null ? (
                <>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">
                        Pertanyaan {currentQuiz + 1} dari {quizQuestions.length}
                      </span>
                      <span className="text-sm text-[#3AA17E] font-medium">
                        {Math.round(((currentQuiz) / quizQuestions.length) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#3AA17E] h-2 rounded-full transition-all"
                        style={{ width: `${((currentQuiz) / quizQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-4">
                      {quizQuestions[currentQuiz].question}
                    </h3>
                    <div className="space-y-2">
                      {quizQuestions[currentQuiz].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuizAnswer(index)}
                          className={`w-full text-left p-3 rounded-lg border transition-colors ${
                            selectedAnswers[currentQuiz] === index
                              ? 'border-[#3AA17E] bg-green-50 text-[#3AA17E]'
                              : 'border-gray-200 hover:border-gray-300'
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
                    className="w-full bg-[#3AA17E] text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {currentQuiz === quizQuestions.length - 1 ? 'Selesai' : 'Lanjut'}
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Skor Anda: {quizScore}%
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {quizScore >= 80 
                      ? 'Luar biasa! Anda sangat peduli lingkungan!' 
                      : quizScore >= 60 
                      ? 'Bagus! Terus belajar tentang lingkungan.' 
                      : 'Jangan menyerah! Baca artikel di sebelah untuk belajar lebih banyak.'}
                  </p>
                  <button
                    onClick={resetQuiz}
                    className="bg-[#3AA17E] text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}
            </div>

            {/* Quick Facts */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 mt-6">
              <h3 className="font-bold text-gray-900 mb-4">💡 Fakta Menarik</h3>
              <div className="space-y-3">
                <div className="text-sm text-gray-700">
                  <strong>🌍</strong> Suhu bumi telah naik 1.1°C sejak era pra-industri
                </div>
                <div className="text-sm text-gray-700">
                  <strong>🌳</strong> 1 pohon dapat menyerap 22kg CO₂ per tahun
                </div>
                <div className="text-sm text-gray-700">
                  <strong>♻️</strong> Daur ulang 1 ton kertas menghemat 17 pohon
                </div>
                <div className="text-sm text-gray-700">
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

import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import ChapterList from './components/ChapterList'
import Reader from './components/Reader'
import { novelMeta, chapters } from './data/novel'

/**
 * Home 组件 - 首页
 * 展示小说封面、简介、开始阅读按钮
 */
const Home = ({ onStartReading }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* 英雄区域 */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* 封面图标 */}
          <div className="mb-8 inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 bg-stone-900 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <span className="text-5xl sm:text-6xl">{novelMeta.coverEmoji}</span>
          </div>

          {/* 书名 */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight mb-4">
            {novelMeta.title}
          </h1>

          {/* 原名 */}
          <p className="text-lg text-stone-500 mb-6">
            原名《{novelMeta.originalTitle}》
          </p>

          {/* 标签 */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {novelMeta.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-stone-100 text-stone-600 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 简介 */}
          <div className="max-w-2xl mx-auto mb-10">
            <p className="text-lg sm:text-xl text-stone-700 leading-relaxed">
              {novelMeta.description}
            </p>
          </div>

          {/* 统计信息 */}
          <div className="flex items-center justify-center gap-8 text-sm text-stone-500 mb-10">
            <div className="text-center">
              <div className="text-2xl font-bold text-stone-900">{novelMeta.totalChapters}</div>
              <div>章节</div>
            </div>
            <div className="w-px h-10 bg-stone-200" />
            <div className="text-center">
              <div className="text-2xl font-bold text-stone-900">{novelMeta.wordCount}</div>
              <div>字数</div>
            </div>
            <div className="w-px h-10 bg-stone-200" />
            <div className="text-center">
              <div className="text-2xl font-bold text-stone-900">{novelMeta.status}</div>
              <div>状态</div>
            </div>
          </div>

          {/* 开始阅读按钮 */}
          <button
            onClick={() => onStartReading(1)}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-stone-900 text-white rounded-2xl font-medium text-lg shadow-lg hover:bg-stone-800 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>开始阅读</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </section>

      {/* 装饰性分隔线 */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent" />
      </div>

      {/* 特色介绍 */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-stone-900 text-center mb-12">
            故事特色
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-14 h-14 mx-auto mb-4 bg-amber-100 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">📖</span>
              </div>
              <h3 className="font-semibold text-stone-900 mb-2">真实写照</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                以普通修车师傅的视角，展现中国城市变迁中的小人物的生活百态
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 mx-auto mb-4 bg-blue-100 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="font-semibold text-stone-900 mb-2">家庭温情</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                父女情、夫妻情、邻里情，平凡生活中的温暖与坚守
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 mx-auto mb-4 bg-green-100 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="font-semibold text-stone-900 mb-2">人生哲思</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                在名利场中挣扎，寻找内心真正的平静与自由
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 底部 */}
      <footer className="py-12 text-center text-sm text-stone-500">
        <p>© 2024 小说阅读 · 仅供学习交流使用</p>
      </footer>
    </div>
  )
}

/**
 * App 主组件
 * 管理页面状态和路由
 */
function App() {
  // 页面状态：'home' | 'chapters' | 'read'
  const [currentPage, setCurrentPage] = useState('home')
  
  // 当前阅读章节
  const [currentChapter, setCurrentChapter] = useState(() => {
    const saved = localStorage.getItem('reader-current-chapter')
    return saved ? parseInt(saved, 10) : null
  })

  // 保存阅读进度
  useEffect(() => {
    if (currentChapter) {
      localStorage.setItem('reader-current-chapter', currentChapter.toString())
    }
  }, [currentChapter])

  // 导航处理
  const handleNavigate = (page, chapterId = null) => {
    if (chapterId) {
      setCurrentChapter(chapterId)
    }
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  // 开始阅读
  const handleStartReading = (chapterId) => {
    handleNavigate('read', chapterId)
  }

  // 选择章节
  const handleChapterSelect = (chapterId) => {
    handleNavigate('read', chapterId)
  }

  // 返回处理
  const handleBack = () => {
    if (currentPage === 'read') {
      setCurrentPage('chapters')
    } else if (currentPage === 'chapters') {
      setCurrentPage('home')
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* 顶部导航 */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        showBack={currentPage !== 'home'}
        onBack={handleBack}
      />

      {/* 主内容区域 */}
      <main className="pt-16">
        {currentPage === 'home' && (
          <Home onStartReading={handleStartReading}
        />)}

        {currentPage === 'chapters' && (
          <ChapterList
            currentChapter={currentChapter}
            onChapterSelect={handleChapterSelect}
          />
        )}

        {currentPage === 'read' && currentChapter && (
          <Reader
            chapterId={currentChapter}
            onNavigate={handleNavigate}
          />
        )}
      </main>
    </div>
  )
}

export default App

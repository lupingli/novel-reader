import React, { useState, useEffect, useCallback } from 'react'
import { getChapterContent, getPrevChapter, getNextChapter, chapters } from '../data/novel'
import Settings from './Settings'
import ProgressBar from './ProgressBar'

/**
 * Reader 组件 - 阅读页面
 * 支持字体调节、背景切换、进度保存
 */
const Reader = ({ chapterId, onNavigate }) => {
  // 阅读设置
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('reader-font-size')
    return saved || 'base'
  })
  
  const [bgMode, setBgMode] = useState(() => {
    const saved = localStorage.getItem('reader-bg-mode')
    return saved || 'cream'
  })

  const [showSettings, setShowSettings] = useState(false)

  // 保存设置到 localStorage
  useEffect(() => {
    localStorage.setItem('reader-font-size', fontSize)
  }, [fontSize])

  useEffect(() => {
    localStorage.setItem('reader-bg-mode', bgMode)
  }, [bgMode])

  // 获取章节内容
  const content = getChapterContent(chapterId)
  const chapter = chapters.find(c => c.id === chapterId)
  
  // 导航
  const prevChapter = getPrevChapter(chapterId)
  const nextChapter = getNextChapter(chapterId)

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e) => {
      // 设置面板打开时不响应
      if (showSettings) return
      
      if (e.key === 'ArrowLeft' && prevChapter) {
        onNavigate('read', prevChapter)
      } else if (e.key === 'ArrowRight' && nextChapter) {
        onNavigate('read', nextChapter)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prevChapter, nextChapter, showSettings, onNavigate])

  // 背景色映射
  const bgModeClasses = {
    white: 'bg-white-mode',
    cream: 'bg-cream-mode',
    gray: 'bg-gray-mode',
    black: 'bg-black-mode'
  }

  // 字体大小映射
  const fontSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  }

  return (
    <div className={`min-h-screen ${bgModeClasses[bgMode]} transition-colors duration-300`}>
      {/* 进度条 */}
      <ProgressBar chapterId={chapterId} totalChapters={chapters.length} />

      {/* 内容区域 */}
      <article className="max-w-prose mx-auto px-6 sm:px-8 py-24 sm:py-32">
        {/* 章节标题 */}
        <header className="mb-12 text-center">
          <span className="text-sm text-stone-500 uppercase tracking-wider">
            第 {chapterId} 章
          </span>
          <h1 className="mt-2 text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
            {chapter?.title}
          </h1>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm text-stone-500">
            <span>{chapter?.volume}</span>
          </div>
        </header>

        {/* 章节内容 */}
        <div className={`prose-custom ${fontSizeClasses[fontSize]} leading-relaxed`}>
          {content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-stone-800 dark:text-stone-200">
              {paragraph}
            </p>
          ))}
        </div>

        {/* 章节导航 */}
        <nav className="mt-16 pt-8 border-t border-stone-200 dark:border-stone-700">
          <div className="flex items-center justify-between gap-4">
            {/* 上一章 */}
            {prevChapter ? (
              <button
                onClick={() => onNavigate('read', prevChapter)}
                className="flex-1 flex items-center gap-3 px-4 py-4 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-600 transition-all duration-200 group"
              >
                <svg className="w-5 h-5 text-stone-400 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <div className="text-left">
                  <span className="block text-xs text-stone-500">上一章</span>
                  <span className="block text-sm font-medium text-stone-900 dark:text-stone-100">
                    第{prevChapter}章
                  </span>
                </div>
              </button>
            ) : (
              <div className="flex-1" />
            )}

            {/* 目录按钮 */}
            <button
              onClick={() => onNavigate('chapters')}
              className="px-6 py-4 bg-stone-900 dark:bg-stone-700 text-white rounded-xl hover:bg-stone-800 dark:hover:bg-stone-600 transition-colors duration-200 font-medium"
            >
              目录
            </button>

            {/* 下一章 */}
            {nextChapter ? (
              <button
                onClick={() => onNavigate('read', nextChapter)}
                className="flex-1 flex items-center gap-3 px-4 py-4 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-600 transition-all duration-200 group"
              >
                <div className="text-right">
                  <span className="block text-xs text-stone-500">下一章</span>
                  <span className="block text-sm font-medium text-stone-900 dark:text-stone-100">
                    第{nextChapter}章
                  </span>
                </div>
                <svg className="w-5 h-5 text-stone-400 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </nav>

        {/* 尾声提示 */}
        {chapterId === chapters.length && (
          <div className="mt-16 p-8 bg-stone-50 dark:bg-stone-800/50 rounded-2xl text-center">
            <p className="text-lg font-serif text-stone-700 dark:text-stone-300 mb-4">
              全书完
            </p>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              感谢阅读 · 愿你找到内心的平静
            </p>
          </div>
        )}
      </article>

      {/* 设置按钮 */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="fixed bottom-6 right-6 p-4 bg-stone-900 dark:bg-stone-700 text-white rounded-full shadow-lg hover:bg-stone-800 dark:hover:bg-stone-600 transition-all duration-200 z-40"
        aria-label="阅读设置"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {/* 设置面板 */}
      {showSettings && (
        <Settings
          fontSize={fontSize}
          onFontSizeChange={setFontSize}
          bgMode={bgMode}
          onBgModeChange={setBgMode}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  )
}

export default Reader

import React, { useState, useEffect } from 'react'

/**
 * ProgressBar 组件 - 阅读进度条
 * 显示当前章节进度，支持点击跳转
 */
const ProgressBar = ({ chapterId, totalChapters }) => {
  const [scrollProgress, setScrollProgress] = useState(0)

  // 监听滚动进度
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // 初始化

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const chapterProgress = (chapterId / totalChapters) * 100

  return (
    <>
      {/* 顶部章节进度条 */}
      <div className="fixed top-16 left-0 right-0 h-0.5 bg-stone-200 dark:bg-stone-700 z-40">
        <div
          className="h-full bg-stone-900 dark:bg-stone-500 transition-all duration-300"
          style={{ width: `${chapterProgress}%` }}
        />
      </div>

      {/* 底部滚动进度指示器 */}
      {scrollProgress > 0 && scrollProgress < 100 && (
        <div className="fixed bottom-0 left-0 right-0 h-0.5 bg-transparent z-40">
          <div
            className="h-full bg-amber-500/60 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}

      {/* 进度提示（滚动时显示） */}
      {scrollProgress > 5 && scrollProgress < 95 && (
        <div className="fixed bottom-8 right-8 px-3 py-1.5 bg-stone-900/80 dark:bg-stone-700/80 backdrop-blur-sm text-white text-xs rounded-full z-40 animate-fade-in">
          {Math.round(scrollProgress)}%
        </div>
      )}
    </>
  )
}

export default ProgressBar

import React from 'react'
import { novelMeta } from '../data/novel'

/**
 * Header 组件 - 顶部导航栏
 * 极简设计，优雅过渡
 */
const Header = ({ currentPage, onNavigate, showBack = false, onBack }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* 返回按钮 */}
          <div className="flex items-center gap-3">
            {showBack && (
              <button
                onClick={onBack}
                className="p-2 -ml-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-all duration-200"
                aria-label="返回"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            
            {/* Logo / 书名 */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                {novelMeta.coverEmoji}
              </span>
              <span className="font-serif text-lg font-medium text-stone-800 hidden sm:block">
                {novelMeta.title}
              </span>
            </button>
          </div>

          {/* 导航链接 */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === 'home'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              首页
            </button>
            <button
              onClick={() => onNavigate('chapters')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === 'chapters'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              目录
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

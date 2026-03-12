import React from 'react'

/**
 * Settings 组件 - 阅读设置面板
 * 字体大小、背景色切换
 */
const Settings = ({ fontSize, onFontSizeChange, bgMode, onBgModeChange, onClose }) => {
  const fontSizeOptions = [
    { value: 'sm', label: '小', className: 'text-sm' },
    { value: 'base', label: '中', className: 'text-base' },
    { value: 'lg', label: '大', className: 'text-lg' },
    { value: 'xl', label: '超大', className: 'text-xl' }
  ]

  const bgModeOptions = [
    { value: 'white', label: '白色', className: 'bg-white border-stone-300' },
    { value: 'cream', label: '米色', className: 'bg-[#f5f1e8] border-stone-300' },
    { value: 'gray', label: '深灰', className: 'bg-[#2d2d2d] border-stone-600' },
    { value: 'black', label: '黑色', className: 'bg-[#0a0a0a] border-stone-700' }
  ]

  return (
    <>
      {/* 遮罩层 */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* 设置面板 */}
      <div className="fixed bottom-24 right-6 w-80 bg-white dark:bg-stone-800 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-700 z-50 overflow-hidden animate-slide-up">
        {/* 标题栏 */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-stone-700">
          <h3 className="font-serif font-semibold text-stone-900 dark:text-stone-100">
            阅读设置
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
            aria-label="关闭设置"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 设置内容 */}
        <div className="p-5 space-y-6">
          {/* 字体大小 */}
          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-3">
              字体大小
            </label>
            <div className="grid grid-cols-4 gap-2">
              {fontSizeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onFontSizeChange(option.value)}
                  className={`
                    py-2.5 px-3 rounded-xl border-2 transition-all duration-200
                    ${fontSize === option.value
                      ? 'border-stone-900 dark:border-stone-500 bg-stone-900 dark:bg-stone-500 text-white dark:text-stone-900'
                      : 'border-stone-200 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:border-stone-400 dark:hover:border-stone-500'
                    }
                    ${option.className}
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* 背景色 */}
          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-3">
              背景颜色
            </label>
            <div className="grid grid-cols-4 gap-3">
              {bgModeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onBgModeChange(option.value)}
                  className={`
                    relative aspect-square rounded-xl border-2 transition-all duration-200
                    ${option.className}
                    ${bgMode === option.value
                      ? 'ring-2 ring-stone-900 dark:ring-stone-400 ring-offset-2 dark:ring-offset-stone-800'
                      : 'hover:ring-2 hover:ring-stone-400 hover:ring-offset-2 dark:hover:ring-offset-stone-800'
                    }
                  `}
                  aria-label={option.label}
                >
                  {bgMode === option.value && (
                    <svg
                      className={`absolute inset-0 m-auto w-6 h-6 ${
                        option.value === 'white' || option.value === 'cream'
                          ? 'text-stone-900'
                          : 'text-white'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 底部提示 */}
        <div className="px-5 py-3 bg-stone-50 dark:bg-stone-800/50 border-t border-stone-200 dark:border-stone-700">
          <p className="text-xs text-stone-500 dark:text-stone-400 text-center">
            设置将自动保存
          </p>
        </div>
      </div>
    </>
  )
}

export default Settings

import React, { useState } from 'react'
import { chapters, volumes } from '../data/novel'

/**
 * ChapterList 组件 - 章节目录
 * 按卷分组，支持快速跳转
 */
const ChapterList = ({ currentChapter, onChapterSelect }) => {
  const [expandedVolumes, setExpandedVolumes] = useState([1, 2, 3])

  const toggleVolume = (volumeId) => {
    setExpandedVolumes(prev =>
      prev.includes(volumeId)
        ? prev.filter(id => id !== volumeId)
        : [...prev, volumeId]
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* 标题 */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-2">
          章节目录
        </h2>
        <p className="text-stone-500 text-sm">
          共 {chapters.length} 章 · 已完结
        </p>
      </div>

      {/* 进度概览 */}
      {currentChapter && (
        <div className="mb-8 p-4 bg-stone-50 rounded-xl border border-stone-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-stone-600">阅读进度</span>
            <span className="text-sm font-medium text-stone-900">
              第 {currentChapter} 章 / 共 {chapters.length} 章
            </span>
          </div>
          <div className="mt-2 h-2 bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-stone-900 transition-all duration-500"
              style={{ width: `${(currentChapter / chapters.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* 章节列表 */}
      <div className="space-y-4">
        {volumes.map((volume) => (
          <div
            key={volume.id}
            className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* 卷标题 */}
            <button
              onClick={() => toggleVolume(volume.id)}
              className="w-full flex items-center justify-between p-4 bg-stone-50 hover:bg-stone-100 transition-colors duration-200"
            >
              <h3 className="font-serif font-semibold text-stone-800">
                {volume.title}
              </h3>
              <svg
                className={`w-5 h-5 text-stone-500 transition-transform duration-200 ${
                  expandedVolumes.includes(volume.id) ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* 章节网格 */}
            {expandedVolumes.includes(volume.id) && (
              <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {volume.chapters.map((chapterId) => {
                  const chapter = chapters.find(c => c.id === chapterId)
                  const isCurrent = currentChapter === chapterId

                  return (
                    <button
                      key={chapterId}
                      onClick={() => onChapterSelect(chapterId)}
                      className={`
                        relative px-3 py-2.5 text-sm rounded-lg transition-all duration-200
                        ${isCurrent
                          ? 'bg-stone-900 text-white font-medium shadow-md'
                          : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                        }
                      `}
                    >
                      <span className="truncate">
                        第{chapterId}章
                      </span>
                      {isCurrent && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full" />
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 底部信息 */}
      <div className="mt-8 text-center text-sm text-stone-500">
        <p>点击章节开始阅读</p>
      </div>
    </div>
  )
}

export default ChapterList

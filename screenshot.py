#!/usr/bin/env python3
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    
    # 设置视口大小
    page.set_viewport_size({'width': 1920, 'height': 1080})
    
    # 访问首页
    page.goto('http://localhost:4173', wait_until='networkidle')
    page.screenshot(path='/root/.openclaw/workspace/novel-reader/screenshot-home.png', full_page=True)
    print("✅ 首页截图完成：screenshot-home.png")
    
    # 等待一下，确保页面完全加载
    page.wait_for_timeout(2000)
    
    # 点击开始阅读按钮
    try:
        page.click('text=开始阅读')
        page.wait_for_timeout(3000)
        page.screenshot(path='/root/.openclaw/workspace/novel-reader/screenshot-reader.png', full_page=True)
        print("✅ 阅读页截图完成：screenshot-reader.png")
    except Exception as e:
        print(f"⚠️ 阅读页截图失败：{e}")
        # 如果点击失败，直接截当前页面
        page.screenshot(path='/root/.openclaw/workspace/novel-reader/screenshot-reader.png', full_page=True)
        print("✅ 已截取当前页面")
    
    browser.close()
    print("\n🎉 所有截图完成！")

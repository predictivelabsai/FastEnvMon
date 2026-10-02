import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
from playwright.sync_api import sync_playwright

with sync_playwright() as pw:
    browser = pw.chromium.launch()
    p = browser.new_context(viewport={"width": 1440, "height": 900}).new_page()
    p.goto("http://localhost:8000/index.html")
    p.wait_for_load_state()
    p.wait_for_timeout(700)
    p.screenshot(path="logs/nav-header2-1440.png", clip={"x": 0, "y": 0, "width": 1440, "height": 130})
    # open the Monitoringas dropdown (2nd details)
    p.locator(".main-nav details summary").nth(1).click()
    p.wait_for_timeout(400)
    p.screenshot(path="logs/nav-dropdown2-1440.png", clip={"x": 400, "y": 0, "width": 1040, "height": 620})
    browser.close()
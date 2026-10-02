import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
from playwright.sync_api import sync_playwright

BASE = "http://localhost:8000"
PAGES = ["index.html", "pages/oro.html", "pages/zemelapis.html"]

with sync_playwright() as pw:
    browser = pw.chromium.launch()
    for w, h, name in [(1440, 900, "1440"), (1280, 800, "1280"), (390, 844, "390")]:
        ctx = browser.new_context(viewport={"width": w, "height": h})
        page = ctx.new_page()
        errors = []
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
        page.on("pageerror", lambda e: errors.append(str(e)))
        for route in PAGES:
            page.goto(BASE + "/" + route)
            page.wait_for_load_state()
            page.wait_for_timeout(700)
            top = page.evaluate("(() => { const lis = [...document.querySelectorAll('.main-nav > ul > li')].filter(li => !li.classList.contains('nav-group-label')); const tops = lis.map(li => li.getBoundingClientRect().top); const sw = document.documentElement.scrollWidth; return 'rows=' + new Set(tops.map(t => Math.round(t))).size + ' sw=' + sw; })()")
            print("%s %-24s %s" % (name, route, top))
        print("%s errors: %d %s" % (name, len(errors), errors[:3]))
        if name == "1440":
            p = browser.new_context(viewport={"width": 1440, "height": 900}).new_page()
            p.goto(BASE + "/index.html")
            p.wait_for_load_state()
            p.wait_for_timeout(700)
            p.screenshot(path="logs/nav-header-1440.png", clip={"x": 0, "y": 0, "width": 1440, "height": 130})
            p.click(".main-nav summary")
            p.wait_for_timeout(400)
            p.screenshot(path="logs/nav-dropdown-1440.png", clip={"x": 400, "y": 0, "width": 1040, "height": 520})
            # Escape closes
            p.keyboard.press("Escape")
            p.wait_for_timeout(300)
            open_count = p.evaluate("document.querySelectorAll('.main-nav details[open]').length")
            clicked_outside = p.evaluate("document.querySelectorAll('.main-nav details[open]').length")
            print("dropdown open after Escape:", open_count)
    browser.close()
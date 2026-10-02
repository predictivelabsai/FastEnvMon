import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
from playwright.sync_api import sync_playwright

BASE = "http://localhost:8000"
errors = []

def login(page):
    page.goto(BASE + "/pages/admin/login.html")
    page.wait_for_load_state(); page.wait_for_timeout(600)
    code = page.locator("#totp-code").inner_text().strip()
    page.fill("#login-username", "administratorius")
    page.fill("#login-password", "admin")
    page.press("#login-password", "Enter")
    page.wait_for_timeout(700)
    if page.locator("#login-stage-password").is_visible():
        page.fill("#new-password", "Klaipeda#2026-demo1")
        page.fill("#new-password-repeat", "Klaipeda#2026-demo1")
        page.press("#new-password-repeat", "Enter")
        page.wait_for_timeout(700)
    page.fill("#totp-input", code)
    page.press("#totp-input", "Enter")
    page.wait_for_timeout(900)

with sync_playwright() as pw:
    browser = pw.chromium.launch()

    # 1. Lab tab
    ctx = browser.new_context(viewport={"width": 1440, "height": 900}); pg = ctx.new_page()
    pg.on("console", lambda m: errors.append("console: " + m.text) if m.type == "error" else None)
    pg.on("pageerror", lambda e: errors.append("pageerror: " + str(e)))
    pg.goto(BASE + "/pages/oro.html#laboratoriniai")
    pg.wait_for_load_state(); pg.wait_for_timeout(1800)
    labs = pg.evaluate("({opts: [...document.querySelectorAll('#lab-sites option')].map(o=>o.value), selected: [...document.querySelectorAll('#lab-sites option')].filter(o=>o.selected).map(o=>o.value), charts: document.querySelectorAll('#panel-laboratory-air canvas') !== undefined ? [...document.querySelectorAll('#panel-laboratory-air canvas')].map(c=>!!c._kmsChart) : [], cards: document.querySelectorAll('.stat-card').length})")
    print("lab:", labs)
    # choose lab panel-specific select? lab-sites belongs to lab panel; count stat cards inside lab panel
    lab_cards = pg.evaluate("document.querySelectorAll('#panel-laboratory-air .stat-card').length")
    print("lab stat cards:", lab_cards)
    pg.screenshot(path="logs/fixc-lab.png")
    pg.close(); ctx.close()

    # 2/3. Mobile sweep public + admin
    ctx = browser.new_context(viewport={"width": 390, "height": 844}); pg = ctx.new_page()
    pg.on("console", lambda m: errors.append("console: " + m.text) if m.type == "error" else None)
    pg.on("pageerror", lambda e: errors.append("pageerror: " + str(e)))
    public = ["index.html"] + ["pages/" + p for p in ["oro","truksmas","dirvezemis","vanduo","gyvoji_gamta","zeldynai","zemelapis","ataskaitos","prenumerata","vadovas","bendra-info","privatumo-politika","slapuku-politika"]for p in []]
    for r in ["index.html","pages/oro.html","pages/truksmas.html","pages/dirvezemis.html","pages/vanduo.html","pages/gyvoji_gamta.html","pages/zeldynai.html","pages/zemelapis.html","pages/ataskaitos.html","pages/prenumerata.html","pages/vadovas.html","pages/bendra-info.html","pages/privatumo-politika.html","pages/slapuku-politika.html"]:
        pg.goto(BASE + "/" + r); pg.wait_for_load_state(); pg.wait_for_timeout(500)
        print("390", r, pg.evaluate("document.documentElement.scrollWidth"), "/", pg.evaluate("document.documentElement.clientWidth"))
    login(pg)
    for r in ["index","prenumeratos","pranesimai","sla","nevalidus","auditas","duomenys","nustatymai","patvirtinimas"]:
        pg.goto(BASE + "/pages/admin/%s.html" % r); pg.wait_for_load_state(); pg.wait_for_timeout(500)
        print("390 admin", r, pg.evaluate("document.documentElement.scrollWidth"), "/", pg.evaluate("document.documentElement.clientWidth"))
    # dropdown geometry at 390
    pg.goto(BASE + "/pages/oro.html"); pg.wait_for_load_state(); pg.wait_for_timeout(600)
    pg.click(".main-nav details summary"); pg.wait_for_timeout(400)
    geo = pg.evaluate("(() => { const h = document.querySelector('.site-header').getBoundingClientRect(); const s = document.querySelector('.main-nav details summary').getBoundingClientRect(); const m = document.querySelector('.main-nav details[open] .dropdown, .main-nav details[open] nav, .main-nav details[open] ul')?.getBoundingClientRect(); return {headerBottom: Math.round(h.bottom), triggerBottom: Math.round(s.bottom), menuTop: m ? Math.round(m.top) : null}; })()")
    print("dropdown geo 390:", geo)
    pg.close(); ctx.close()

    # 4. Desktop admin spot-check errors + lab chart re-render
    ctx = browser.new_context(viewport={"width": 1440, "height": 900}); pg = ctx.new_page()
    pg.on("console", lambda m: errors.append("console: " + m.text) if m.type == "error" else None)
    pg.on("pageerror", lambda e: errors.append("pageerror: " + str(e)))
    login(pg)
    for r in ["index","sla","auditas","duomenys"]:
        pg.goto(BASE + "/pages/admin/%s.html" % r); pg.wait_for_load_state(); pg.wait_for_timeout(500)
    pg.goto(BASE + "/pages/vanduo.html"); pg.wait_for_load_state(); pg.wait_for_timeout(1200)
    pg.select_option("#parameter", index=1); pg.wait_for_timeout(900)
    pg.click("#tab-laboratory-air"); pg.wait_for_timeout(400)
    pg.click("#tab-automatic-air"); pg.wait_for_timeout(900)
    print("desktop sweep done")
    pg.close(); ctx.close()
    browser.close()

print("console/page errors total:", len(errors))
for e in errors[:10]: print("   ", e)
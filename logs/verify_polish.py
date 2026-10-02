import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
from playwright.sync_api import sync_playwright

PAGES_KICKER = ["zemelapis", "oro", "ataskaitos", "dirvezemis", "gyvoji_gamta", "bendra-info", "truksmas", "zeldynai", "prenumerata", "vanduo", "vadovas"]
BASE = "http://localhost:8000/pages/"

def lum(c):
    def ch(v):
        v /= 255.0
        return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = c
    return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b)

def ratio(hex1, hex2):
    h = lambda x: tuple(int(x[i:i+2], 16) for i in (1, 3, 5))
    l1, l2 = lum(h(hex1)), lum(h(hex2))
    if l1 < l2: l1, l2 = l2, l1
    return (l1 + 0.05) / (l2 + 0.05)

with sync_playwright() as pw:
    browser = pw.chromium.launch()
    page = browser.new_context(viewport={"width": 1440, "height": 900}).new_page()
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))

    page.goto("http://localhost:8000/index.html")
    page.wait_for_load_state()
    tokens = page.evaluate("""(() => { const st = getComputedStyle(document.documentElement); const out = {}; for (const name of ['--ink-500','--sea-950','--shore-100']) out[name] = st.getPropertyValue(name).trim(); return out; })()""")
    print("tokens:", tokens)
    ink = tokens.get("--ink-500", "#718897")
    print("ink-500 on white: %.2f:1" % ratio(ink, "#ffffff"))
    print("ink-500 on shore-ish #eef4f3: %.2f:1" % ratio(ink, "#eef4f3"))
    # AQI hero
    hero = page.evaluate("""(() => { const card = [...document.querySelectorAll('strong, .stat-value, [class*=index], [class*=aqi]')].map(n => n.textContent.trim()).join(' | '); return card.slice(0, 200); })()""")
    print("home hero texts: %s" % hero)
    # kicker scan
    for name in PAGES_KICKER:
        page.goto(BASE + name + ".html")
        page.wait_for_load_state()
        kickers = page.eval_on_selector_all(".section-kicker, .eyebrow", "els => els.map(e => e.textContent.trim())")
        bad = [k for k in kickers if any(seg.strip() and seg.strip()[0].isdigit() for seg in k.split("·"))]
        print("%-14s kickers-with-clauses: %s | all=%s" % ((name, bad, kickers[:2])))
    # KD labels in source
    sys.path.insert(0, r"C:\Users\Joosep\tenders\klaipeda-environment\logs")
    print("errors: %d" % len(errors))
    browser.close()
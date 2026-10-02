import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
from playwright.sync_api import sync_playwright

BASE = "http://localhost:8000"
PAGES = ["index.html", "pages/zemelapis.html", "pages/oro.html", "pages/gyvoji_gamta.html", "pages/ataskaitos.html", "pages/truksmas.html", "pages/dirvezemis.html", "pages/vanduo.html", "pages/zeldynai.html"]

with sync_playwright() as pw:
    browser = pw.chromium.launch()
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    errors = []
    missing = []
    page.on("console", lambda m: errors.append("%s console-%s: %s" % (page.url.split("/")[-1], m.type, m.text)) if m.type == "error" else None)
    page.on("pageerror", lambda e: errors.append("%s pageerror: %s" % (page.url.split("/")[-1], e)))
    for route in PAGES:
        page.goto(BASE + "/" + route)
        page.wait_for_load_state()
        page.wait_for_timeout(900)
        sync_ok = page.evaluate("[...document.querySelectorAll('script[src*=cdn]')].every(s => s.hasAttribute('defer') || s.hasAttribute('async'))")
        chart = page.evaluate("typeof window.Chart !== 'undefined' || !document.querySelector('canvas[data-chart], canvas[id*=chart], canvas[id*=greenery], canvas#wildlife-chart, canvas[id*=noise]')")
        leaflet = page.evaluate("typeof window.L !== 'undefined' || !document.getElementById('map')")
        canv = page.evaluate("document.querySelectorAll('canvas[data-chart], canvas[id*=chart], canvas[id*=noise], #greenery-chart, #wildlife-chart').length")
        print("%-26s cdn-defer=%s chart-loaded=%s leaflet-loaded=%s canvases=%d" % (route, sync_ok, chart, leaflet, canv))
    # map marker diffing sanity: change filters on zemelapis and rebuild count via console?
    page.goto(BASE + "/pages/zemelapis.html")
    page.wait_for_load_state()
    page.wait_for_timeout(1500)
    m0 = page.evaluate("document.querySelectorAll('.leaflet-marker-icon').length")
    page.select_option("#filter-section", index=1) if page.locator("#filter-section").count() else None
    page.wait_for_timeout(600)
    m1 = page.evaluate("document.querySelectorAll('.leaflet-marker-icon').length")
    print("zemelapis markers: %d -> %d after filter change" % (m0, m1))
    print("errors: %d" % len(errors))
    for e in errors[:12]: print("  " + e)
    browser.close()
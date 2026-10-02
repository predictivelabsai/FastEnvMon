import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
from playwright.sync_api import sync_playwright

BASE = "http://localhost:8000"
ROUTES = ["index.html","pages/oro.html","pages/truksmas.html","pages/dirvezemis.html","pages/vanduo.html",
          "pages/gyvoji_gamta.html","pages/zeldynai.html","pages/zemelapis.html","pages/ataskaitos.html",
          "pages/prenumerata.html","pages/vadovas.html","pages/bendra-info.html"]

with sync_playwright() as pw:
    browser = pw.chromium.launch()
    errors = []
    for width, height in [(1440, 900), (390, 844)]:
        ctx = browser.new_context(viewport={"width": width, "height": height})
        pg = ctx.new_page()
        pg.on("console", lambda m: errors.append(f"{width} {m.location.get('url','?')}: {m.text}") if m.type == "error" else None)
        pg.on("pageerror", lambda e: errors.append(f"{width} PAGEERR: {e}"))
        for r in ROUTES:
            pg.goto(f"{BASE}/{r}")
            pg.wait_for_load_state(); pg.wait_for_timeout(700)
            sw = pg.evaluate("document.documentElement.scrollWidth")
            line = f"{width} {r} sw={sw}"
            if width == 1440 and "index" in r:
                bottoms = pg.evaluate('[...document.querySelectorAll(".grid-home > .panel")].map(p => Math.round(p.getBoundingClientRect().bottom))')
                delta = max(bottoms) - min(bottoms)
                line += f" grid-home bottoms={bottoms} delta={delta}"
            if width == 1440 and "ataskaitos" in r:
                info = pg.evaluate('(() => { const c = document.querySelector("#report-chart"); const ch = c._kmsChart; return {yTitle: ch.options.scales.y.title?.display === true ? (ch.options.scales.y.title.text||"DISPLAYED-UNNAMED") : null, xTickMax: ch.options.scales.x?.ticks?.maxRotation}; })()')
                line += f" report={info}"
            if width == 1440 and "gyvoji_gamta" in r:
                pg.evaluate("[...document.querySelectorAll('#wildlife-tabs button')].find(b=>b.dataset.wildlifeTab)?.click()")
                pg.wait_for_timeout(600)
                info = pg.evaluate('(() => { const c = document.querySelector("#wildlife-chart"); const ch = c._kmsChart; return {font: ch.options.font?.family, tick: ch.options?.scales?.y?.ticks?.color}; })()')
                line += f" wildlife={info}"
            print(line)
        pg.close(); ctx.close()
    print("console/page errors total:", len(errors))
    for e in errors[:8]: print("  ", e)
    browser.close()
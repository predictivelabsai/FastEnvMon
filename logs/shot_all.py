import io, sys, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
from playwright.sync_api import sync_playwright

BASE = "http://localhost:8000"
ROUTES = ["index.html", "pages/oro.html", "pages/ataskaitos.html", "pages/vanduo.html",
          "pages/gyvoji_gamta.html", "pages/zeldynai.html", "pages/dirvezemis.html",
          "pages/truksmas.html", "pages/zemelapis.html", "pages/prenumerata.html",
          "pages/vadovas.html", "pages/bendra-info.html"]
OUT = "logs/shots"
os.makedirs(OUT, exist_ok=True)

with sync_playwright() as pw:
    browser = pw.chromium.launch()
    errs = []
    for w, h, tag in [(1440, 900, "d"), (390, 844, "m")]:
        ctx = browser.new_context(viewport={"width": w, "height": h})
        page = ctx.new_page()
        page.on("pageerror", lambda e: errs.append(str(e)))
        for route in ROUTES:
            page.goto(BASE + "/" + route)
            page.wait_for_load_state()
            page.wait_for_timeout(1200)
            page.screenshot(path=os.path.join(OUT, "%s-%s.png" % (route.replace("pages/", "").replace(".html", ""), tag)), full_page=True)
            print("shot", tag, route)
        ctx.close()
    browser.close()
print("pageerrors total:", len(errs))
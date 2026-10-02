import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
from playwright.sync_api import sync_playwright

BASE = "http://localhost:8000"
PAGES = ["index.html", "pages/oro.html", "pages/gyvoji_gamta.html", "pages/truksmas.html", "pages/ataskaitos.html"]
MODE = sys.argv[1] if len(sys.argv) > 1 else "baseline"

with sync_playwright() as pw:
    browser = pw.chromium.launch()
    ctx = browser.new_context(viewport={"width": 390, "height": 844})
    page = ctx.new_page()
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    print("== %s ==" % MODE)
    for route in PAGES:
        page.goto(BASE + "/" + route)
        page.wait_for_load_state()
        page.wait_for_timeout(700)
        sw = page.evaluate("document.documentElement.scrollWidth")
        cw = page.evaluate("document.documentElement.clientWidth")
        # worst offender element
        worst = page.evaluate("""(() => { let w=null,m=0; for (const el of document.querySelectorAll('body *')) { if (el.scrollWidth > m && el.clientWidth && getComputedStyle(el).position !== 'fixed') { m=el.scrollWidth; w=el.className||el.tagName; } } return (typeof w==='string'? w.slice(0,50) : w) + ' sw=' + m; })()""")
        print("%-26s scrollWidth=%s clientWidth=%s %s | worst: %s" % (route, sw, cw, "OK" if sw <= cw + 6 else "OVERFLOW", worst))
    # touch target: footer links
    page2 = ctx.new_page()
    page2.goto(BASE + "/index.html")
    page2.wait_for_load_state()
    h = page2.evaluate("document.querySelector('.footer-links a').getBoundingClientRect().height")
    print("footer link height @390px: %s px" % h)
    # zoom clip: map-preview at 150% text zoom (desktop context)
    dctx = browser.new_context(viewport={"width": 1440, "height": 900})
    dp = dctx.new_page()
    dp.goto(BASE + "/index.html")
    dp.wait_for_load_state()
    dp.evaluate("document.body.style.zoom='1.5'")
    dp.wait_for_timeout(300)
    clip = dp.evaluate("""(() => { const el = document.querySelector('.map-preview'); if (!el) return 'none'; return 'sh=' + el.scrollHeight + ' ch=' + el.clientHeight + ' sw=' + el.scrollWidth + ' cw=' + el.clientWidth + ' clipped=' + (el.scrollHeight > el.clientHeight + 2 || el.scrollWidth > el.clientWidth + 2); })()""")
    print("map-preview @150%% zoom: %s" % clip)
    dp.evaluate("document.body.style.zoom=''")
    # admin dashboard audit table
    dp2 = dctx.new_page()
    dp2.goto(BASE + "/pages/admin/index.html")
    dp2.wait_for_load_state()
    aud = dp2.evaluate("""(() => { const t = document.querySelector('#audit-preview'); if (!t) return 'logged-out'; const wrap = t.closest('.data-table-wrap'); const table = t.closest('table'); return 'wrap=' + getComputedStyle(wrap).overflowX + ' tableSw=' + table.scrollWidth + ' wrapCw=' + wrap.clientWidth + ' clipped=' + (table.scrollWidth > wrap.clientWidth + 2); })()""")
    print("admin audit-preview: %s" % aud)
    print("pageerrors: %d" % len(errors))
    for e in errors[:10]: print("  " + e)
    browser.close()
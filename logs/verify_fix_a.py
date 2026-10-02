import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
from playwright.sync_api import sync_playwright

BASE = "http://localhost:8000"

with sync_playwright() as pw:
    browser = pw.chromium.launch()
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    errors = []
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    page.on("pageerror", lambda e: errors.append(str(e)))

    # 1 deep link oro lab
    page.goto(BASE + "/pages/oro.html#laboratoriniai")
    page.wait_for_load_state(); page.wait_for_timeout(1200)
    print("lab tab selected:", page.evaluate("document.querySelector('#tab-laboratory-air').getAttribute('aria-selected')"))
    print("lab panel visible:", page.evaluate("!document.querySelector('#panel-laboratory-air').hidden"))
    # 2 deep link wildlife
    page.goto(BASE + "/pages/gyvoji_gamta.html#pauksciai")
    page.wait_for_load_state(); page.wait_for_timeout(1200)
    print("pauksciai tab selected:", page.evaluate("[...document.querySelectorAll('#wildlife-tabs button')].find(b => b.getAttribute('aria-selected')==='true')?.textContent || 'NONE'"))
    # 3 dropdown contents
    page.goto(BASE + "/pages/oro.html")
    page.wait_for_load_state(); page.wait_for_timeout(800)
    links = page.evaluate("[...document.querySelectorAll('.main-nav details a')].map(a => a.getAttribute('href'))")
    print("monitoringas dropdown hrefs:", links)
    # 4 multiselect on vanduo
    page.goto(BASE + "/pages/vanduo.html")
    page.wait_for_load_state(); page.wait_for_timeout(1400)
    rows = page.evaluate("document.querySelectorAll('.multiselect__option').length")
    checked = page.evaluate("document.querySelectorAll('.multiselect__option input:checked').length")
    count_txt = page.evaluate("document.querySelector('.multiselect__count')?.textContent || document.querySelector('.multiselect')?.textContent.match(/\\d+ iš \\d+/)?.[0] || 'MISSING'")
    native_sel = page.evaluate("[...document.querySelectorAll('#water-sites option')].filter(o=>o.selected).map(o=>o.value)")
    print("vanduo multiselect rows=%d checked=%d count='%s' nativeSelected=%s" % (rows, checked, count_txt, native_sel))
    # uncheck all, check none -> chart should not crash; then re-check first
    page.locator(".multiselect__option input").first.set_checked(False)
    page.wait_for_timeout(700)
    page.locator(".multiselect__option input").first.set_checked(True)
    page.wait_for_timeout(700)
    errs_mid = len(errors)
    print("errors after toggling multi:", errs_mid)
    page.screenshot(path="logs/fixa-vanduo-multiselect.png", clip={"x": 0, "y": 300, "width": 1440, "height": 700})
    # district change re-render
    page.select_option("#water-district", index=1) if page.locator("#water-district option").count() > 1 else None
    page.wait_for_timeout(900)
    rows2 = page.evaluate("document.querySelectorAll('.multiselect__option').length")
    print("vanduo rows after district change:", rows2)
    # mobile overflow quick on vanduo + gyvoji_gamta
    mctx = browser.new_context(viewport={"width": 390, "height": 844})
    mp = mctx.new_page()
    for r in ["pages/vanduo.html", "pages/gyvoji_gamta.html", "pages/oro.html"]:
        mp.goto(BASE + "/" + r); mp.wait_for_load_state(); mp.wait_for_timeout(800)
        print("390", r, "sw=", mp.evaluate("document.documentElement.scrollWidth"))
    print("errors total:", len(errors))
    for e in errors[:10]: print("  ", e)
    browser.close()
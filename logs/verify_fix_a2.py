import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
from playwright.sync_api import sync_playwright

BASE = "http://localhost:8000"

with sync_playwright() as pw:
    browser = pw.chromium.launch()
    page = browser.new_context(viewport={"width": 1440, "height": 900}).new_page()
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.goto(BASE + "/pages/vanduo.html")
    page.wait_for_load_state(); page.wait_for_timeout(1400)
    opts_before = page.evaluate("[...document.querySelectorAll('#water-sites option')].map(o=>[o.value, o.textContent])")
    print("districts:", page.evaluate("[...document.querySelectorAll('#water-district option')].map(o=>[o.value, o.textContent])"))
    print("options before:", opts_before)
    # pick a district that HAS water sites: try each and see
    dists = page.locator("#water-district option")
    n = dists.count()
    for i in range(n):
        page.select_option("#water-district", index=i)
        page.wait_for_timeout(800)
        natives = page.evaluate("[...document.querySelectorAll('#water-sites option')].map(o=>o.value)")
        custom = page.evaluate("document.querySelectorAll('.multiselect__option').length")
        print("district %d -> native options=%d custom rows=%d" % (i, len(natives), custom))
    print("errors:", len(errors))
    browser.close()
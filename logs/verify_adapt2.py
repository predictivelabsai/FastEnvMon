import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
from playwright.sync_api import sync_playwright

BASE = "http://localhost:8000"

with sync_playwright() as pw:
    browser = pw.chromium.launch()

    # --- map-preview at 150% zoom: distinguish real text clipping from decorative overflow
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    dp = ctx.new_page()
    dp.goto(BASE + "/index.html")
    dp.wait_for_load_state()
    dp.wait_for_timeout(800)
    dp.evaluate("document.body.style.zoom='1.5'")
    dp.wait_for_timeout(300)
    res = dp.evaluate("""(() => {
      const el = document.querySelector('.map-preview');
      if (!el) return 'none';
      const content = el.querySelector('.map-preview-content');
      const link = el.querySelector('.map-preview-link');
      const label = el.querySelector('.map-preview-label');
      const er = el.getBoundingClientRect();
      const items = [['content', content], ['link', link], ['label', label]];
      const out = [];
      for (const [name, node] of items) {
        if (!node) { out.push(name + ':absent'); continue; }
        const r = node.getBoundingClientRect();
        const overV = r.bottom > er.bottom + 1 || r.top < er.top - 1;
        const overH = r.right > er.right + 1 || r.left < er.left - 1;
        out.push(name + ' ' + Math.round(r.width) + 'x' + Math.round(r.height) + (overV ? ' OVER-V' : ' ok') + (overH ? ' OVER-H' : ' ok'));
      }
      return out.join(' | ');
    })()""")
    print("map-preview @150%% zoom children: %s" % res)
    dp.evaluate("document.body.style.zoom=''")

    # --- admin audit-preview with real login
    dp2 = ctx.new_page()
    dp2.goto(BASE + "/pages/admin/login.html")
    dp2.wait_for_load_state()
    dp2.fill("#username-input", "administratorius") if dp2.locator("#username-input").count() else dp2.locator('input[name="username"]').first.fill("administratorius")
    dp2.locator('input[type="password"], #password-input').first.fill("admin")
    dp2.get_by_role("button").first.click()
    dp2.wait_for_timeout(1500)
    totp = dp2.locator("#totp-code")
    if totp.count():
        code = totp.text_content().strip()
        dp2.fill("#totp-input", code)
        dp2.get_by_role("button").first.click()
        dp2.wait_for_timeout(2000)
    print("after login url:", dp2.url)
    dp2.goto(BASE + "/pages/admin/index.html")
    dp2.wait_for_load_state()
    dp2.wait_for_timeout(900)
    aud = dp2.evaluate("""(() => {
      const t = document.querySelector('#audit-preview');
      if (!t) return 'no #audit-preview';
      const wrap = t.closest('.data-table-wrap') || t.parentElement;
      const table = t.closest('table') || t;
      const doc = document.documentElement;
      return 'wrapOverflowX=' + getComputedStyle(wrap).overflowX + ' tableSw=' + table.scrollWidth + ' wrapCw=' + wrap.clientWidth + ' docSw=' + doc.scrollWidth + ' docCw=' + doc.clientWidth + ' docOverflow=' + (doc.scrollWidth > doc.clientWidth + 2);
    })()""")
    print("admin audit-preview: %s" % aud)
    browser.close()
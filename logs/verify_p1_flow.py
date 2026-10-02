import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
from playwright.sync_api import sync_playwright

BASE = "http://localhost:8000"

with sync_playwright() as pw:
    browser = pw.chromium.launch()
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))

    # full public wizard: subscribe -> verify -> active
    page.goto(BASE + "/pages/prenumerata.html")
    page.wait_for_selector("#to-confirm")
    page.check("[data-check-group='districts'] >> nth=0")
    page.click("#to-confirm")
    page.fill("#subscription-email", "test@klaipeda.lt")
    page.check("input[name=consent]")
    page.click("#subscription-form button[type=submit]")
    page.wait_for_timeout(300)
    demo_code = page.locator("#demo-code").text_content().strip("[] ")
    page.fill("#verify-code", demo_code)
    page.click("#verify-form button[type=submit]")
    page.wait_for_timeout(300)
    stored = page.evaluate("JSON.parse(localStorage.getItem('kms-amis-demo-subscriptions-v1')).map(s => ({status: s.status, email: s.email}))")
    print("stored after public verify:", stored)

    # admin dashboard in same storage
    page.goto(BASE + "/pages/admin/index.html")
    page.wait_for_load_state()
    if "/login" in page.url:
        page.fill("#login-username", "administratorius")
        page.fill("#login-password", "admin")
        page.click("#credentials-form button[type=submit]")
        page.wait_for_selector("#totp-code")
        page.fill("#totp-input", page.locator("#totp-code").text_content() or page.locator("#totp-code").inner_text())
        page.click("#totp-form button[type=submit]")
        page.wait_for_load_state()
    page.goto(BASE + "/pages/admin/index.html")
    page.wait_for_selector("#kpi-subscribers")
    print("KPI subscribers:", page.locator("#kpi-subscribers").text_content() or "(needs session?)", "url:", page.url)

    # admin subscriber table labels
    page.goto(BASE + "/pages/admin/prenumeratos.html")
    page.wait_for_selector("#subscriber-table tr")
    page.wait_for_timeout(300)
    chips = page.eval_on_selector_all("#subscriber-table .admin-chip", "els => els.map(e => e.textContent)")
    print("prenumeratos chips:", chips)
    print("errors:", errors)
    browser.close()
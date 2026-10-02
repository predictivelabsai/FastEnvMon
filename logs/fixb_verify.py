import io
import json
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright


sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

BASE_URL = "http://localhost:8000"
OUTPUT_DIR = Path(r"C:\Users\Joosep\tenders\klaipeda-environment\logs")
ROUTES = {
    "index": "/index.html",
    "oro": "/pages/oro.html",
    "truksmas": "/pages/truksmas.html",
    "dirvezemis": "/pages/dirvezemis.html",
    "vanduo": "/pages/vanduo.html",
    "gyvoji_gamta": "/pages/gyvoji_gamta.html",
    "zeldynai": "/pages/zeldynai.html",
    "zemelapis": "/pages/zemelapis.html",
    "ataskaitos": "/pages/ataskaitos.html",
    "prenumerata": "/pages/prenumerata.html",
    "vadovas": "/pages/vadovas.html",
    "bendra-info": "/pages/bendra-info.html",
}
CHART_ROUTES = (
    "oro",
    "truksmas",
    "dirvezemis",
    "vanduo",
    "gyvoji_gamta",
    "zeldynai",
    "ataskaitos",
)


def select_by_index(page, selector, index):
    locator = page.locator(selector)
    values = locator.locator("option").evaluate_all("options => options.map(option => option.value)")
    if len(values) > index:
        locator.select_option(values[index])


def exercise_chart(page, name):
    if name == "oro":
        select_by_index(page, "#air-parameter", 1)
        page.locator("#tab-laboratory-air").click()
        page.locator("#tab-automatic-air").click()
        select_by_index(page, "#air-parameter", 2)
    elif name == "truksmas":
        select_by_index(page, "#noise-parameter", 1)
        page.locator("#noise-period").select_option("365d")
    elif name == "dirvezemis":
        select_by_index(page, "#soil-parameter", 1)
        page.locator("#soil-period").select_option("365d")
    elif name == "vanduo":
        select_by_index(page, "#water-parameter", 1)
        page.locator("#water-period").select_option("365d")
    elif name == "gyvoji_gamta":
        tabs = page.locator("#wildlife-tabs button")
        tabs.nth(2).click()
        tabs.nth(4).click()
    elif name == "zeldynai":
        select_by_index(page, "#greenery-parameter", 1)
        select_by_index(page, "#greenery-district", 1)
    elif name == "ataskaitos":
        page.locator('[data-report-year="2024"]').click()
        page.locator('[data-report-year="2025"]').click()
    page.wait_for_timeout(450)


def chart_target(page, name):
    selectors = {
        "oro": '[data-analysis-panel]:not([hidden]) .chart-grid',
        "truksmas": ".chart-grid",
        "dirvezemis": ".periodic-chart",
        "vanduo": ".periodic-chart",
        "gyvoji_gamta": ".chart-panel:has(#wildlife-chart)",
        "zeldynai": ".chart-panel:has(#greenery-chart)",
        "ataskaitos": ".report-section:has(#report-chart)",
    }
    return page.locator(selectors[name]).first


def visible_overlap(page, selector_a, selector_b):
    return page.evaluate(
        """([selectorA, selectorB]) => {
          const a = document.querySelector(selectorA);
          const b = document.querySelector(selectorB);
          if (!a || !b || !a.offsetParent || !b.offsetParent) return false;
          const ar = a.getBoundingClientRect();
          const br = b.getBoundingClientRect();
          return ar.left < br.right && ar.right > br.left && ar.top < br.bottom && ar.bottom > br.top;
        }""",
        [selector_a, selector_b],
    )


def footer_gap(page):
    return page.evaluate(
        """() => {
          const main = document.querySelector('main');
          const footer = document.querySelector('.site-footer');
          const last = main?.lastElementChild;
          if (!main || !footer || !last) return null;
          return Math.round((footer.getBoundingClientRect().top - last.getBoundingClientRect().bottom) * 100) / 100;
        }"""
    )


def section_gaps(page):
    return page.locator(".content-stack").evaluate_all(
        """stacks => stacks.flatMap(stack => {
          const children = [...stack.children].filter(child => child.offsetParent);
          return children.slice(1).map((child, index) => {
          const previous = children[index];
          return Math.round((child.getBoundingClientRect().top - previous.getBoundingClientRect().bottom) * 100) / 100;
        });
        })"""
    )


def multiselect_update(page, selector):
    root = page.locator(f"{selector} + .multiselect")
    if root.count() == 0:
        return {"present": False}
    count = root.locator(".multiselect__count")
    before = count.inner_text()
    checkbox = root.locator('input[type="checkbox"]').first
    checkbox.click(force=True)
    page.wait_for_timeout(100)
    after = count.inner_text()
    return {"present": True, "before": before, "after": after, "updated": before != after}


def main():
    results = {
        "viewports": {},
        "console_errors": [],
        "page_errors": [],
        "chart_checks": {},
        "multiselect": {},
    }
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        for width, height in ((1440, 900), (390, 844)):
            viewport_key = str(width)
            results["viewports"][viewport_key] = {}
            for name, route in ROUTES.items():
                page = browser.new_page(viewport={"width": width, "height": height})
                console_errors = []
                page_errors = []
                page.on(
                    "console",
                    lambda message, bucket=console_errors: bucket.append(message.text)
                    if message.type == "error"
                    else None,
                )
                page.on("pageerror", lambda error, bucket=page_errors: bucket.append(str(error)))
                page.goto(f"{BASE_URL}{route}", wait_until="networkidle")
                page.evaluate("document.fonts.ready")
                page.wait_for_timeout(200)

                if name in CHART_ROUTES:
                    exercise_chart(page, name)
                    if width == 1440:
                        chart_target(page, name).screenshot(path=str(OUTPUT_DIR / f"fixb-{name}.png"))
                    results["chart_checks"].setdefault(name, {})[viewport_key] = {
                        "canvas_count": page.locator("canvas").count(),
                        "charts_ready": page.locator("canvas").evaluate_all(
                            "canvases => canvases.filter(canvas => canvas.offsetParent).every(canvas => !!canvas._kmsChart || canvas.id === 'report-chart')"
                        ),
                    }

                if name == "index":
                    boxes = page.locator(".grid-home > .panel").evaluate_all(
                        "nodes => nodes.map(node => { const r = node.getBoundingClientRect(); return ({top: r.top, bottom: r.bottom, height: r.height}); })"
                    )
                    row_heights = page.locator(".monitoring-link").evaluate_all(
                        """nodes => Object.values(nodes.reduce((rows, node) => {
                          const r = node.getBoundingClientRect();
                          const key = Math.round(r.top);
                          (rows[key] ||= []).push(r.height);
                          return rows;
                        }, {})).map(heights => Math.max(...heights) - Math.min(...heights))"""
                    )
                    results["viewports"][viewport_key][name] = {
                        "scroll_width": page.evaluate("document.documentElement.scrollWidth"),
                        "footer_gap": footer_gap(page),
                        "section_gaps": section_gaps(page),
                        "home_panels": boxes,
                        "home_raw_bottom_delta": round(
                            max(box["bottom"] for box in boxes) - min(box["bottom"] for box in boxes), 2
                        ),
                        "home_column_end_delta": round(abs(boxes[1]["bottom"] - boxes[2]["bottom"]), 2),
                        "monitoring_row_height_deltas": row_heights,
                    }
                    page.screenshot(
                        path=str(OUTPUT_DIR / ("fixb-home.png" if width == 1440 else "fixb-home-390.png")),
                        full_page=True,
                    )
                else:
                    results["viewports"][viewport_key][name] = {
                        "scroll_width": page.evaluate("document.documentElement.scrollWidth"),
                        "footer_gap": footer_gap(page),
                        "section_gaps": section_gaps(page),
                    }

                status_heading_overlap = visible_overlap(page, ".section-heading .status-chip", ".section-heading h2")
                results["viewports"][viewport_key][name]["status_heading_overlap"] = status_heading_overlap
                results["viewports"][viewport_key][name]["card_heading_overlap"] = visible_overlap(
                    page, ".card-heading .status-chip", ".card-heading h2"
                )
                results["viewports"][viewport_key][name]["stat_text_overflow_count"] = page.locator(
                    ".stat-card *"
                ).evaluate_all(
                    "nodes => nodes.filter(node => node.offsetParent && node.scrollWidth > node.clientWidth + 1).length"
                )
                if name == "zemelapis":
                    results["viewports"][viewport_key][name]["map_status_attribution_overlap"] = visible_overlap(
                        page, ".map-status", ".leaflet-control-attribution"
                    )

                if width == 1440 and name == "oro":
                    results["multiselect"]["oro"] = multiselect_update(page, "#air-sites")
                    results["chart_theme"] = page.locator(
                        '[data-analysis-panel]:not([hidden]) canvas[data-chart="time"]'
                    ).evaluate(
                        """canvas => ({
                          family: canvas._kmsChart.options.font.family,
                          legendColor: canvas._kmsChart.options.plugins.legend.labels.color,
                          tickColor: canvas._kmsChart.options.scales.y.ticks.color,
                          gridColor: canvas._kmsChart.options.scales.y.grid.color,
                          axisTitleSize: canvas._kmsChart.options.scales.y.title.font.size,
                          tooltipBackground: canvas._kmsChart.options.plugins.tooltip.backgroundColor
                        })"""
                    )
                if width == 1440 and name == "vanduo":
                    results["multiselect"]["vanduo"] = multiselect_update(page, "#water-sites")
                if name == "ataskaitos":
                    results["chart_checks"][name][viewport_key].update(
                        page.locator("#report-chart").evaluate(
                            """canvas => ({
                              yTitleDisplayed: canvas._kmsChart.options.scales.y.title.display === true,
                              yTitleText: canvas._kmsChart.options.scales.y.title.text || null,
                              xLabels: canvas._kmsChart.scales.x.ticks.map(tick => tick.label),
                              canvasHeight: canvas.getBoundingClientRect().height,
                              notePresent: !!document.querySelector('.report-chart-note')?.textContent.trim()
                            })"""
                        )
                    )

                results["console_errors"].extend(f"{width}:{name}: {error}" for error in console_errors)
                results["page_errors"].extend(f"{width}:{name}: {error}" for error in page_errors)
                page.close()
        browser.close()

    mobile_widths = {
        name: data["scroll_width"] for name, data in results["viewports"]["390"].items()
    }
    results["summary"] = {
        "console_error_total": len(results["console_errors"]),
        "page_error_total": len(results["page_errors"]),
        "mobile_max_scroll_width": max(mobile_widths.values()),
        "mobile_widths": mobile_widths,
        "footer_gap_values_1440": sorted(
            {data["footer_gap"] for data in results["viewports"]["1440"].values() if data["footer_gap"] is not None}
        ),
        "section_gap_values_1440": sorted(
            {gap for data in results["viewports"]["1440"].values() for gap in data["section_gaps"]}
        ),
    }
    print(json.dumps(results, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()

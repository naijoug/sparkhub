import { test, expect, Page } from "@playwright/test";
import { readFile } from "node:fs/promises";

const storageKey = "sparkhub:curatorial-folio";
const featuredTitle = "FinTech 秩序感资产叙事仪表盘";
const featuredOpener = (page: Page) => page.getByRole("button", { name: `查看展品 ${featuredTitle} 详情` });
const dailyOpener = (page: Page) => page.locator("#daily-curations [role=button]").first();
let runtimeErrors: string[] = [];

test.beforeEach(async ({ page }) => {
  runtimeErrors = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  await page.goto("/");
});

test.afterEach(() => {
  expect(runtimeErrors, "No unhandled errors, including hydration failures").toEqual([]);
});

test("search inputs, category counts, source counts, empty state and reset agree", async ({ page }) => {
  const search = page.getByRole("textbox", { name: "全馆检索", exact: true });
  await search.fill("  wEbGL  ");
  await expect(page.getByRole("textbox", { name: "检索全馆灵感与作品" })).toHaveValue("  wEbGL  ");
  await expect(page.locator("main [role=status]")).toContainText("共命中 6");
  await page.getByRole("button", { name: /新锐器物 PRODUCTS/ }).click();
  await expect(page.locator("#daily-curations h3")).toHaveCount(0);
  await expect(page.locator("main [role=status]")).toContainText("漫游志 [0]");
  await expect(page.locator("main [role=status]")).toContainText("共命中 5");
  await search.fill("Mobbin");
  await page.getByRole("button", { name: /中文设计来源/ }).click();
  await expect(page.locator("#sources h4")).toHaveCount(0);
  await expect(page.locator("main [role=status]")).toContainText("信源图谱 [0]");
  await page.getByRole("button", { name: /全部信源/ }).click();
  await expect(page.locator("#sources h4")).toHaveCount(2);
  await expect(page.locator("main [role=status]")).toContainText("信源图谱 [2]");
  await search.fill("zz_no_matching_sparkhub_item");
  await expect(page.locator("main [role=status]")).toContainText("共命中 0");
  await page.getByRole("button", { name: /RESET FILTER/ }).click();
  await expect(search).toHaveValue("");
  await expect(page.locator("main [role=status]")).toHaveCount(0);
  await expect(page.locator("#daily-curations h3")).toHaveCount(5);
});

test("bookmarks survive reload and removal without hydration errors", async ({ page }) => {
  await page.getByRole("button", { name: `收藏 ${featuredTitle}`, exact: true }).click();
  await expect(page.getByTitle("打开我的策展画夹")).toContainText("1");
  await page.reload();
  await expect(page.getByTitle("打开我的策展画夹")).toContainText("1");
  await page.getByTitle("打开我的策展画夹").click();
  await expect(page.getByRole("dialog").getByRole("heading", { name: featuredTitle })).toBeVisible();
  await page.getByRole("button", { name: "从画夹移除" }).click();
  await expect(page.getByRole("dialog")).toContainText("暂无已收藏");
  await page.keyboard.press("Escape");
  await page.reload();
  await expect(page.getByTitle("打开我的策展画夹")).toContainText("0");
});

test("invalid stored bookmarks are ignored and can be replaced", async ({ page }) => {
  await page.evaluate((key) => localStorage.setItem(key, "not json"), storageKey);
  await page.reload();
  await page.getByRole("button", { name: `收藏 ${featuredTitle}`, exact: true }).click();
  await expect(page.getByTitle("打开我的策展画夹")).toContainText("1");
});

test("all dialog types contain keyboard focus and restore their opener", async ({ page }) => {
  const openers = [featuredOpener(page), dailyOpener(page), page.locator("#hackathons [role=button]").first(), page.locator("#ai-contests [role=button]").first(), page.getByTitle("打开我的策展画夹")];
  for (const opener of openers) {
    await opener.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect.poll(() => dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
    // Cycle beyond the number of controls in either direction.
    for (const key of ["Tab", "Shift+Tab"]) {
      for (let i = 0; i < 16; i++) {
        await page.keyboard.press(key);
        const focusSafe = await dialog.evaluate((el) => document.activeElement === document.body || el.contains(document.activeElement));
        expect(focusSafe).toBe(true);
      }
    }
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(opener).toBeFocused();
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  }
});

test("featured navigation, modal bookmarks, backdrop and tag search still work", async ({ page }) => {
  await featuredOpener(page).click();
  const dialog = page.getByRole("dialog");
  await page.keyboard.press("ArrowRight");
  await expect(dialog).toContainText("Symbiosis");
  await page.keyboard.press("ArrowLeft");
  await expect(dialog).toContainText(featuredTitle);
  await dialog.getByRole("button", { name: /APPRECIATE/ }).click();
  await expect(dialog.getByRole("button", { name: /SAVED/ })).toBeVisible();
  await dialog.click({ position: { x: 2, y: 2 } });
  await expect(dialog).toHaveCount(0);
  await dailyOpener(page).click();
  await dialog.getByRole("button", { name: "#Awwwards", exact: true }).click();
  await expect(dialog).toHaveCount(0);
  await expect(page.getByRole("textbox", { name: "全馆检索", exact: true })).toHaveValue("Awwwards");
});

for (const viewport of [{ width: 390, height: 667 }, { width: 320, height: 568 }]) {
  test(`featured dialog scrolls and controls remain reachable at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await featuredOpener(page).click();
    const dialog = page.getByRole("dialog");
    const close = dialog.getByRole("button", { name: /ESC \/ CLOSE/ });
    await expect(close).toBeInViewport();
    const panel = await dialog.locator(":scope > div").boundingBox();
    expect(panel!.y).toBeGreaterThanOrEqual(0);
    expect(panel!.y + panel!.height).toBeLessThanOrEqual(viewport.height);
    const closeBounds = await close.boundingBox();
    expect(closeBounds!.x).toBeGreaterThanOrEqual(panel!.x);
    expect(closeBounds!.x + closeBounds!.width).toBeLessThanOrEqual(panel!.x + panel!.width);
    const save = dialog.getByRole("button", { name: /APPRECIATE/ });
    await save.scrollIntoViewIfNeeded();
    await expect(save).toBeInViewport();
    await save.click();
    await expect(close).toBeInViewport();
    await page.screenshot({ path: test.info().outputPath("mobile-dialog.png") });
    await close.click();
    await expect(dialog).toHaveCount(0);
  });
}

for (const mobile of [false, true]) {
  test(`Markdown download includes all five types of bookmarks (${mobile ? "mobile" : "desktop"})`, async ({ page }) => {
    if (mobile) await page.setViewportSize({ width: 390, height: 667 });
    for (const id of ["featured", "daily-curations", "hackathons", "ai-contests", "sources"]) {
      await page.locator(`#${id} button[aria-label^="收藏"]`).first().click();
    }
    await page.getByTitle("打开我的策展画夹").click();
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("button", { name: "每日漫游 [1]", exact: true }).click();
    const exportButton = dialog.getByRole("button", { name: /导出策展笔记/ });
    await expect(exportButton).toBeInViewport();
    const pending = page.waitForEvent("download");
    await exportButton.click();
    const download = await pending;
    expect(await download.failure()).toBeNull();
    expect(download.suggestedFilename()).toMatch(/^sparkhub-curatorial-folio-\d{4}-\d{2}-\d{2}\.md$/);
    const content = await readFile((await download.path())!, "utf8");
    expect(content).toContain("典藏总量：5");
    expect(content.match(/^### /gm)).toHaveLength(5);
    for (const text of [featuredTitle, "FlowFest 2025", "Web3 去中心化社交平台", "Midjourney 建筑概念设计", "Mobbin", "**标签**", "https://mobbin.com/"]) expect(content).toContain(text);
    await download.saveAs(test.info().outputPath(download.suggestedFilename()));
  });
}

test("copy citation writes the actual clipboard and resets on another item", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.bringToFront();
  const previous = await page.evaluate(() => navigator.clipboard.readText());
  try {
    await dailyOpener(page).click();
    const dialog = page.getByRole("dialog");
    const title = await dialog.locator("h3").innerText();
    const href = await dialog.getByRole("link").getAttribute("href");
    await dialog.getByRole("button", { name: /复制学术引文/ }).click();
    await expect(dialog.getByRole("status")).toContainText("引文已复制");
    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toContain(title);
    expect(clipboard).toContain(href!);
    expect(clipboard).toContain("[SparkHub 策展档案 CURATION · 13]");
    await page.keyboard.press("Escape");
    await page.locator("#hackathons [role=button]").first().click();
    await expect(dialog.getByRole("status")).toBeEmpty();
    await dialog.getByRole("button", { name: /复制学术引文/ }).click();
    await expect(dialog.getByRole("status")).toContainText("引文已复制");
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("Web3 去中心化社交平台");
  } finally {
    await page.evaluate((text) => navigator.clipboard.writeText(text), previous);
  }
});

for (const failure of ["denied", "unavailable"]) {
  test(`clipboard ${failure} offers manual text without false success`, async ({ page }) => {
    await page.evaluate((mode) => {
      Object.defineProperty(navigator, "clipboard", { configurable: true, value: mode === "unavailable" ? undefined : { writeText: () => Promise.reject(new DOMException("Denied", "NotAllowedError")) } });
    }, failure);
    await dailyOpener(page).click();
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("button", { name: /复制学术引文/ }).click();
    await expect(dialog.getByRole("status")).toContainText("复制失败");
    await expect(dialog.getByRole("status")).not.toContainText("已复制");
    await expect(dialog.getByRole("textbox", { name: "手动复制引文" })).toHaveValue(/FlowFest 2025/);
  });
}

test("export creation failure offers a retry", async ({ page }) => {
  await page.getByRole("button", { name: `收藏 ${featuredTitle}`, exact: true }).click();
  await page.getByTitle("打开我的策展画夹").click();
  await page.evaluate(() => {
    const original = URL.createObjectURL;
    URL.createObjectURL = () => {
      URL.createObjectURL = original;
      throw new Error("Download unavailable");
    };
  });
  await page.getByRole("button", { name: /导出策展笔记/ }).click();
  await expect(page.getByRole("dialog").getByRole("alert")).toHaveText("导出失败，请重试。");
  await expect(page.getByRole("button", { name: /导出策展笔记/ })).toBeEnabled();
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: /导出策展笔记/ }).click();
  expect(await (await pending).failure()).toBeNull();
  await expect(page.getByRole("dialog").getByRole("alert")).toHaveCount(0);
});

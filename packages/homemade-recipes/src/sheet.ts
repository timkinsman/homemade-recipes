// adopted from https://github.com/vanilla-extract-css/vanilla-extract/blob/9241939b9c8f44b78bd6cc6285e5f6c41b6dfd62/packages/css/src/injectStyles.ts#L9
export const createSheet = (identifier: string) => {
  const styleEl = document.createElement("style");

  styleEl.setAttribute("data-package", "homemade-recipes");

  styleEl.setAttribute("data-identifier", identifier);
  styleEl.setAttribute("type", "text/css");
  const stylesheet = styleEl;
  document.head.appendChild(styleEl);

  return stylesheet.sheet!;
};

// adopted from https://github.com/stitchesjs/stitches/blob/50fd8a1adc6360340fe348a8b3ebc8b06d38e230/packages/core/src/sheet.js#L16
export const isSheetAccessible = (sheet: CSSStyleSheet) => {
  if (sheet.href && !sheet.href.startsWith(location.origin)) {
    return false;
  }

  try {
    return !!sheet.cssRules;
  } catch (e) {
    return false;
  }
};

function getStyleProperties(cssStyleRule: CSSStyleRule) {
  const style = cssStyleRule.style;
  let styleString = "";

  for (let i = 0; i < style.length; i++) {
    const propertyName = style[i];
    styleString +=
      propertyName + ":" + style.getPropertyValue(propertyName) + ";";
  }

  return styleString;
}

export function getStyle(className: string) {
  const sheets = Array.from(document.styleSheets);

  for (const sheet of sheets) {
    if (!isSheetAccessible(sheet)) continue;

    const rules = sheets.map((sheet) => Array.from(sheet.cssRules)).flat();

    for (const rule of rules) {
      if (rule.type !== 1) continue;

      const styleRule = rule as CSSStyleRule;

      if (styleRule.selectorText === className) {
        return getStyleProperties(styleRule);
      }
    }
  }
}

/**
 * @jest-environment jsdom
 */

import { injectAdditionalCss } from "./homemadeRecipe.css";

describe("injectAdditionalCss", () => {
  it("should append provided string classes", () => {
    const styleEl = document.createElement("style");
    styleEl.setAttribute("type", "text/css");

    document.head.append(styleEl);

    styleEl.innerHTML = `
        simple-one {
            color: pink;
        }
        simple-two {
            color: blue;
        }
    `;

    const sheet = injectAdditionalCss();

    const rules = Array.from(sheet.cssRules);

    expect(rules.map((rule) => rule.cssText)).toMatchInlineSnapshot(`
    [
      "@media screen and (min-width: 520px) {.simple-one_xs {color: pink;}}",
      "@media screen and (min-width: 1024px) {.simple-one_md {color: pink;}}",
      "@media screen and (min-width: 1640px) {.simple-one_xl {color: pink;}}",
      "@media screen and (min-width: 520px) {.simple-two_xs {color: blue;}}",
      "@media screen and (min-width: 1024px) {.simple-two_md {color: blue;}}",
      "@media screen and (min-width: 1640px) {.simple-two_xl {color: blue;}}",
    ]
    `);

    // cleanup
    document.head.removeChild(styleEl);
  });

  it("should not append provided string classes", () => {
    const styleEl = document.createElement("style");
    styleEl.setAttribute("type", "text/css");

    document.head.append(styleEl);

    styleEl.innerHTML = `
        wrong-one {
            color: pink;
        }
        wrong-two {
            color: blue;
        }
    `;

    const sheet = injectAdditionalCss();

    const rules = Array.from(sheet.cssRules);

    expect(rules.map((rule) => rule.cssText)).toMatchInlineSnapshot(`[]`);

    // cleanup
    document.head.removeChild(styleEl);
  });
});

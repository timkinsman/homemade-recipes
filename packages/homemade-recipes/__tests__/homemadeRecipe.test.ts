import { describe, expect, it } from "vitest";
import {
  basic,
  definedStringBase,
  definedStringBaseArray,
  empty,
} from "./homemadeRecipe.css";

describe("homemadeRecipes", () => {
  // existing tests https://github.com/vanilla-extract-css/vanilla-extract/blob/master/tests/recipes/recipes.test.ts

  it("should return default variants for no options", () => {
    expect(basic()).toMatchInlineSnapshot(
      `"homemadeRecipe__unugpa1 homemadeRecipe_spaceWithDefault_small__unugpa2"`,
    );
  });

  it("should return default variants for empty options", () => {
    expect(basic({})).toMatchInlineSnapshot(
      `"homemadeRecipe__unugpa1 homemadeRecipe_spaceWithDefault_small__unugpa2"`,
    );
  });

  it("should return default variants for undefined options", () => {
    expect(basic({ spaceWithDefault: undefined })).toMatchInlineSnapshot(
      `"homemadeRecipe__unugpa1 homemadeRecipe_spaceWithDefault_small__unugpa2"`,
    );
  });

  it("should return requested variants", () => {
    expect(
      basic({
        spaceWithDefault: "large",
        spaceWithoutDefault: "small",
        color: "blue",
      }),
    ).toMatchInlineSnapshot(
      `"homemadeRecipe__unugpa1 homemadeRecipe_spaceWithDefault_large__unugpa3 homemadeRecipe_spaceWithoutDefault_small__unugpa4 homemadeRecipe_color_blue__unugpa7"`,
    );
  });

  it("should return requested compound variants", () => {
    expect(
      basic({ spaceWithDefault: "small", color: "red" }),
    ).toMatchInlineSnapshot(
      `"homemadeRecipe__unugpa1 homemadeRecipe_spaceWithDefault_small__unugpa2 homemadeRecipe_color_red__unugpa6 homemadeRecipe_compound_0__unugpa9"`,
    );
  });

  it("should return compound variants via defaultVariants", () => {
    expect(basic({ color: "red" })).toMatchInlineSnapshot(
      `"homemadeRecipe__unugpa1 homemadeRecipe_spaceWithDefault_small__unugpa2 homemadeRecipe_color_red__unugpa6 homemadeRecipe_compound_0__unugpa9"`,
    );
  });

  it("should return compound variants via defaultVariants, even when undefined is passed", () => {
    expect(
      basic({ color: "red", spaceWithDefault: undefined }),
    ).toMatchInlineSnapshot(
      `"homemadeRecipe__unugpa1 homemadeRecipe_spaceWithDefault_small__unugpa2 homemadeRecipe_color_red__unugpa6 homemadeRecipe_compound_0__unugpa9"`,
    );
  });

  it("should return boolean variants", () => {
    expect(basic({ rounded: true })).toMatchInlineSnapshot(
      `"homemadeRecipe__unugpa1 homemadeRecipe_spaceWithDefault_small__unugpa2 homemadeRecipe_rounded_true__unugpa8"`,
    );
  });

  it("should ignore missing boolean variants", () => {
    expect(basic({ rounded: false })).toMatchInlineSnapshot(
      `"homemadeRecipe__unugpa1 homemadeRecipe_spaceWithDefault_small__unugpa2"`,
    );
  });

  it("should expose a function returning list of variants", () => {
    expect(basic.variants()).toMatchInlineSnapshot(`
      [
        "spaceWithDefault",
        "spaceWithoutDefault",
        "color",
        "rounded",
      ]
    `);
  });

  it('should have base class name even when "base" prop is not defined', () => {
    expect(empty()).toMatchInlineSnapshot(`"homemadeRecipe__unugpav"`);
    expect(empty.classNames.base).toMatchInlineSnapshot(
      `"homemadeRecipe__unugpav"`,
    );
    expect(empty()).toStrictEqual(empty.classNames.base);
  });

  it("should include generated base class name for provided string classes", () => {
    expect(definedStringBase()).toMatchInlineSnapshot(
      `"homemadeRecipe__unugpaw definedStringBase"`,
    );
    expect(definedStringBase.classNames.base).toMatchInlineSnapshot(
      `"homemadeRecipe__unugpaw"`,
    );

    expect(definedStringBase({ variant: "simple" })).toMatchInlineSnapshot(
      `"homemadeRecipe__unugpaw definedStringBase homemadeRecipe_variant_simple__unugpax simple-one"`,
    );
    expect(
      definedStringBase.classNames.variants.variant.simple,
    ).toMatchInlineSnapshot(`"homemadeRecipe_variant_simple__unugpax"`);
  });

  it("should include generated base class name for provided array string classes", () => {
    expect(definedStringBaseArray()).toMatchInlineSnapshot(
      `"homemadeRecipe__unugpa11 definedStringBaseInArray_1 definedStringBaseInArray_2"`,
    );
    expect(definedStringBaseArray.classNames.base).toMatchInlineSnapshot(
      `"homemadeRecipe__unugpa11"`,
    );

    expect(definedStringBaseArray({ variant: "simple" })).toMatchInlineSnapshot(
      `"homemadeRecipe__unugpa11 definedStringBaseInArray_1 definedStringBaseInArray_2 homemadeRecipe_variant_simple__unugpa12 simple-one simple-two"`,
    );
    expect(
      definedStringBaseArray.classNames.variants.variant.simple,
    ).toMatchInlineSnapshot(`"homemadeRecipe_variant_simple__unugpa12"`);
  });

  it("should expose variants class names", () => {
    expect([
      basic.classNames.base,
      basic.classNames.variants.spaceWithDefault.large,
      basic.classNames.variants.spaceWithDefault.small,
      basic.classNames.variants.spaceWithoutDefault.large,
      basic.classNames.variants.spaceWithoutDefault.small,
      basic.classNames.variants.color.blue,
      basic.classNames.variants.color.red,
      basic.classNames.variants.rounded.true,
    ]).toMatchInlineSnapshot(`
      [
        "homemadeRecipe__unugpa1",
        "homemadeRecipe_spaceWithDefault_large__unugpa3",
        "homemadeRecipe_spaceWithDefault_small__unugpa2",
        "homemadeRecipe_spaceWithoutDefault_large__unugpa5",
        "homemadeRecipe_spaceWithoutDefault_small__unugpa4",
        "homemadeRecipe_color_blue__unugpa7",
        "homemadeRecipe_color_red__unugpa6",
        "homemadeRecipe_rounded_true__unugpa8",
      ]
    `);
  });

  // additional tests

  // TODO: should this be expected behavior?
  it("should not return default variants for empty conditional options", () => {
    expect(
      basic({
        spaceWithDefault: {},
        spaceWithoutDefault: {},
        color: {},
        rounded: {},
      }),
    ).toMatchInlineSnapshot(`"homemadeRecipe__unugpa1"`);
  });

  it("should return requested variants", () => {
    expect(
      basic({
        spaceWithDefault: {
          initial: "large",
          xs: "small",
        },
        spaceWithoutDefault: {
          initial: "small",
          md: "large",
        },
        color: {
          initial: "blue",
          xl: "red",
        },
      }),
    ).toMatchInlineSnapshot(
      `"homemadeRecipe__unugpa1 homemadeRecipe_spaceWithDefault_large__unugpa3 homemadeRecipe_spaceWithDefault_xs_small__unugpaa homemadeRecipe_spaceWithoutDefault_small__unugpa4 homemadeRecipe_spaceWithoutDefault_md_large__unugpak homemadeRecipe_color_blue__unugpa7 homemadeRecipe_color_xl_red__unugpas"`,
    );
  });

  it("should return requested responsive variants", () => {
    expect(
      basic({
        spaceWithDefault: {
          xs: "small",
        },
        spaceWithoutDefault: {
          md: "large",
        },
        color: {
          xl: "red",
        },
      }),
    ).toMatchInlineSnapshot(
      `"homemadeRecipe__unugpa1 homemadeRecipe_spaceWithDefault_xs_small__unugpaa homemadeRecipe_spaceWithoutDefault_md_large__unugpak homemadeRecipe_color_xl_red__unugpas"`,
    );
  });

  // TODO: should this be expected behavior?
  it("should not return compound variants", () => {
    expect(
      basic({
        spaceWithDefault: { initial: "small" },
        color: { initial: "red" },
      }),
    ).toMatchInlineSnapshot(
      `"homemadeRecipe__unugpa1 homemadeRecipe_spaceWithDefault_small__unugpa2 homemadeRecipe_color_red__unugpa6"`,
    );
  });

  it("should expose a function returning list of conditions", () => {
    expect(basic.conditions()).toMatchInlineSnapshot(`
      [
        "xs",
        "md",
        "xl",
      ]
    `);
  });

  it("should include generated class name for provided string classes (responsive)", () => {
    expect(
      definedStringBase({ variant: { xs: "simple" } }),
    ).toMatchInlineSnapshot(
      `"homemadeRecipe__unugpaw definedStringBase homemadeRecipe_variant_xs_simple__unugpay simple-one_xs"`,
    );
    expect(
      definedStringBase.classNames.responsiveVariants.xs.variant.simple,
    ).toMatchInlineSnapshot(
      `"homemadeRecipe_variant_xs_simple__unugpay simple-one_xs"`,
    );
  });

  it("should include generated class name for provided array string classes (responsive)", () => {
    expect(
      definedStringBaseArray({ variant: { xs: "simple" } }),
    ).toMatchInlineSnapshot(
      `"homemadeRecipe__unugpa11 definedStringBaseInArray_1 definedStringBaseInArray_2 homemadeRecipe_variant_xs_simple__unugpa13 simple-one_xs simple-two_xs"`,
    );
    expect(
      definedStringBaseArray.classNames.responsiveVariants.xs.variant.simple,
    ).toMatchInlineSnapshot(
      `"homemadeRecipe_variant_xs_simple__unugpa13 simple-one_xs simple-two_xs"`,
    );
  });

  it("should expose condition variants class names", () => {
    expect([
      basic.classNames.responsiveVariants.initial.spaceWithDefault.large,
      basic.classNames.responsiveVariants.initial.spaceWithDefault.small,
      basic.classNames.responsiveVariants.initial.spaceWithoutDefault.large,
      basic.classNames.responsiveVariants.initial.spaceWithoutDefault.small,
      basic.classNames.responsiveVariants.initial.color.blue,
      basic.classNames.responsiveVariants.initial.color.red,
      basic.classNames.responsiveVariants.initial.rounded.true,
      basic.classNames.responsiveVariants.xs.spaceWithDefault.large,
      basic.classNames.responsiveVariants.xs.spaceWithDefault.small,
      basic.classNames.responsiveVariants.xs.spaceWithoutDefault.large,
      basic.classNames.responsiveVariants.xs.spaceWithoutDefault.small,
      basic.classNames.responsiveVariants.xs.color.blue,
      basic.classNames.responsiveVariants.xs.color.red,
      basic.classNames.responsiveVariants.xs.rounded.true,
      basic.classNames.responsiveVariants.md.spaceWithDefault.large,
      basic.classNames.responsiveVariants.md.spaceWithDefault.small,
      basic.classNames.responsiveVariants.md.spaceWithoutDefault.large,
      basic.classNames.responsiveVariants.md.spaceWithoutDefault.small,
      basic.classNames.responsiveVariants.md.color.blue,
      basic.classNames.responsiveVariants.md.color.red,
      basic.classNames.responsiveVariants.md.rounded.true,
      basic.classNames.responsiveVariants.xl.spaceWithDefault.large,
      basic.classNames.responsiveVariants.xl.spaceWithDefault.small,
      basic.classNames.responsiveVariants.xl.spaceWithoutDefault.large,
      basic.classNames.responsiveVariants.xl.spaceWithoutDefault.small,
      basic.classNames.responsiveVariants.xl.color.blue,
      basic.classNames.responsiveVariants.xl.color.red,
      basic.classNames.responsiveVariants.xl.rounded.true,
    ]).toMatchInlineSnapshot(`
      [
        "homemadeRecipe_spaceWithDefault_large__unugpa3",
        "homemadeRecipe_spaceWithDefault_small__unugpa2",
        "homemadeRecipe_spaceWithoutDefault_large__unugpa5",
        "homemadeRecipe_spaceWithoutDefault_small__unugpa4",
        "homemadeRecipe_color_blue__unugpa7",
        "homemadeRecipe_color_red__unugpa6",
        "homemadeRecipe_rounded_true__unugpa8",
        "homemadeRecipe_spaceWithDefault_xs_large__unugpab",
        "homemadeRecipe_spaceWithDefault_xs_small__unugpaa",
        "homemadeRecipe_spaceWithoutDefault_xs_large__unugpad",
        "homemadeRecipe_spaceWithoutDefault_xs_small__unugpac",
        "homemadeRecipe_color_xs_blue__unugpaf",
        "homemadeRecipe_color_xs_red__unugpae",
        "homemadeRecipe_rounded_xs_true__unugpag",
        "homemadeRecipe_spaceWithDefault_md_large__unugpai",
        "homemadeRecipe_spaceWithDefault_md_small__unugpah",
        "homemadeRecipe_spaceWithoutDefault_md_large__unugpak",
        "homemadeRecipe_spaceWithoutDefault_md_small__unugpaj",
        "homemadeRecipe_color_md_blue__unugpam",
        "homemadeRecipe_color_md_red__unugpal",
        "homemadeRecipe_rounded_md_true__unugpan",
        "homemadeRecipe_spaceWithDefault_xl_large__unugpap",
        "homemadeRecipe_spaceWithDefault_xl_small__unugpao",
        "homemadeRecipe_spaceWithoutDefault_xl_large__unugpar",
        "homemadeRecipe_spaceWithoutDefault_xl_small__unugpaq",
        "homemadeRecipe_color_xl_blue__unugpat",
        "homemadeRecipe_color_xl_red__unugpas",
        "homemadeRecipe_rounded_xl_true__unugpau",
      ]
    `);
  });
});

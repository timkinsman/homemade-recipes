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
      `"homemadeRecipe__1is0fpy1 homemadeRecipe_spaceWithDefault_small__1is0fpy2"`,
    );
  });

  it("should return default variants for empty options", () => {
    expect(basic({})).toMatchInlineSnapshot(
      `"homemadeRecipe__1is0fpy1 homemadeRecipe_spaceWithDefault_small__1is0fpy2"`,
    );
  });

  it("should return default variants for undefined options", () => {
    expect(basic({ spaceWithDefault: undefined })).toMatchInlineSnapshot(
      `"homemadeRecipe__1is0fpy1 homemadeRecipe_spaceWithDefault_small__1is0fpy2"`,
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
      `"homemadeRecipe__1is0fpy1 homemadeRecipe_spaceWithDefault_large__1is0fpy3 homemadeRecipe_spaceWithoutDefault_small__1is0fpy4 homemadeRecipe_color_blue__1is0fpy7"`,
    );
  });

  it("should return requested compound variants", () => {
    expect(
      basic({ spaceWithDefault: "small", color: "red" }),
    ).toMatchInlineSnapshot(
      `"homemadeRecipe__1is0fpy1 homemadeRecipe_spaceWithDefault_small__1is0fpy2 homemadeRecipe_color_red__1is0fpy6 homemadeRecipe_compound_0__1is0fpy9"`,
    );
  });

  it("should return compound variants via defaultVariants", () => {
    expect(basic({ color: "red" })).toMatchInlineSnapshot(
      `"homemadeRecipe__1is0fpy1 homemadeRecipe_spaceWithDefault_small__1is0fpy2 homemadeRecipe_color_red__1is0fpy6 homemadeRecipe_compound_0__1is0fpy9"`,
    );
  });

  it("should return compound variants via defaultVariants, even when undefined is passed", () => {
    expect(
      basic({ color: "red", spaceWithDefault: undefined }),
    ).toMatchInlineSnapshot(
      `"homemadeRecipe__1is0fpy1 homemadeRecipe_spaceWithDefault_small__1is0fpy2 homemadeRecipe_color_red__1is0fpy6 homemadeRecipe_compound_0__1is0fpy9"`,
    );
  });

  it("should return boolean variants", () => {
    expect(basic({ rounded: true })).toMatchInlineSnapshot(
      `"homemadeRecipe__1is0fpy1 homemadeRecipe_spaceWithDefault_small__1is0fpy2 homemadeRecipe_rounded_true__1is0fpy8"`,
    );
  });

  it("should ignore missing boolean variants", () => {
    expect(basic({ rounded: false })).toMatchInlineSnapshot(
      `"homemadeRecipe__1is0fpy1 homemadeRecipe_spaceWithDefault_small__1is0fpy2"`,
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
    expect(empty()).toMatchInlineSnapshot(`"homemadeRecipe__1is0fpyv"`);
    expect(empty.classNames.base).toMatchInlineSnapshot(
      `"homemadeRecipe__1is0fpyv"`,
    );
    expect(empty()).toStrictEqual(empty.classNames.base);
  });

  it("should include generated base class name for provided string classes", () => {
    expect(definedStringBase()).toMatchInlineSnapshot(
      `"homemadeRecipe__1is0fpyw definedStringBase"`,
    );
    expect(definedStringBase.classNames.base).toMatchInlineSnapshot(
      `"homemadeRecipe__1is0fpyw"`,
    );

    expect(definedStringBase({ variant: "simple" })).toMatchInlineSnapshot(
      `"homemadeRecipe__1is0fpyw definedStringBase homemadeRecipe_variant_simple__1is0fpyx simple-one"`,
    );
    expect(
      definedStringBase.classNames.variants.variant.simple,
    ).toMatchInlineSnapshot(`"homemadeRecipe_variant_simple__1is0fpyx"`);
  });

  it("should include generated base class name for provided array string classes", () => {
    expect(definedStringBaseArray()).toMatchInlineSnapshot(
      `"homemadeRecipe__1is0fpy11 definedStringBaseInArray_1 definedStringBaseInArray_2"`,
    );
    expect(definedStringBaseArray.classNames.base).toMatchInlineSnapshot(
      `"homemadeRecipe__1is0fpy11"`,
    );

    expect(definedStringBaseArray({ variant: "simple" })).toMatchInlineSnapshot(
      `"homemadeRecipe__1is0fpy11 definedStringBaseInArray_1 definedStringBaseInArray_2 homemadeRecipe_variant_simple__1is0fpy12 simple-one simple-two"`,
    );
    expect(
      definedStringBaseArray.classNames.variants.variant.simple,
    ).toMatchInlineSnapshot(`"homemadeRecipe_variant_simple__1is0fpy12"`);
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
        "homemadeRecipe__1is0fpy1",
        "homemadeRecipe_spaceWithDefault_large__1is0fpy3",
        "homemadeRecipe_spaceWithDefault_small__1is0fpy2",
        "homemadeRecipe_spaceWithoutDefault_large__1is0fpy5",
        "homemadeRecipe_spaceWithoutDefault_small__1is0fpy4",
        "homemadeRecipe_color_blue__1is0fpy7",
        "homemadeRecipe_color_red__1is0fpy6",
        "homemadeRecipe_rounded_true__1is0fpy8",
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
    ).toMatchInlineSnapshot(`"homemadeRecipe__1is0fpy1"`);
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
      `"homemadeRecipe__1is0fpy1 homemadeRecipe_spaceWithDefault_large__1is0fpy3 homemadeRecipe_spaceWithDefault_xs_small__1is0fpya homemadeRecipe_spaceWithoutDefault_small__1is0fpy4 homemadeRecipe_spaceWithoutDefault_md_large__1is0fpyk homemadeRecipe_color_blue__1is0fpy7 homemadeRecipe_color_xl_red__1is0fpys"`,
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
      `"homemadeRecipe__1is0fpy1 homemadeRecipe_spaceWithDefault_xs_small__1is0fpya homemadeRecipe_spaceWithoutDefault_md_large__1is0fpyk homemadeRecipe_color_xl_red__1is0fpys"`,
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
      `"homemadeRecipe__1is0fpy1 homemadeRecipe_spaceWithDefault_small__1is0fpy2 homemadeRecipe_color_red__1is0fpy6"`,
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
      `"homemadeRecipe__1is0fpyw definedStringBase homemadeRecipe_variant_xs_simple__1is0fpyy simple-one_xs"`,
    );
    expect(
      definedStringBase.classNames.responsiveVariants.xs.variant.simple,
    ).toMatchInlineSnapshot(
      `"homemadeRecipe_variant_xs_simple__1is0fpyy simple-one_xs"`,
    );
  });

  it("should include generated class name for provided array string classes (responsive)", () => {
    expect(
      definedStringBaseArray({ variant: { xs: "simple" } }),
    ).toMatchInlineSnapshot(
      `"homemadeRecipe__1is0fpy11 definedStringBaseInArray_1 definedStringBaseInArray_2 homemadeRecipe_variant_xs_simple__1is0fpy13 simple-one_xs simple-two_xs"`,
    );
    expect(
      definedStringBaseArray.classNames.responsiveVariants.xs.variant.simple,
    ).toMatchInlineSnapshot(
      `"homemadeRecipe_variant_xs_simple__1is0fpy13 simple-one_xs simple-two_xs"`,
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
        "homemadeRecipe_spaceWithDefault_large__1is0fpy3",
        "homemadeRecipe_spaceWithDefault_small__1is0fpy2",
        "homemadeRecipe_spaceWithoutDefault_large__1is0fpy5",
        "homemadeRecipe_spaceWithoutDefault_small__1is0fpy4",
        "homemadeRecipe_color_blue__1is0fpy7",
        "homemadeRecipe_color_red__1is0fpy6",
        "homemadeRecipe_rounded_true__1is0fpy8",
        "homemadeRecipe_spaceWithDefault_xs_large__1is0fpyb",
        "homemadeRecipe_spaceWithDefault_xs_small__1is0fpya",
        "homemadeRecipe_spaceWithoutDefault_xs_large__1is0fpyd",
        "homemadeRecipe_spaceWithoutDefault_xs_small__1is0fpyc",
        "homemadeRecipe_color_xs_blue__1is0fpyf",
        "homemadeRecipe_color_xs_red__1is0fpye",
        "homemadeRecipe_rounded_xs_true__1is0fpyg",
        "homemadeRecipe_spaceWithDefault_md_large__1is0fpyi",
        "homemadeRecipe_spaceWithDefault_md_small__1is0fpyh",
        "homemadeRecipe_spaceWithoutDefault_md_large__1is0fpyk",
        "homemadeRecipe_spaceWithoutDefault_md_small__1is0fpyj",
        "homemadeRecipe_color_md_blue__1is0fpym",
        "homemadeRecipe_color_md_red__1is0fpyl",
        "homemadeRecipe_rounded_md_true__1is0fpyn",
        "homemadeRecipe_spaceWithDefault_xl_large__1is0fpyp",
        "homemadeRecipe_spaceWithDefault_xl_small__1is0fpyo",
        "homemadeRecipe_spaceWithoutDefault_xl_large__1is0fpyr",
        "homemadeRecipe_spaceWithoutDefault_xl_small__1is0fpyq",
        "homemadeRecipe_color_xl_blue__1is0fpyt",
        "homemadeRecipe_color_xl_red__1is0fpys",
        "homemadeRecipe_rounded_xl_true__1is0fpyu",
      ]
    `);
  });
});

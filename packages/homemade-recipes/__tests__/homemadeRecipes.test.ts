import {
  basic,
  definedStringBase,
  definedStringBaseArray,
  empty,
} from "./homemadeRecipes.css";

describe("homemadeRecipes", () => {
  // existing tests https://github.com/vanilla-extract-css/vanilla-extract/blob/master/tests/recipes/recipes.test.ts

  it("should return default variants for no options", () => {
    expect(basic()).toMatchInlineSnapshot(
      `"homemadeRecipes__f9cdv90 homemadeRecipes_spaceWithDefault_small__f9cdv91"`,
    );
  });

  it("should return default variants for empty options", () => {
    expect(basic({})).toMatchInlineSnapshot(
      `"homemadeRecipes__f9cdv90 homemadeRecipes_spaceWithDefault_small__f9cdv91"`,
    );
  });

  it("should return default variants for undefined options", () => {
    expect(basic({ spaceWithDefault: undefined })).toMatchInlineSnapshot(
      `"homemadeRecipes__f9cdv90 homemadeRecipes_spaceWithDefault_small__f9cdv91"`,
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
      `"homemadeRecipes__f9cdv90 homemadeRecipes_spaceWithDefault_large__f9cdv92 homemadeRecipes_spaceWithoutDefault_small__f9cdv93 homemadeRecipes_color_blue__f9cdv96"`,
    );
  });

  it("should return requested compound variants", () => {
    expect(
      basic({ spaceWithDefault: "small", color: "red" }),
    ).toMatchInlineSnapshot(
      `"homemadeRecipes__f9cdv90 homemadeRecipes_spaceWithDefault_small__f9cdv91 homemadeRecipes_color_red__f9cdv95 homemadeRecipes_compound_0__f9cdv98"`,
    );
  });

  it("should return compound variants via defaultVariants", () => {
    expect(basic({ color: "red" })).toMatchInlineSnapshot(
      `"homemadeRecipes__f9cdv90 homemadeRecipes_spaceWithDefault_small__f9cdv91 homemadeRecipes_color_red__f9cdv95 homemadeRecipes_compound_0__f9cdv98"`,
    );
  });

  it("should return compound variants via defaultVariants, even when undefined is passed", () => {
    expect(
      basic({ color: "red", spaceWithDefault: undefined }),
    ).toMatchInlineSnapshot(
      `"homemadeRecipes__f9cdv90 homemadeRecipes_spaceWithDefault_small__f9cdv91 homemadeRecipes_color_red__f9cdv95 homemadeRecipes_compound_0__f9cdv98"`,
    );
  });

  it("should return boolean variants", () => {
    expect(basic({ rounded: true })).toMatchInlineSnapshot(
      `"homemadeRecipes__f9cdv90 homemadeRecipes_spaceWithDefault_small__f9cdv91 homemadeRecipes_rounded_true__f9cdv97"`,
    );
  });

  it("should ignore missing boolean variants", () => {
    expect(basic({ rounded: false })).toMatchInlineSnapshot(
      `"homemadeRecipes__f9cdv90 homemadeRecipes_spaceWithDefault_small__f9cdv91"`,
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
    expect(empty()).toMatchInlineSnapshot(`"homemadeRecipes__f9cdv9u"`);
    expect(empty.classNames.base).toMatchInlineSnapshot(
      `"homemadeRecipes__f9cdv9u"`,
    );
    expect(empty()).toStrictEqual(empty.classNames.base);
  });

  it("should include generated base class name for provided string classes", () => {
    expect(definedStringBase()).toMatchInlineSnapshot(
      `"homemadeRecipes__f9cdv9v definedStringBase"`,
    );
    expect(definedStringBase.classNames.base).toMatchInlineSnapshot(
      `"homemadeRecipes__f9cdv9v"`,
    );

    expect(definedStringBase({ variant: "simple" })).toMatchInlineSnapshot(
      `"homemadeRecipes__f9cdv9v definedStringBase homemadeRecipes_variant_simple__f9cdv9w simple-one"`,
    );
    expect(
      definedStringBase.classNames.variants.variant.simple,
    ).toMatchInlineSnapshot(`"homemadeRecipes_variant_simple__f9cdv9w"`);
  });

  it("should include generated base class name for provided array string classes", () => {
    expect(definedStringBaseArray()).toMatchInlineSnapshot(
      `"homemadeRecipes__f9cdv910 definedStringBaseInArray_1 definedStringBaseInArray_2"`,
    );
    expect(definedStringBaseArray.classNames.base).toMatchInlineSnapshot(
      `"homemadeRecipes__f9cdv910"`,
    );

    expect(definedStringBaseArray({ variant: "simple" })).toMatchInlineSnapshot(
      `"homemadeRecipes__f9cdv910 definedStringBaseInArray_1 definedStringBaseInArray_2 homemadeRecipes_variant_simple__f9cdv911 simple-one simple-two"`,
    );
    expect(
      definedStringBaseArray.classNames.variants.variant.simple,
    ).toMatchInlineSnapshot(`"homemadeRecipes_variant_simple__f9cdv911"`);
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
        "homemadeRecipes__f9cdv90",
        "homemadeRecipes_spaceWithDefault_large__f9cdv92",
        "homemadeRecipes_spaceWithDefault_small__f9cdv91",
        "homemadeRecipes_spaceWithoutDefault_large__f9cdv94",
        "homemadeRecipes_spaceWithoutDefault_small__f9cdv93",
        "homemadeRecipes_color_blue__f9cdv96",
        "homemadeRecipes_color_red__f9cdv95",
        "homemadeRecipes_rounded_true__f9cdv97",
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
    ).toMatchInlineSnapshot(`"homemadeRecipes__f9cdv90"`);
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
      `"homemadeRecipes__f9cdv90 homemadeRecipes_spaceWithDefault_large__f9cdv92 homemadeRecipes_spaceWithDefault_xs_small__f9cdv99 homemadeRecipes_spaceWithoutDefault_small__f9cdv93 homemadeRecipes_spaceWithoutDefault_md_large__f9cdv9j homemadeRecipes_color_blue__f9cdv96 homemadeRecipes_color_xl_red__f9cdv9r"`,
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
      `"homemadeRecipes__f9cdv90 homemadeRecipes_spaceWithDefault_xs_small__f9cdv99 homemadeRecipes_spaceWithoutDefault_md_large__f9cdv9j homemadeRecipes_color_xl_red__f9cdv9r"`,
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
      `"homemadeRecipes__f9cdv90 homemadeRecipes_spaceWithDefault_small__f9cdv91 homemadeRecipes_color_red__f9cdv95"`,
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
        "homemadeRecipes_spaceWithDefault_large__f9cdv92",
        "homemadeRecipes_spaceWithDefault_small__f9cdv91",
        "homemadeRecipes_spaceWithoutDefault_large__f9cdv94",
        "homemadeRecipes_spaceWithoutDefault_small__f9cdv93",
        "homemadeRecipes_color_blue__f9cdv96",
        "homemadeRecipes_color_red__f9cdv95",
        "homemadeRecipes_rounded_true__f9cdv97",
        "homemadeRecipes_spaceWithDefault_xs_large__f9cdv9a",
        "homemadeRecipes_spaceWithDefault_xs_small__f9cdv99",
        "homemadeRecipes_spaceWithoutDefault_xs_large__f9cdv9c",
        "homemadeRecipes_spaceWithoutDefault_xs_small__f9cdv9b",
        "homemadeRecipes_color_xs_blue__f9cdv9e",
        "homemadeRecipes_color_xs_red__f9cdv9d",
        "homemadeRecipes_rounded_xs_true__f9cdv9f",
        "homemadeRecipes_spaceWithDefault_md_large__f9cdv9h",
        "homemadeRecipes_spaceWithDefault_md_small__f9cdv9g",
        "homemadeRecipes_spaceWithoutDefault_md_large__f9cdv9j",
        "homemadeRecipes_spaceWithoutDefault_md_small__f9cdv9i",
        "homemadeRecipes_color_md_blue__f9cdv9l",
        "homemadeRecipes_color_md_red__f9cdv9k",
        "homemadeRecipes_rounded_md_true__f9cdv9m",
        "homemadeRecipes_spaceWithDefault_xl_large__f9cdv9o",
        "homemadeRecipes_spaceWithDefault_xl_small__f9cdv9n",
        "homemadeRecipes_spaceWithoutDefault_xl_large__f9cdv9q",
        "homemadeRecipes_spaceWithoutDefault_xl_small__f9cdv9p",
        "homemadeRecipes_color_xl_blue__f9cdv9s",
        "homemadeRecipes_color_xl_red__f9cdv9r",
        "homemadeRecipes_rounded_xl_true__f9cdv9t",
      ]
    `);
  });
});

import {
  basic,
  // definedStringBase,
  // definedStringBaseArray,
  empty,
} from "./homemadeRecipes.css";

// TODO: pass commented out test

describe("homemadeRecipes", () => {
  // existing tests https://github.com/vanilla-extract-css/vanilla-extract/blob/master/tests/recipes/recipes.test.ts

  it("should return default variants for no options", () => {
    expect(basic()).toMatchInlineSnapshot(
      `"homemadeRecipes__ou4f9a0 homemadeRecipes_spaceWithDefault_small__ou4f9a1"`,
    );
  });

  it("should return default variants for empty options", () => {
    expect(basic({})).toMatchInlineSnapshot(
      `"homemadeRecipes__ou4f9a0 homemadeRecipes_spaceWithDefault_small__ou4f9a1"`,
    );
  });

  it("should return default variants for undefined options", () => {
    expect(basic({ spaceWithDefault: undefined })).toMatchInlineSnapshot(
      `"homemadeRecipes__ou4f9a0 homemadeRecipes_spaceWithDefault_small__ou4f9a1"`,
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
      `"homemadeRecipes__ou4f9a0 homemadeRecipes_spaceWithDefault_large__ou4f9a2 homemadeRecipes_spaceWithoutDefault_small__ou4f9a3 homemadeRecipes_color_blue__ou4f9a6"`,
    );
  });

  it("should return requested compound variants", () => {
    expect(
      basic({ spaceWithDefault: "small", color: "red" }),
    ).toMatchInlineSnapshot(
      `"homemadeRecipes__ou4f9a0 homemadeRecipes_spaceWithDefault_small__ou4f9a1 homemadeRecipes_color_red__ou4f9a5 homemadeRecipes_compound_0__ou4f9a8"`,
    );
  });

  it("should return compound variants via defaultVariants", () => {
    expect(basic({ color: "red" })).toMatchInlineSnapshot(
      `"homemadeRecipes__ou4f9a0 homemadeRecipes_spaceWithDefault_small__ou4f9a1 homemadeRecipes_color_red__ou4f9a5 homemadeRecipes_compound_0__ou4f9a8"`,
    );
  });

  it("should return compound variants via defaultVariants, even when undefined is passed", () => {
    expect(
      basic({ color: "red", spaceWithDefault: undefined }),
    ).toMatchInlineSnapshot(
      `"homemadeRecipes__ou4f9a0 homemadeRecipes_spaceWithDefault_small__ou4f9a1 homemadeRecipes_color_red__ou4f9a5 homemadeRecipes_compound_0__ou4f9a8"`,
    );
  });

  it("should return boolean variants", () => {
    expect(basic({ rounded: true })).toMatchInlineSnapshot(
      `"homemadeRecipes__ou4f9a0 homemadeRecipes_spaceWithDefault_small__ou4f9a1 homemadeRecipes_rounded_true__ou4f9a7"`,
    );
  });

  it("should ignore missing boolean variants", () => {
    expect(basic({ rounded: false })).toMatchInlineSnapshot(
      `"homemadeRecipes__ou4f9a0 homemadeRecipes_spaceWithDefault_small__ou4f9a1"`,
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
    expect(empty()).toMatchInlineSnapshot(`"homemadeRecipes__ou4f9au"`);
    expect(empty.classNames.base).toMatchInlineSnapshot(
      `"homemadeRecipes__ou4f9au"`,
    );
    expect(empty()).toStrictEqual(empty.classNames.base);
  });

  // it("should include generated base class name for provided string classes", () => {
  //   expect(definedStringBase()).toMatchInlineSnapshot(
  //     `"homemadeRecipes__ou4f9a15 definedStringBase"`,
  //   );
  //   expect(definedStringBase.classNames.base).toMatchInlineSnapshot(
  //     `"homemadeRecipes__ou4f9a15"`,
  //   );

  //   expect(definedStringBase({ variant: "simple" })).toMatchInlineSnapshot(
  //     `"homemadeRecipes__ou4f9a15 definedStringBase homemadeRecipes_variant_simple__ou4f9a16 simple-one"`,
  //   );
  //   expect(
  //     definedStringBase.classNames.variants.variant.simple,
  //   ).toMatchInlineSnapshot(`"homemadeRecipes_variant_simple__ou4f9a16"`);
  // });

  // it("should include generated base class name for provided array string classes", () => {
  //   expect(definedStringBaseArray()).toMatchInlineSnapshot(
  //     `"homemadeRecipes__ou4f9a1a definedStringBaseInArray_1 definedStringBaseInArray_2"`,
  //   );
  //   expect(definedStringBaseArray.classNames.base).toMatchInlineSnapshot(
  //     `"homemadeRecipes__ou4f9a1a"`,
  //   );

  //   expect(definedStringBaseArray({ variant: "simple" })).toMatchInlineSnapshot(
  //     `"homemadeRecipes__ou4f9a1a definedStringBaseInArray_1 definedStringBaseInArray_2 homemadeRecipes_variant_simple__ou4f9a1b simple-one simple-two"`,
  //   );
  //   expect(
  //     definedStringBaseArray.classNames.variants.variant.simple,
  //   ).toMatchInlineSnapshot(`"homemadeRecipes_variant_simple__ou4f9a1b"`);
  // });

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
        "homemadeRecipes__ou4f9a0",
        "homemadeRecipes_spaceWithDefault_large__ou4f9a2",
        "homemadeRecipes_spaceWithDefault_small__ou4f9a1",
        "homemadeRecipes_spaceWithoutDefault_large__ou4f9a4",
        "homemadeRecipes_spaceWithoutDefault_small__ou4f9a3",
        "homemadeRecipes_color_blue__ou4f9a6",
        "homemadeRecipes_color_red__ou4f9a5",
        "homemadeRecipes_rounded_true__ou4f9a7",
      ]
    `);
  });

  // additional tests

  it("should return default variants for empty conditional options", () => {
    expect(
      basic({
        spaceWithDefault: {},
        spaceWithoutDefault: {},
        color: {},
        rounded: {},
      }),
    ).toMatchInlineSnapshot(
      `"homemadeRecipes__ou4f9a0 homemadeRecipes_spaceWithDefault_small__ou4f9a1"`,
    );
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
      `"homemadeRecipes__ou4f9a0 homemadeRecipes_spaceWithDefault_large__ou4f9a2 homemadeRecipes_spaceWithDefault_small_xs__ou4f9a9 homemadeRecipes_spaceWithoutDefault_small__ou4f9a3 homemadeRecipes_spaceWithoutDefault_large_md__ou4f9aj homemadeRecipes_color_blue__ou4f9a6 homemadeRecipes_color_red_xl__ou4f9ar"`,
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
      `"homemadeRecipes__ou4f9a0 homemadeRecipes_spaceWithDefault_small_xs__ou4f9a9 homemadeRecipes_spaceWithoutDefault_large_md__ou4f9aj homemadeRecipes_color_red_xl__ou4f9ar"`,
    );
  });

  it("should return no compound variants", () => {
    expect(
      basic({
        spaceWithDefault: { initial: "small" },
        color: { initial: "red" },
      }),
    ).toMatchInlineSnapshot(
      `"homemadeRecipes__ou4f9a0 homemadeRecipes_spaceWithDefault_small__ou4f9a1 homemadeRecipes_color_red__ou4f9a5"`,
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

  // it("should include generated base class name for condition provided string classes", () => {
  //   //   expect(
  //   //     definedStringBase({ variant: { initial: "simple", xs: "simple" } }),
  //   //   ).toMatchInlineSnapshot(
  //   //     `"homemadeRecipes__ou4f9a15 definedStringBase homemadeRecipes_variant_simple__ou4f9aw simple-one"`,
  //   //   );
  //   //   expect(
  //   //     definedStringBase.classNames.responsiveVariants.initial.variant.simple,
  //   //   ).toMatchInlineSnapshot(`"homemadeRecipes_variant_simple__ou4f9aw"`);
  //   expect(
  //     definedStringBase.classNames.responsiveVariants.xs.variant.simple,
  //   ).toMatchInlineSnapshot(`"homemadeRecipes_variant_simple_xs__ou4f9a17"`);
  // });

  // it("should include generated base class name for condition provided array string classes", () => {
  //   //   expect(definedStringBaseArray({ variant: "simple" })).toMatchInlineSnapshot(
  //   //     `"homemadeRecipes__ou4f9a1a definedStringBaseInArray_1 definedStringBaseInArray_2 homemadeRecipes_variant_simple__ou4f9a1b simple-one simple-two"`,
  //   //   );
  //   //   expect(
  //   //     definedStringBaseArray.classNames.responsiveVariants.initial.variant
  //   //       .simple,
  //   //   ).toMatchInlineSnapshot(`"homemadeRecipes_variant_simple__ou4f9a11"`);
  //   expect(
  //     definedStringBaseArray.classNames.responsiveVariants.xs.variant.simple,
  //   ).toMatchInlineSnapshot(`"homemadeRecipes_variant_simple_xs__ou4f9a1c"`);
  // });

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
        "homemadeRecipes_spaceWithDefault_large__ou4f9a2",
        "homemadeRecipes_spaceWithDefault_small__ou4f9a1",
        "homemadeRecipes_spaceWithoutDefault_large__ou4f9a4",
        "homemadeRecipes_spaceWithoutDefault_small__ou4f9a3",
        "homemadeRecipes_color_blue__ou4f9a6",
        "homemadeRecipes_color_red__ou4f9a5",
        "homemadeRecipes_rounded_true__ou4f9a7",
        "homemadeRecipes_spaceWithDefault_large_xs__ou4f9aa",
        "homemadeRecipes_spaceWithDefault_small_xs__ou4f9a9",
        "homemadeRecipes_spaceWithoutDefault_large_xs__ou4f9ac",
        "homemadeRecipes_spaceWithoutDefault_small_xs__ou4f9ab",
        "homemadeRecipes_color_blue_xs__ou4f9ae",
        "homemadeRecipes_color_red_xs__ou4f9ad",
        "homemadeRecipes_rounded_true_xs__ou4f9af",
        "homemadeRecipes_spaceWithDefault_large_md__ou4f9ah",
        "homemadeRecipes_spaceWithDefault_small_md__ou4f9ag",
        "homemadeRecipes_spaceWithoutDefault_large_md__ou4f9aj",
        "homemadeRecipes_spaceWithoutDefault_small_md__ou4f9ai",
        "homemadeRecipes_color_blue_md__ou4f9al",
        "homemadeRecipes_color_red_md__ou4f9ak",
        "homemadeRecipes_rounded_true_md__ou4f9am",
        "homemadeRecipes_spaceWithDefault_large_xl__ou4f9ao",
        "homemadeRecipes_spaceWithDefault_small_xl__ou4f9an",
        "homemadeRecipes_spaceWithoutDefault_large_xl__ou4f9aq",
        "homemadeRecipes_spaceWithoutDefault_small_xl__ou4f9ap",
        "homemadeRecipes_color_blue_xl__ou4f9as",
        "homemadeRecipes_color_red_xl__ou4f9ar",
        "homemadeRecipes_rounded_true_xl__ou4f9at",
      ]
    `);
  });
});

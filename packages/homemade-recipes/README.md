# Homemade Recipes

An extension of `@vanilla-extract/recipes` that adds responsive variants.

[![Tests](https://github.com/timkinsman/homemade-recipes/actions/workflows/tests.yml/badge.svg)](https://github.com/timkinsman/homemade-recipes/actions)
[![npm version](https://img.shields.io/npm/v/homemade-recipes.svg)](https://www.npmjs.com/package/homemade-recipes)
[![license: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Homemade Recipes is built for projects that need responsive styling with recipes while keeping Vanilla Extract's type safety approach.

## Disclaimer :warning:

This repository is currently under active development. It may contain bugs and have unexpected behavior. Feedback and reporting bugs by opening an issue would be greatly appreciated! :pray:

## Installation

```sh
npm install homemade-recipes
```

## Configuration

### Setup

`createHomemadeRecipe` accepts key/value pairs where the keys become your responsive modifiers, and the values are the min-width where that breakpoint should start.

```ts
// homemade-recipe.css.ts
import { createHomemadeRecipe } from "homemade-recipes";

export const homemadeRecipe = createHomemadeRecipe({
  /** Phones (landscape) */
  xs: "520px",
  /** Tablets (portrait) */
  sm: "768px",
  /** Tablets (landscape) */
  md: "1024px",
  /** Laptops */
  lg: "1280px",
  /** Desktops */
  xl: "1640px",
});
```

`homemadeRecipe` extends [recipe](https://vanilla-extract.style/documentation/packages/recipes/#recipe) that accepts an optional `responsiveVariants`.

```ts
// button-recipe.css.ts
import { HomemadeRecipeVariants } from "homemade-recipes";
import { homemadeRecipe } from "./homemade-recipe.css";

export const buttonRecipe = homemadeRecipe({
  base: {
    borderRadius: 6,
  },

  variants: {
    fullWidth: {
      true: {
        width: "100%",
      },
      false: {
        width: "unset",
      },
    },
    variant: {
      bright: "bright",
    },
  },

  responsiveVariants: ["sm"],
});

export type ButtonVariants = NonNullable<
  HomemadeRecipeVariants<typeof buttonRecipe>
>;
```

> `responsiveVariants: ["sm"]` will generate an additional set of classes at build time.

```css
.button-recipe__4lwr860 {
  border-radius: 6px;
}
.button-recipe_fullWidth_true__4lwr861 {
  width: 100%;
}
.button-recipe_fullWidth_false__4lwr862 {
  width: unset;
}
+ @media screen and (min-width: 768px) {
+   .button-recipe_fullWidth_sm_true__4lwr863 {
+     width: 100%;
+   }
+   .button-recipe_fullWidth_sm_false__4lwr864 {
+     width: unset;
+   }
+ }
```

[appendCss](./src/sheet.ts#L69) will generate.

```html
<style
  data-package="homemade-recipes"
  data-identifier="homemade-recipe__1qtsqlc0"
  type="text/css"
>
  @media screen and (min-width: 768px) {
    .bright_sm {
      color: orange;
      font-family: Arial;
    }
  }
</style>
```

> By passing in an existing class (i.e. [bright](/apps/vite/src/index.css#L70)), `bright_sm` can now be created.

With this homemade recipe, you can now use it for your button component.

```tsx
// button.tsx
import { ButtonVariants, buttonRecipe } from "./button-recipe.css";

type ButtonProps = ButtonVariants;

export const Button = ({ fullWidth, variant }: ButtonProps) => {
  return (
    <button className={buttonRecipe({ fullWidth, variant })}>
      Hello world
    </button>
  );
};
```

### Usage

```tsx
// App.tsx
import "./App.css";
import { Button } from "./button";

function App() {
  return (
    <Button
      // fullWidth?: boolean | { initial?: boolean; sm?: boolean; }
      fullWidth={{ initial: true, sm: false }}
      // variant?: "bright" | { initial?: "bright"; sm?: "bright"; }
      variant={{ sm: "bright" }}
    />
  );
}

export default App;
```

The following CSS classes will be applied to your `Button` component.

```
button-recipe__1d33wle0 button-recipe_fullWidth_true__1d33wle1 button-recipe_fullWidth_sm_false__1d33wle5 bright_sm
```

```css
.button-recipe__4lwr860 {
  border-radius: 6px;
}

.button-recipe_fullWidth_true__4lwr861 {
  width: 100%;
}

@media screen and (min-width: 768px) {
  .button-recipe_fullWidth_sm_false__4lwr864 {
    width: unset;
  }
}

@media screen and (min-width: 768px) {
  .bright_sm {
    color: orange;
    font-family: Arial;
  }
}
```

[Check out the example.](/apps/vite/)

## More examples

- [Stand-alone UI package.](/packages/ui)
- [Next.js 15 (app router) consuming UI package.](/apps/next/)

## Contributing

Contributions are welcome! Here's how you can help:

- Report bugs by opening an issue
- Suggest new features or improvements
- Submit pull requests

## Thanks

- [Vanilla Extract](https://vanilla-extract.style/) - For creating an awesome library
- [Tailwind Variants](https://www.tailwind-variants.org) - For the inspiration behind `responsiveVariants` functionality ([discontinued](https://www.tailwind-variants.org/docs/tailwind-v4#breaking-changes))
- [Rainbow Sprinkles](https://github.com/wayfair/rainbow-sprinkles) & [Dessert Box](https://github.com/TheMightyPenguin/dessert-box) - For inspiration on extending Vanilla Extract

## License

Distributed under the MIT License. See `LICENSE` for more information.

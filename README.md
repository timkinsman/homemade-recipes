# Homemade Recipes

[![Tests](https://github.com/timkinsman/homemade-recipes/actions/workflows/tests.yml/badge.svg)](https://github.com/timkinsman/homemade-recipes/actions)
[![npm version](https://img.shields.io/npm/v/homemade-recipes.svg)](https://www.npmjs.com/package/homemade-recipes)
[![License](https://img.shields.io/github/license/yourusername/homemade-recipes.svg)](https://github.com/timkinsman/homemade-recipes/blob/main/LICENSE)

An extension of `@vanilla-extract/recipes` that adds responsive variant utilities.

Built for projects that need responsive styling while keeping vanilla-extract's type safety and zero-runtime approach.
A

## Installation

```sh
npm install homemade-recipes
```

## Configuration

### Setup

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
        width: "initial",
      },
    },
  },

  responsiveVariants: ["sm"],
});

export type ButtonVariants = NonNullable<
  HomemadeRecipeVariants<typeof buttonRecipe>
>;
```

### Usage

```tsx
// button.tsx
import { ButtonVariants, buttonRecipe } from "./button-recipe.css";

type ButtonProps = ButtonVariants;

export const Button = ({ fullWidth }: ButtonProps) => {
  return <button className={buttonRecipe({ fullWidth })}>Hello world</button>;
};
```

```tsx
// App.tsx
import "./App.css";
import { Button } from "./button";

function App() {
  return <Button fullWidth={{ initial: true, sm: false }} />;
}

export default App;
```

## Contributing

Contributions are welcome! Here's how you can help:

- Report bugs by opening an issue
- Suggest new features or improvements
- Submit pull requests

## Thanks

- [Vanilla Extract](https://vanilla-extract.style/) - For creating an awesome library
- [Tailwind Variants](https://www.tailwind-variants.org) - For the inspiration behind `responsiveVariants` functionality ([discontinued](https://www.tailwind-variants.org/docs/tailwind-v4#breaking-changes))
- [Rainbow Sprinkles](https://github.com/wayfair/rainbow-sprinkles) & [Dessert Box](https://github.com/themmayo/dessert-box) - For inspiration on extending vanilla-extract

## License

Distributed under the MIT License. See `LICENSE` for more information.

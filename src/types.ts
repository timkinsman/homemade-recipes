import type { ComplexStyleRule } from "@vanilla-extract/css";

type Resolve<T> = {
  [Key in keyof T]: T[Key];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

type RecipeStyleRule = ComplexStyleRule | string;

export type VariantDefinitions = Record<string, RecipeStyleRule>;

export type ConditionNames = (string | number | symbol)[];

type BooleanMap<T> = T extends "true" | "false" ? boolean : T;

export type VariantGroups = Record<string, VariantDefinitions>;

export type VariantSelection<
  Variants extends VariantGroups,
  Conditions extends ConditionNames,
> = {
  [VariantGroup in keyof Variants]?:
    | BooleanMap<keyof Variants[VariantGroup]>
    | undefined
    | ({ initial: keyof Variants[VariantGroup] } & {
        [C in Conditions[number]]: keyof Variants[VariantGroup];
      });
};

export type VariantsClassNames<Variants extends VariantGroups> = {
  [P in keyof Variants]: {
    [PP in keyof Variants[P]]: string;
  };
};

export type ConditionVariants<
  Variants extends VariantGroups,
  Conditions extends ConditionNames,
> = { initial: VariantsClassNames<Variants> } & {
  [C in Conditions[number]]: VariantsClassNames<Variants>;
};

export type PatternResult<
  Variants extends VariantGroups,
  Conditions extends ConditionNames,
> = {
  defaultClassName: string;
  variantClassNames: VariantsClassNames<Variants>;
  defaultVariants: VariantSelection<Variants, Conditions>;
  compoundVariants: Array<[VariantSelection<Variants, Conditions>, string]>;
  conditionVariants: ConditionVariants<Variants, Conditions>;
  conditionNames: Conditions;
};

export interface CompoundVariant<
  Variants extends VariantGroups,
  Conditions extends ConditionNames,
> {
  variants: VariantSelection<Variants, Conditions>;
  style: RecipeStyleRule;
}

export type BaseConditions = { [conditionName: string]: string };

export type PatternOptions<
  Variants extends VariantGroups,
  Conditions extends ConditionNames,
> = {
  base?: RecipeStyleRule;
  variants?: Variants;
  defaultVariants?: VariantSelection<Variants, Conditions>;
  compoundVariants?: Array<CompoundVariant<Variants, Conditions>>;
  conditionVariants?: Conditions;
};

export type RecipeClassNames<
  Variants extends VariantGroups,
  Conditions extends ConditionNames,
> = {
  base: string;
  variants: VariantsClassNames<Variants>;
  conditionVariants: ConditionVariants<Variants, Conditions>;
};

export type RuntimeFn<
  Variants extends VariantGroups,
  Conditions extends ConditionNames,
> = ((options?: Resolve<VariantSelection<Variants, Conditions>>) => string) & {
  variants: () => (keyof Variants)[];
  classNames: RecipeClassNames<Variants, Conditions>;
  conditions: () => ConditionNames;
};

export type RecipeVariants<
  RecipeFn extends RuntimeFn<VariantGroups, ConditionNames>,
> = Resolve<Parameters<RecipeFn>[0]>;

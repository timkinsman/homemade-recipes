# homemade-recipes

## 0.1.3

### Patch Changes

- 943a737: chore: updated README
- b36a056: refactor: removed support for responsive compounds. AFAIA stitches doesn't allow this
- 943a737: fix: allow 'initial' conditional to be optional; compounds dependant on conditional choices (now removed)

## 0.1.2

### Patch Changes

- 07aa9a9: fix: support responsive compounds

## 0.1.1

### Patch Changes

- afb054a: fix: wrap initial and conditional variants in BooleanMap
- afb054a: fix: allow all responsive variants besides 'initial' to be optional during runtime
- afb054a: chore(tests): ported over vanilla-extract/recipes tests; added responsive tests
- afb054a: fix: allow non-existent variant classes (e.g. boolean variants not having a false condition)
- afb054a: refactor: lock down conditions to just responsive conditions

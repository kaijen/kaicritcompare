# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

kaicritcompare is a VS Code extension that diffs two files and emits a single
CriticMarkup document describing how file 1 (original) becomes file 2 (modified).
It is the diff-*generating* companion to [kaicrit](https://github.com/kaijen/kaicrit),
which *reviews* CriticMarkup. Match kaicrit's conventions when extending this
project: English docs, table-driven README, TypeScript with no runtime
dependencies, publisher `0x2e6b6169`, VS Code engine `^1.85.0`, `.vsix`
distribution via GitHub Releases.

## Commands

```sh
npm install        # install dev deps (@types/vscode, @types/node, typescript)
npm run compile    # tsc -p ./  →  emits to out/
npm run watch      # incremental recompile
npm test           # compile, then `node --test out/*.test.js`
```

Tests use Node's built-in runner (`node:test`); the `*.test.ts` files live in
`src/` and compile alongside the sources (they are excluded from the packaged
`.vsix` via `.vscodeignore`). The diff/render code is pure (no `vscode`
imports), so the suite exercises it directly — most importantly the
reconstruction invariant (see below). The glob `out/*.test.js` is deliberate:
`node --test out/` resolves the directory as a module on newer Node versions.

To debug interactively, press **F5** (the "Run Extension" launch config compiles
first, then opens an Extension Development Host).

Docs are an MkDocs Material site under `docs/` (`mkdocs.yml` is the config),
matching kaicrit. Preview locally with `pip install mkdocs-material mike` then
`mkdocs serve`. On a `v*` tag, `.github/workflows/docs.yml` deploys a versioned
build to the `gh-pages` branch via `mike`, and `build.yml` packages the `.vsix`
and attaches it to the GitHub Release.

## Architecture

A one-directional pipeline, split so the algorithm stays free of editor APIs:

- `src/diff.ts` — **pure**, no `vscode`. `tokenize()` splits text at the chosen
  granularity (`character` / `word` / `line`), `myers()` computes the shortest
  edit script (Myers O(ND)), and `diff()` coalesces per-token edits into runs
  and optionally merges adjacent delete+insert into `replace` ops.
- `src/criticmarkup.ts` — **pure**. Renders the `DiffOp[]` into CriticMarkup
  markers (`{--del--}`, `{++ins++}`, `{~~old~>new~~}`).
- `src/compare.ts` — the only place that touches files/settings: reads two URIs
  via `workspace.openTextDocument`, runs the pipeline, opens the result.
- `src/extension.ts` — command registration and UX (open dialogs, Explorer
  "select for compare" two-step, two-file multi-selection).

Data flow: `URIs → openTextDocument → diff() → DiffOp[] → render() → untitled doc`.

## The invariant that must not break

Every change to the diff/render code must preserve the reconstruction invariant
(this is what makes the output round-trip with kaicrit's accept/reject):

- Concatenating `equal` + `delete` + `replace.before` text == **file 1**.
- Concatenating `equal` + `insert` + `replace.after` text == **file 2**.

This holds because `tokenize()` preserves whitespace as its own tokens, so token
concatenation is lossless at every granularity. When adding granularities or
output forms, keep that lossless property and re-check the invariant (the
`node -e` test pattern above checks both directions).

## Gotchas

- CriticMarkup has no escape mechanism. Source files that literally contain
  marker delimiters (e.g. `--}` or `~>`) can produce ambiguous output; this is a
  known limitation, not a bug to "fix" by mangling content.
- Myers emits deletions before insertions on a diagonal, so substitution
  merging in `diff()` only needs to handle the delete→insert ordering as the
  common case (the insert→delete branch is defensive).
- Explorer multi-select order: VS Code passes the second command argument as the
  selected `Uri[]`; `compareSelected` treats `selection[0]` as file 1 and
  `selection[1]` as file 2.

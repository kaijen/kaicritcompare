# Usage

| Action                              | How                                                                 |
| ----------------------------------- | ------------------------------------------------------------------- |
| Compare two arbitrary files         | Command Palette → **kaicritcompare: Compare Two Files → CriticMarkup** |
| Compare the open file with another  | Command Palette → **kaicritcompare: Compare Active File With…**      |
| Two-step compare from the Explorer  | Right-click file 1 → **Select for CriticMarkup Compare**, then right-click file 2 → **Compare with Selected → CriticMarkup** |
| Compare two selected files          | Select two files in the Explorer → right-click → **Compare Selected Files → CriticMarkup** |

The generated CriticMarkup opens in a new untitled editor; save it wherever you like. No default keybindings are bound, to avoid colliding with kaicrit's `Alt+K` commands.

## Configuration

| Setting                              | Default | Description                                                                 |
| ------------------------------------ | ------- | --------------------------------------------------------------------------- |
| `kaicritcompare.granularity`         | `word`  | Diff unit: `character`, `word` (whitespace-preserving), or `line`.          |
| `kaicritcompare.combineSubstitutions`| `true`  | Merge an adjacent deletion + addition into one `{~~old~>new~~}` substitution. |
| `kaicritcompare.outputLanguage`      | `auto`  | Language mode for the result: `auto` (match file 2), `plaintext`, or `markdown`. |

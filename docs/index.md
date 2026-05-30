# kaicritcompare — CriticMarkup Diff for VS Code

kaicritcompare compares two files and generates a single [CriticMarkup](https://github.com/CriticMarkup/CriticMarkup-toolkit) document describing how the **first** file (the original) would become the **second** file (the modified version).

It is the diff-generating companion to [kaicrit](https://github.com/kaijen/kaicrit): kaicritcompare *produces* the change markers, kaicrit *reviews* them.

## What is CriticMarkup?

[CriticMarkup](https://github.com/CriticMarkup/CriticMarkup-toolkit) is a "plain-text standard for tracking changes and inline comments" that "works in any text file using simple bracket syntax." The [full specification](https://github.com/CriticMarkup/CriticMarkup-toolkit/blob/master/README.md) is maintained in the CriticMarkup-toolkit repository on GitHub.

## Accept / Reject Semantics

The generated document upholds a strict reconstruction invariant that mirrors kaicrit:

- **Reject every marker → file 1** (the original is restored).
- **Accept every marker → file 2** (the modified file is restored).

Unchanged text passes through verbatim, so concatenating the document always reproduces one of the two source files exactly.

## About

Made by [0x2e6b6169](https://blog.0x2e6b6169.de). Source on [GitHub](https://github.com/kaijen/kaicritcompare).

## Installation

Download the latest `kaicritcompare-*.vsix` from the [Releases page](https://github.com/kaijen/kaicritcompare/releases), then install it:

```bash
code --install-extension kaicritcompare-*.vsix
```

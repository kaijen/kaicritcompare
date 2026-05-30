# Changelog

## 0.1.0

- Initial release.
- Compare two files and generate a CriticMarkup document describing how file 1
  becomes file 2.
- Commands: compare two files, compare the active file with another, and
  Explorer-based two-step / two-selection compare.
- Configurable diff granularity (character / word / line), optional
  substitution merging, and output language mode.
- Myers O(ND) diff with a reconstruction invariant: rejecting all markers
  restores file 1, accepting all markers restores file 2.

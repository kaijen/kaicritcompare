// Renders diff operations into CriticMarkup.
//
// CriticMarkup markers (same set kaicrit understands):
//   Deletion      {--text--}
//   Addition      {++text++}
//   Substitution  {~~old~>new~~}
//   Highlight     {==text==}        (not produced here)
//   Comment       {>>text<<}        (not produced here)

import { DiffOp } from './diff';

/** Convert a list of diff operations into a CriticMarkup string. */
export function render(ops: DiffOp[]): string {
  let out = '';
  for (const op of ops) {
    switch (op.type) {
      case 'equal':
        out += op.text;
        break;
      case 'delete':
        if (op.text.length > 0) {
          out += `{--${op.text}--}`;
        }
        break;
      case 'insert':
        if (op.text.length > 0) {
          out += `{++${op.text}++}`;
        }
        break;
      case 'replace':
        out += `{~~${op.before}~>${op.after}~~}`;
        break;
    }
  }
  return out;
}

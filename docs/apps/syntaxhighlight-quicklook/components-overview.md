# SyntaxHighlightQuickLook Components Overview

Core extension units:

- `PreviewViewController`: Quick Look entry point and preview lifecycle.
- `PreviewModel`: typed input model for rendered text + detected content type.
- `EditorView`: SwiftUI rendering surface for line-wrapped highlighted text.
- `SyntaxHighlighter` (`TokenKind.swift`): tokenization/highlighting engine for supported languages.

## Supported Parsing Focus

- Swift
- JSON
- Markdown
- YAML
- JavaScript
- Plain text fallback

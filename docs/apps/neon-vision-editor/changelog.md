---
head:
  - - meta
    - property: og:image
      content: https://apps-h3p.com/media/neon/neon-v1.4-hero.webp
  - - meta
    - name: twitter:image
      content: https://apps-h3p.com/media/neon/neon-v1.4-hero.webp
---

# Neon Vision Editor Changelog

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on August 16, 2026._

## v1.4.6 (published August 16, 2026)

Release link: [GitHub Release v1.4.6](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v1.4.6)

- Gives Finder Quick Look previews meaningful syntax colors across more supported languages and file types.
- Keeps compact Finder previews focused on content while retaining navigation controls in the full Quick Look window.
- Makes Markdown preview controls clearer, consistently aligned, and easier to identify.
- Adds dedicated Quick Look highlighting for SQL, TeX, configuration files, strings files, delimited data, logs, notebooks, Dockerfiles, and Makefiles.
- Adds a post-release documentation workflow that waits for publication to settle, repairs release drift, validates the result, and creates a signed update when needed.
- Prevents supported Quick Look languages from falling back to mostly one-color plain text.
- Preserves correct token ranges for Unicode text containing embedded CSS or JavaScript.
- Hides Markdown controls and branding in compact Finder previews without removing them from the expanded Quick Look experience.
- Replaces loosely aligned icon-only Markdown actions with an aligned Preview, Source, and Contents control group.

## v1.4.5 (published August 16, 2026)

Release link: [GitHub Release v1.4.5](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v1.4.5)

- Keeps the macOS virtual editor writable across its full width after changing sidebars or Markdown preview.
- Restores line wrapping immediately when the editor viewport changes.
- Preserves fast tab switching while correcting viewport reflow.
- Makes the active editor viewport width authoritative for virtual-row layout and fragment caching.
- Prevents virtual rows from being cached using the canvas's previous width during preview and sidebar transitions.
- Stops overlay scrollbars from reserving an uneditable strip inside the editor viewport.
- Invalidates cached row fragments when their wrapping width or wrap mode no longer matches the active viewport.

## v1.4.4 (published August 15, 2026)

Release link: [GitHub Release v1.4.4](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v1.4.4)

- Makes the on-screen keyboard accessory reliable for touch editing on iPhone and iPad.
- Adds small editor commands that make sharing locations and cleaning lists faster.
- Preserves line wrapping through preview and sidebar layout transitions.
- Adds configurable Save, Find, Undo, and Redo actions before bracket tokens above the on-screen keyboard.
- Adds Copy Current Editor Reference and Sort & Deduplicate Lines commands.
- Restores the keyboard accessory when the software keyboard is visible, including Simulator sessions where a keyboard controller is also present.
- Prevents macOS virtual-editor width measurements from disabling line wrapping after preview or sidebar transitions.
- Keeps the table-of-contents sidebar layout transition from leaving the editor at a stale width.

## v1.4.3 (published August 15, 2026)

Release link: [GitHub Release v1.4.3](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v1.4.3)

- Keeps macOS editing stable while changing workspace and Brain Dump layouts.
- Makes Markdown preview actions easier to reach without crowding the main toolbar.
- Preserves full-width line wrapping while sidebars and split previews change.
- Moves Markdown preview export and style actions into the split preview header.
- Adds a dedicated Markdown Cards button to the Standard and Writing toolbar presets.
- Prevents preview-divider resizing from feeding geometry changes back into the editor while dragging.
- Restores the virtual editor's usable width after sidebar, preview, and workspace changes.
- Prevents the first editor row from drawing beneath the tab bar.
- Prevents Brain Dump from collapsing open-document text into one-character columns.

## v1.4.2 (published August 15, 2026)

Release link: [GitHub Release v1.4.2](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v1.4.2)

- Makes detached Markdown previews easier to read over the desktop while preserving a transparent glass appearance.
- Keeps macOS editor, sidebar, and preview surfaces visually consistent when translucency is enabled or disabled.
- Aligns build metadata across every app target for reliable Xcode Cloud archives.
- Adds a light frosted-glass layer to detached Markdown previews and Finder Quick Look Markdown previews.
- Uses the selected translucent window mode consistently across editor-related macOS surfaces.
- Uses ultra-thin material for macOS sidebars when window translucency is disabled.
- Prevents the editor canvas from reverting to a white background when translucency is disabled.
- Prevents vertical seams between editor panes in translucent mode and restores reliable line wrapping after tab or preview changes.
- Keeps app, extension, widget, App Clip, and Watch targets on one build number.

## v1.4.1 (published August 14, 2026)

Release link: [GitHub Release v1.4.1](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v1.4.1)

- Keeps the macOS editor responsive while navigating and editing file-backed documents.
- Makes compact iPhone editor controls and document outlines easier to scan.
- Improves project navigation, structured-text workflows, and Quick Look reliability.
- Uses a bounded macOS virtual editor with viewport-aware editing, selection, and scrolling for file-backed documents.
- Adds project-sidebar expansion persistence, lazy directory loading, adjustable text size, and improved overlay scrollers.
- Adds Typst templates and a safe plain-text-to-JSON structuring workflow.
- Keeps every named iPhone and iPad toolbar-preset action directly reachable in the horizontal toolbar.
- Adds pinch-to-zoom sizing for project-sidebar file items.
- Shows concise language labels such as `MD`, `JS`, and `TS` in the iPhone toolbar while preserving full picker and VoiceOver names.
- Adds subtle spacing between compact table-of-contents entries without loosening their indentation or content layout.

## v1.4.0 (published August 12, 2026)

Release link: [GitHub Release v1.4.0](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v1.4.0)

- Keeps large documents editable with a file-backed document model and bounded live editor virtualization.
- Removes full-document compatibility work from the per-edit path for responsive large-file editing.
- Restores reliable content installation when opening ordinary files such as the changelog.
- Adds bounded viewport loading, scrolling, editing, generation checks, and caret/selection preservation for large files.
- Applies UTF-16 editor mutations directly through the active document viewport instead of copying the whole document for each edit.
- Preserves encoding, line-ending, external-change, and atomic-save behavior across file-backed edits.
- Fixes ordinary documents opening with an empty macOS editor while the outline still showed their content.
- Prevents bounded viewport scrolling from double-counting the absolute document position.
- Preserves selections and caret positions when a live viewport is replaced.
## v1.2.5 (published August 7, 2026)

Release link: [GitHub Release v1.2.5](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v1.2.5)

- Keeps generated and minified source files responsive by avoiding unnecessary full-document regex highlighting.
- Preserves fast, viewport-scoped syntax coloring for large JSON, HTML, and CSV documents.
- Makes large-file behavior easier to control with clear generated-file highlighting options.
- Adds Automatic, Full, and Off generated-file syntax highlighting modes.
- Detects common generated-source markers and very long minified lines with a bounded prefix scan.
- Extends the large-file benchmark and performance contract with HTML and minified JavaScript fixtures.
- Updates the app icon for the iOS, iPadOS, and macOS 27 Liquid Glass appearance, including the revised iOS 26 shared presentation. Thanks to [@LegalizeNukes](https://github.com/LegalizeNukes) for the new icon design.
- Stops stale or expensive syntax passes from being scheduled for likely generated JavaScript and similar source files.
- Keeps macOS and iOS syntax-highlight caches stable when generated-file highlighting is intentionally suppressed.

## v0.4.22 (published February 16, 2026)

Release link: [GitHub Release v0.4.22](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.4.22)

- Added shared syntax-regex compilation cache across highlight passes on macOS and iOS.
- Improved large-document responsiveness by avoiding full regex reprocessing on caret-only moves.
- Improved iOS line-number gutter performance by caching line-count driven rendering paths.
- Fixed macOS ruler hot-path overhead with cached UTF-16 line-start indexing and logarithmic lookup.

## v0.4.21 (published February 16, 2026)

Release link: [GitHub Release v0.4.21](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.4.21)

- Added curated popular themes including Dracula, One Dark Pro, Nord, Tokyo Night, and Gruvbox.
- Improved direct-distribution updater flow with in-app download, verification, and staged install.
- Improved updater safety by constraining install actions to direct-distribution macOS builds.
- Fixed Main Thread Checker violations around `NSTextView` string and selection snapshots.
- Fixed Neon Glow token mapping for intended palette readability.

## v1.0.0 milestone context

- App is available on [App Store](https://apps.apple.com/de/app/neon-vision-editor/id6758950965) with preview builds via [TestFlight](https://testflight.apple.com/join/YWB2fGAP).
- Core launch scope included macOS, iPadOS, and iOS platform parity with native implementation.

## Related Pages

- [Overview](/apps/neon-vision-editor/overview)
- [Launch Story](/apps/neon-vision-editor/launch-story)
- [Features](/apps/neon-vision-editor/features)
- [Gallery](/apps/neon-vision-editor/gallery)
- [Known Issues](/apps/neon-vision-editor/known-issues)
- [FAQ](/apps/neon-vision-editor/faq)

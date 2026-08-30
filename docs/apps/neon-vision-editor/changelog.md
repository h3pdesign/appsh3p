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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on August 29, 2026._

## v1.5.6 (published August 29, 2026)

Release link: [GitHub Release v1.5.6](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v1.5.6)

- Makes the iPhone and iPad editor toolbar more compact and language-aware without hiding full menu names or accessibility context.
- Restores predictable Markdown list continuation and native text-selection commands across mobile and macOS editors.
- Keeps collapsed and expanded Markdown formatting controls readable without wasting editor space or covering actions.
- Uses icon-only mobile toolbar presets and language-specific symbols or initials for the current document language.
- Adds a horizontally scrollable mobile Markdown formatting row while keeping the collapsed control in a compact opaque pill over a transparent surrounding area.
- Treats explicit language choices as tab-level overrides so automatic detection does not immediately replace the user's selection.
- Makes Settings and Help toolbar visibility follow their configured switches in standard, all-actions, and custom presets.
- Increments ordered Markdown markers such as `1.` to `2.` and `9)` to `10)` when continuing lists, including in the macOS virtual editor.
- Restores the system edit menu for caret-only interactions so Select and Select All remain available while preserving snapshot actions for selected ranges.
- Prevents editor characters from bleeding through the collapsed Markdown formatting pill and keeps the expanded action row reachable by horizontal scrolling.

## v1.5.5 (published August 29, 2026)

Release link: [GitHub Release v1.5.5](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v1.5.5)

- Prevents AppKit and Core Text drawing from leaking text state between macOS virtual-editor rows and producing mirrored or upside-down glyphs.
- Makes Apple Pencil a precision iPad editing input with hover caret preview and direct range selection.
- Keeps Markdown live-preview text at the exact resolved editor font size on every supported platform.
- Makes the release regression suite more reliable while parallel performance, filesystem, and PTY tests compete for resources.
- Draws every virtual-editor line through an isolated Core Text boundary that derives coordinates from the canvas and restores inherited text state.
- Uses Pencil-only hover and drag recognizers for caret preview and range selection, with side tap or squeeze undo that respects system shortcut preferences.
- Strengthens cross-platform preview-size coverage and asynchronous release-test deadlines.
- Stops line-number, wrapped-row, and marked-text drawing from contaminating subsequent Core Text matrix and position state.
- Removes the stale macOS regression expectation for the retired `0.96` Markdown preview scale.
- Prevents false external-refresh and terminal-session failures during heavily parallelized test runs.

## v1.5.4 (published August 27, 2026)

Release link: [GitHub Release v1.5.4](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v1.5.4)

- Restores access to every wrapped source row in the macOS editor after project-sidebar or preview width changes.
- Keeps the final document lines reachable at both narrow and wide editor widths.
- Preserves responsive virtual-editor layout without performing unbounded full-document measurement.
- Measures a bounded, distributed sample of wrapped rows when calculating the virtual canvas scroll extent.
- Uses exact row accounting for fully loaded documents and immediate expansion when wrapping increases.
- Prevents the macOS editor from stopping before the document's final lines when the project sidebar or preview narrows the source pane.
- Recalculates cached row geometry after sidebar width transitions without reintroducing unbounded layout work.

## v1.5.3 (published August 27, 2026)

Release link: [GitHub Release v1.5.3](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v1.5.3)

- Makes large-file editing and scrolling more responsive across macOS, iOS, and iPadOS.
- Reduces unnecessary editor, project, preview, and session-state refreshes during routine interaction.
- Adds a distraction-free focus mode while improving editor selection, project-row clarity, and accessibility context.
- Caches macOS viewport render snapshots and incrementally prepares syntax-highlighted lines outside the draw path.
- Adds revision-aware iOS line metadata, no-wrap width caching, and bounded formatting for large documents.
- Adds focused SwiftUI observation snapshots, preview reload measurements, and CI-exported performance results.
- Adds Focus Mode to hide secondary editor chrome without changing the open document or workspace state.
- Prevents the editor canvas from taking focus merely because it moved into a window.
- Improves editor accessibility with document, line, column, selection, and read-only context.
- Splits the root observer composition so supported public Xcode releases can type-check it reliably.

## v1.5.2 (published August 22, 2026)

Release link: [GitHub Release v1.5.2](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v1.5.2)

- Keeps Markdown preview body text at the same effective base size as the editor while font zoom changes.
- Adds measurable large-document performance coverage before further virtual-renderer changes.
- Improves editor rendering efficiency by caching resolved syntax colors for each configured theme.
- Adds 100,000-line benchmarks for typing, scrolling, selection, and viewport reload latency.
- Adds Time Profiler and Animation Hitches capture support with readable baseline trace bundles.
- Adds visual regression coverage for light and dark translucent and opaque editor surfaces.
- Removes the macOS preview's hidden 0.96 font-size reduction so preview text no longer drifts smaller than the editor.
- Removes an unreachable duplicate Warm Sepia toolbar theme mapping that produced a compiler warning.

## v1.5.1 (published August 21, 2026)

Release link: [GitHub Release v1.5.1](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v1.5.1)

- Makes Markdown preview themes more vivid, differentiated, and reliable in both light and dark mode.
- Improves project-folder opening and stabilizes the Sparkle update dependency.
- Keeps live preview and exported Markdown styling aligned across supported appearances.
- Adds distinct Plasma and Deep Ocean palettes and strengthens High Contrast, Warm Sepia, Nordic Light, Article, Notebook, Terminal Notes, and Developer Slate.
- Adds Ember Glow, Forest Canopy, Ultraviolet, Cobalt, and Mint Paper for a broader set of vivid, differentiated preview styles.
- Adds theme-specific heading accents, semantic color tokens, richer Markdown component styling, and live-preview/export CSS parity.
- Keeps legacy theme identifiers compatible while preventing visible theme palette collisions.
- Separates Neon Editorial and Nordic Light from default palette fallbacks in the affected appearance modes.
- Adds regression coverage for theme uniqueness, vivid component styling, image captions, and export parity.
- Pins Sparkle to a reproducible `2.9.5` package version to avoid missing package-product resolution.

## v1.5.0 (published August 20, 2026)

Release link: [GitHub Release v1.5.0](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v1.5.0)

- Makes the macOS virtual editor more dependable for selection, keyboard navigation, and tab closing.
- Restores complete editor theme customization, including canvas, text, cursor, selection, and gutter colors.
- Adds a polished code-snapshot workflow with more themes and export sizes for sharing source excerpts.
- Adds ten code-snapshot themes, gradient and transparent backgrounds, configurable window details, typography, padding, corners, and responsive export sizes.
- Adds an opaque editor canvas option for true theme backgrounds while retaining translucent sidebars and window chrome.
- Keeps the Markdown formatting toolbar available as a compact translucent control directly below the macOS tab bar.
- Aligns line numbers to the first visual row of wrapped content at every supported editor font size and line height.
- Makes Up and Down arrow navigation move the caret between visual rows, including wrapped text and viewport transitions.
- Routes Command-W from the editor to the selected tab and preserves the unsaved-changes confirmation instead of closing the window.
- Applies selected theme colors consistently to editor text, canvas, line numbers, caret, selection, marked text, and input-method text.
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

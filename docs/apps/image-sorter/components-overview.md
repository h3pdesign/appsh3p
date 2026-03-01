# Image Sorter Components Overview

Image Sorter is organized around a queue-based desktop workflow:

- `ImageSorterViewModel`: queue state, processing orchestration, filters, sort, and selection behavior.
- `ContentView`: main ingest/review interface, bulk actions, and progress surfaces.
- `LibraryWindowView`: secondary window for library browsing and preview.
- `ImageSorterServerClient`: optional API client for companion-server integration.
- `ImageMetadataStore`: metadata persistence for library state and diagnostics.

## Design Notes

- Prioritizes operator speed over decorative UI.
- Keeps batch actions explicit and reversible where possible.
- Uses diagnostics copy/export for issue investigation.

## Related Pages

- [Overview](/apps/image-sorter/overview)
- [Installation](/apps/image-sorter/installation)
- [Features](/apps/image-sorter/features)
- [Gallery](/apps/image-sorter/gallery)

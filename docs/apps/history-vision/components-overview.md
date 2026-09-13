# History Vision Components Overview

| Area | Responsibility |
| --- | --- |
| `ContentStore` | Loads the bundled catalogue, search results, recommendations, online daily content, and optional model output. |
| `HistoryDatabase` | Queries articles, editorial paragraphs, citations, claims, entities, artwork, events, and dense timeline aggregates from SQLite. |
| Discover | Presents featured reading, recommendations, recent activity, periods, and regions. |
| Library | Provides complete searchable catalogue access, saved/source filters, and compact article rows. |
| Article reader | Renders sections, facts, chronology, related entities, reading progress, notes, and source/licensing inspection. |
| Research | Coordinates local source retrieval, evidence summaries, and optional Apple Foundation Models assistance. |
| Timeline | Provides paged chronology, search and filters, comparison lanes, uncertainty semantics, and evidence-detail navigation. |
| Watch companion | Ships a compact offline catalogue and exchanges bounded reading-list snapshots with iPhone. |

## Content Model

The current SQLite catalogue includes 295 articles, 1,775 editorial paragraphs, 1,794 editorial citation links, 824 research sources, 2,280 structured claims, and 13,387 timeline records. Curated chronology and archived date mentions remain separate data classes.

## Source Boundaries

- A listed source establishes provenance, not independent historical verification.
- Model-generated text is labelled and cannot create citations or publication approval.
- Wikipedia and Wikidata material remains attributed as archive or fallback material.
- Further reading is not silently promoted to evidence.
- Missing structured data falls back to readable article and source views rather than decorative charts.

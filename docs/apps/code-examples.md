# Code Examples

Syntax highlighting on this page automatically adapts to light and dark mode.

## Neon Vision Editor (Swift)

```swift
import SwiftUI

struct EditorAppearance {
    static func resolvedBackground(for scheme: ColorScheme) -> Color {
        scheme == .dark ? Color(red: 0.05, green: 0.07, blue: 0.10)
                        : Color(red: 0.96, green: 0.98, blue: 1.0)
    }
}
```

## Metrics Data (Swift + Async/Await)

```swift
struct MetricPoint: Decodable {
    let date: String
    let value: Double
}

func loadMetrics(session: URLSession = .shared) async throws -> [MetricPoint] {
    let url = URL(string: "https://api.example.com/metrics?range=30d")!
    let (data, response) = try await session.data(from: url)
    guard let http = response as? HTTPURLResponse, http.statusCode == 200 else {
        throw URLError(.badServerResponse)
    }
    return try JSONDecoder().decode([MetricPoint].self, from: data)
}
```

## Release Assistant (Shell)

```bash
#!/usr/bin/env bash
set -euo pipefail

VERSION="${1:?usage: release.sh <version>}"

echo "Preflight for $VERSION"
scripts/ci/release_preflight.sh "$VERSION"

echo "Running notarized release"
scripts/run_selfhosted_notarized_release.sh "$VERSION"

echo "Done"
```

## X-Newsbook (Swift)

```swift
struct FeedSection: Identifiable {
    let id: UUID
    let title: String
    let stories: [StoryPreview]
}

func sortedSections(_ sections: [FeedSection]) -> [FeedSection] {
    sections.sorted { $0.title.localizedCaseInsensitiveCompare($1.title) == .orderedAscending }
}
```

## JSON Metadata Snippet

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Neon Vision Editor",
  "operatingSystem": "macOS, iPadOS, iOS",
  "softwareVersion": "0.4.23"
}
```

## Related Pages

- [All Apps](/apps/index)
- [Neon Vision Editor Overview](/apps/neon-vision-editor/overview)
- [Metrics Data Overview](/apps/metric-data/overview)
- [X-Newsbook Overview](/apps/x-newsbook/overview)
- [Release Assistant Overview](/apps/release-assistant/overview)

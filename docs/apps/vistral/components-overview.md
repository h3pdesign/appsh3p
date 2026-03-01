# Vistral Components Overview

Core structure inferred from project configuration and requirements:

- `Shared`: cross-platform models and shared logic.
- `Sources/iOS`, `Sources/macOS`, `Sources/tvOS`, `Sources/watchOS`, `Sources/visionOS`: platform-specific entry points.
- `Resources`: app assets, localized content, and StoreKit config.
- background refresh scheduling for dashboard recomputation.

## Data + Insight Flow

1. Import user data exports.
2. Normalize and store local records.
3. Compute derived metrics and correlations.
4. Render dashboard cards with source-aware context.

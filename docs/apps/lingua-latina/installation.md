# Lingua Latina Installation

## App Store

Install Lingua Latina from the [App Store](https://apps.apple.com/us/app/lingua-latina/id6767503541).

## Requirements

- Xcode
- iOS, iPadOS, and macOS runtime targets
- Optional local database at `Resources/Data/lingua_latina.sqlite`

## Local Setup

1. Open `Lingua Latina.xcodeproj`.
2. Build either `LinguaLatina macOS` or `LinguaLatina iOS`.
3. Launch the app and validate dictionary, grammar, study, and settings flows.

## Database Builds

If `Resources/Data/lingua_latina.sqlite` is present, the project copies it into the app bundle as a read-only offline dictionary database.

If the database is absent, the app still builds and falls back to AI-supported sentence questions where available.

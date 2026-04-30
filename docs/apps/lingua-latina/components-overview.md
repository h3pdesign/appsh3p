# Lingua Latina Components Overview

## App Shell

- `LinguaLatinaApp`
- `AppContainer`
- `AppRouter`
- `AppEnvironment`
- `AppLanguage`

## Core Features

- Home dashboard
- Dictionary search and word detail
- Grammar list and detail
- Study deck list, deck detail, and study session
- Settings and data-source status

## Data Layer

- local dictionary and grammar repositories
- morphology analyzer
- bundled Latin database loader
- study repository
- Keychain-backed settings for optional provider credentials

## AI Layer

- Apple Intelligence provider
- optional OpenAI provider
- optional local OpenAI-compatible provider path
- no-provider fallback

# Liquid Record Changelog

## 1.1.1 (build 74) - 2026-10-27 (App Store)

- Requests 48 kHz for the built-in microphone and other non-USB inputs in device-native recording mode; USB interfaces retain their own rate.
- Shows the app version and build under Support and uses the built-in microphone's display name in Information and Projects.
- Reduces full-console redraws during recording and playback for smoother iPad and iPhone Duo performance.
- Limits the Full Access launch offer to at most once per day and tightens iPad landscape control spacing.
- Adds no new capabilities, entitlements, or privacy changes.

## 1.0.4 - 2026-10-26 (App Store)

- Added upright unfolded iPhone Duo side-panel support, with playhead notes and marker renaming.
- Made transcription easier to start and find; summaries follow the transcript language and long transcripts are handled more reliably.
- Added readable take names, improved status-card behavior at larger text sizes, and App Store offer-code redemption.

## October project release: 1.1.0 (build 71)

Version 1.1.0 was a project milestone; the public App Store release is 1.1.1 (build 74), documented above.

- Reduced unnecessary status-card and side-panel redraws during recording and playback.
- Improved audio input handling, microphone naming, take-duration visibility, and support version/build information.
- Refined the iPad landscape layout and the daily cadence of the startup offer.
- Continued reliability and release-preparation work across recording, playback, and transcription.

## 1.0.3 - 2026-10-24

### App Store Release

- Added full-screen iPhone Duo support in folded and unfolded layouts.
- Added an unfolded side panel for markers, notes, the full waveform, recent takes, levels, loudness, and the episode plan.
- Expanded landscape layouts on iPad and the unfolded iPhone Duo.

## 1.0.2 - October 2026

- Added background recording, additional color themes, transport and headphone controls, remaining-time estimates, session splitting, LUFS/true-peak readings, and resizable iPad layouts.

## 1.0.1 - 2026-08-09

### Documentation and Requirements

- Current docs added to the H3P apps site from the authoritative component-based requirements.
- Version synchronized from the local Xcode project and `project.yml`.
- Public docs now cover console scope, audio behavior, file storage, privacy, accessibility, and validation expectations.

## Current App Scope

- iPhone field-recorder console.
- Local WAV recording with AVAudioEngine.
- SwiftData recording metadata.
- Markers, timed notes, playback, scrubbing, library management, and export.
- Offline-first operation with no account requirement.

## Related Pages

- [Overview](/apps/liquid-record/overview)
- [Installation](/apps/liquid-record/installation)
- [Features](/apps/liquid-record/features)
- [Known Issues](/apps/liquid-record/known-issues)
- [FAQ](/apps/liquid-record/faq)

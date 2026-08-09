# Liquid Record Features

## Main Console

- Full-width waveform timeline with ruler, playhead, progress, and markers.
- Illuminated recorder display for filename, elapsed time, route, battery/storage, and state.
- Gain control and L/R meters with peak/RMS dBFS presentation.
- Separate Stop and REC/PAUSE controls.
- Large transport dial for play/pause and scrub.
- Lower utility controls for markers, mixer detail, waveform scale, notes, info, and lock.

## Recording and Playback

- Explicit recording states: idle, requesting permission, recording, paused, finalizing, and failed.
- WAV recording through AVAudioEngine.
- Playback through a finalized-file playback controller.
- Marker navigation, timeline seeking, and circular scrub control.
- Recoverable finalization and interruption handling requirements.

## Files and Data

- SwiftData metadata for recordings, markers, and timed notes.
- User-created recordings stored in `Documents/Liquid Record/Recordings/`.
- Durable derived metadata and waveform cache in Application Support.
- Export staging in temporary storage only.

## Accessibility

- Minimum 44-by-44 point targets.
- VoiceOver labels, values, and states for primary actions.
- Adjustable alternatives for dial and gain controls.
- Support for Dynamic Type, Bold Text, Increased Contrast, Reduce Transparency, Reduce Motion, Voice Control, and right-to-left layouts.

## Related Pages

- [Overview](/apps/liquid-record/overview)
- [Components Overview](/apps/liquid-record/components-overview)
- [Installation](/apps/liquid-record/installation)
- [Gallery](/apps/liquid-record/gallery)
- [Known Issues](/apps/liquid-record/known-issues)
- [FAQ](/apps/liquid-record/faq)
- [Privacy Policy](/apps/liquid-record/privacy-policy)

# Liquid Record Components Overview

| Area | Responsibility |
| --- | --- |
| Console shell | Hosts the recorder display, waveform timeline, meters, transport, lock, and utility controls. |
| Audio session coordinator | Handles permission, route changes, interruptions, media-services resets, and session activation. |
| Recorder engine | Captures microphone input through AVAudioEngine and writes WAV files. |
| Playback controller | Plays finalized recordings, supports seek/scrub, and synchronizes playhead state. |
| Recording store | Persists SwiftData metadata and coordinates durable file operations. |
| Waveform cache | Generates and updates down-sampled peaks for recording and playback views. |
| Library and panels | Handles library search, rename, duplicate, delete, export, system settings, effects, notes, and info. |

## Data Model

```text
Recording
  id, title, createdAt, duration, state, fileURL, formatDescription,
  sampleRate, channelCount, byteCount, waveformVersion, inputRouteName

Marker
  id, recordingID, time, label

TimedNote
  id, recordingID, time, text
```

## Related Pages

- [Overview](/apps/liquid-record/overview)
- [Features](/apps/liquid-record/features)
- [Installation](/apps/liquid-record/installation)
- [Privacy Policy](/apps/liquid-record/privacy-policy)

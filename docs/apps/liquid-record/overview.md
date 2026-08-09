---
head:
  - - meta
    - property: og:image
      content: https://apps-h3p.com/media/liquid-record/reference-console.png
  - - meta
    - name: twitter:image
      content: https://apps-h3p.com/media/liquid-record/reference-console.png
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://apps-h3p.com/#organization","name":"H3P","url":"https://apps-h3p.com","sameAs":["https://github.com/h3pdesign"]},{"@type":"SoftwareApplication","@id":"https://apps-h3p.com/apps/liquid-record/overview#app","name":"Liquid Record","applicationCategory":"MultimediaApplication","operatingSystem":"iOS","url":"https://apps-h3p.com/apps/liquid-record/overview","softwareVersion":"1.0.1","isAccessibleForFree":true,"publisher":{"@id":"https://apps-h3p.com/#organization"}}]}'
---

# Liquid Record

<div class="overview-status-pill overview-status-private">Status: Private alpha</div>

<p class="overview-last-updated">Last updated: <span data-date="2026-08-09">August 9, 2026</span></p>

<div class="overview-platform-badges overview-reveal" aria-label="supported platforms">
  <span>iOS</span>
</div>

<div class="overview-mini-stats overview-reveal" aria-label="app stats">
  <div><span>latest version</span><strong>1.0.1 (build 2)</strong></div>
  <div><span>platforms</span><strong>iPhone</strong></div>
  <div><span>repo status</span><strong>private</strong></div>
</div>

<div class="overview-hero overview-app-release overview-reveal">
  <div class="overview-hero-copy">
    <p>Liquid Record is an iPhone audio-recording app shaped around a dense field-recorder console: timeline, meters, record controls, transport dial, markers, notes, playback, and export stay on one primary surface.</p>
  </div>
  <div class="overview-hero-media">
    <img src="/icons/liquid-record.png?v=20260809-1" alt="Liquid Record icon" class="overview-app-icon" />
    <div class="overview-shot-frame">
      <img src="/media/liquid-record/reference-console.png" alt="Liquid Record reference console" class="overview-app-shot" />
    </div>
  </div>
</div>

## Application Purpose

Liquid Record is designed for local, offline WAV capture on iPhone. The app keeps recording, pause, stop, monitoring, playback, scrubbing, markers, notes, rename, export, and library management available without moving users into a separate recorder tab.

Primary user outcomes:

- record, pause, resume, finalize, and play WAV files from the main console
- monitor L/R levels, waveform progress, input route, and elapsed time
- add markers and time-coded notes while recording or reviewing
- rename, duplicate, delete, and export recordings from the library flow

## Current Scope

The authoritative local requirements target iPhone, iOS 17+, local files, SwiftData metadata, AVAudioEngine recording, and an offline-first workflow. Cloud sync, transcription, multitrack recording, and external-audio-interface routing are out of scope for v1.

## Related Pages

- [Components Overview](/apps/liquid-record/components-overview)
- [Installation](/apps/liquid-record/installation)
- [Features](/apps/liquid-record/features)
- [Gallery](/apps/liquid-record/gallery)
- [Changelog](/apps/liquid-record/changelog)
- [Known Issues](/apps/liquid-record/known-issues)
- [FAQ](/apps/liquid-record/faq)
- [Privacy Policy](/apps/liquid-record/privacy-policy)

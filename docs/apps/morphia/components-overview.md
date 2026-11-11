# Morphia Components Overview

## App Shell

- SwiftUI app entry, navigation, and dependency wiring
- Studio canvas view with mode picker, presets, palette picker, and toolbar
- Help and settings sheet with comfort options

## Simulation Core

- Metal device, command queue, and pipeline cache
- shared `Simulation` protocol for every mode (configure, step, render, touch, reset, snapshot)
- `MTKView`-based canvas that owns the frame loop and forwards touches
- shared post-process pass for glow, grain, and vignette
- seeded simulations so saved works can be reproduced

## Modes

- Coats: Gray-Scott reaction-diffusion compute kernel on ping-pong textures
- Murmuration: GPU boids with a spatial grid and trail accumulation texture
- Cephalopod Skin: chromatophore state texture with wave propagation, noise, and decay

## Content and Learning

- organism palettes converted to gradient lookup textures
- bundled "Why?" cards and per-mode guides

## Gallery and Export

- SwiftData metadata for saved works (mode, parameters, seed, palette, thumbnail)
- full-resolution PNG export
- time-lapse MP4 export with `AVAssetWriter`

## Store

- StoreKit 2 one-time, non-consumable "Morphia Studio" unlock with restore support

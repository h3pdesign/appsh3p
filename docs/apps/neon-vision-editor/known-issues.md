# Neon Vision Editor Known Issues

## UI Layout Differences Across Devices

Some interface elements can wrap differently depending on screen size and dynamic type settings.

Workaround:

- use default text size for most consistent parity checks
- verify behavior on your primary device before final workflows

## Beta and Stable Build Divergence

Behavior in [TestFlight](https://testflight.apple.com/join/YWB2fGAP) can differ from [App Store](https://apps.apple.com/de/app/neon-vision-editor/id6758950965) while fixes are being validated.

Workaround:

- confirm issue on latest stable build before reporting
- include build number when submitting feedback

## Very Large File Workloads

Extremely large files may require additional processing time during syntax classification.

Workaround:

- split very large files into smaller modules where practical
- reopen app after long editing sessions if memory pressure appears

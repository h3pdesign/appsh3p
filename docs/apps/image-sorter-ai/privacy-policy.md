# Privacy Policy for Image Sorter

_Last updated: November 10, 2026_

Image Sorter is a macOS app for reviewing and organizing images. It does not require an H3P account. Image analysis and file processing use local resources by default. Optional remote AI and companion-server features transfer data only when configured and enabled by the user.

## Data processed on your Mac

The app processes images and their file locations to create local Vision labels, recognized text, suggested names and categories, confidence values, review status, and output files. Settings, review-queue entries, undo history, and related analysis data may be stored in the app's local container or Application Support. Files are written to folders you select.

The app does not send images to an H3P-operated service. Local processing works without the companion server or remote AI providers.

## Optional remote AI providers

Remote AI is disabled by default. If you enable it and choose a provider, the app sends the analysis summary needed for your request to that provider. A separate image-sharing setting can send a resized image preview for visual recognition; the preview is sent without file metadata, but visible content in the image remains visible. Do not share images containing information you do not want the selected provider to receive.

Provider choices include OpenAI, Google Gemini, xAI Grok, Anthropic, OpenCode Go, and a custom compatible endpoint. Each provider processes requests under its own terms and privacy policy. Provider API tokens are stored in the macOS Keychain. OpenCode Go uses text summaries rather than image previews.

Apple's Vision and Apple Intelligence features use Apple's system frameworks. Apple's privacy terms apply to any system services involved.

## Optional companion server

Companion-server processing is available only in builds that include that feature. If you select it and configure a server, Image Sorter can upload the source image and processing fields to that server. The companion server stores images and related metadata in the storage configured by its operator. In server-only mode, the server uses filename rules rather than the selected AI provider.

The server URL and token are configured by you; the H3P website does not operate this server. The server operator controls access, retention, backups, and deletion. Use a trusted endpoint and TLS when connecting over a network. The server token is stored in the macOS Keychain.

## Purchases

Where purchases are enabled, the app uses Apple's StoreKit for the one-time Pro unlock and optional support purchase. Apple processes payment details and purchase records under its own terms. The app does not receive your payment-card details.

## Sharing and retention

Local queue, analysis, settings, and undo data remain on your Mac until removed through the app or by removing the app's local data. Output images you create in folders you selected are separate files and remain there until you delete them. Data sent to an AI provider or companion server is subject to that recipient's retention and deletion policies.

## Contact

For privacy requests or questions, use [Support and Feedback](/support/support-and-feedback).

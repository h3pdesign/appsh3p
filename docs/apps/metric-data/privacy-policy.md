# Metrics Data Privacy Policy

_Last updated: June 11, 2026_

Metrics Data is an analytics dashboard app for iOS, iPadOS, macOS, visionOS, and watchOS. This policy explains how Metrics Data handles app data and Google user data when you choose to connect a Google account.

## Google User Data

If you choose to connect your Google account, Metrics Data requests only the permissions needed to provide read-only analytics dashboards.

Requested Google scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/adsense.readonly`
- `openid`, `profile`, `email` for authentication and account identity

How we use this data:

- To display your own Google Analytics 4 and AdSense metrics in the app.
- To authenticate your session through Google Sign-In.
- To associate dashboard data with your account.

What we do not do:

- We do not modify your Google Analytics or AdSense data.
- We do not sell Google user data.
- We do not use Google user data for advertising purposes.

How we protect Google user data:

- Security procedures are in place to protect the confidentiality and integrity of Google user data accessed through Metrics Data.
- Google user data is transmitted only over encrypted HTTPS/TLS connections between the app and Google APIs.
- OAuth tokens and authentication credentials are stored securely on your device using Apple's Keychain services.
- Metrics Data is designed to process Google Analytics and AdSense data locally on your device for the dashboard features you request.
- Cached dashboard data, preferences, selected accounts, and widget snapshots are stored locally on your device or in the app group container used by Metrics Data widgets.
- We do not operate a separate developer-controlled analytics database for your Google Analytics or AdSense report data.
- Access to Google user data is limited to the app functionality you authorize. Humans do not access your Google user data except when required for security, legal compliance, or with your explicit consent.
- If support is requested, you should not send OAuth tokens, credentials, or private Analytics or AdSense report exports unless explicitly needed and agreed for troubleshooting.

Data retention and deletion:

- OAuth tokens and authentication credentials are stored securely on your device using Apple's Keychain services.
- You can disconnect your Google account at any time by signing out in the app or revoking access in your Google Account settings.
- Upon sign-out, locally stored credentials are removed, and API access can be granted again only through a new Google OAuth consent flow.

## Google Sign-In

Metrics Data uses Google Sign-In only for authentication and secure account access.

The app may access:

- Name
- Email address
- Google account identifier

This information is used solely for login functionality and account association.

## Analytics and AdSense Data

Metrics Data accesses Google Analytics and Google AdSense data in read-only mode.

The app does not:

- Create, edit, or delete Analytics or AdSense settings.
- Share Analytics or AdSense data externally.
- Use Analytics or AdSense data for advertising or profiling.

## Data Protection and Security Measures

We implement technical and organizational security measures designed to protect information against unauthorized access, disclosure, alteration, or destruction.

Security measures include:

- Encryption of data in transit using HTTPS/TLS.
- Secure local credential storage using Apple's Keychain services.
- Secure OAuth authentication provided by Google.
- Restricted administrative access to systems and infrastructure.
- Authentication and access controls for internal services.
- Regular software and infrastructure updates.
- Monitoring designed to detect unauthorized access or abuse.

Sensitive information is processed only for the intended functionality of the app and is never sold to third parties.

## Google APIs and Compliance

Metrics Data uses Google APIs in accordance with the Google API Services User Data Policy, including the Limited Use requirements where applicable.

Google user data obtained through restricted or sensitive scopes is used only to provide user-facing functionality within Metrics Data.

Metrics Data does not:

- Transfer Google user data to unauthorized third parties.
- Use Google user data for serving advertisements.
- Allow humans to read user data except when required for security, legal compliance, or explicit user consent.

## Local App Data

Metrics Data may store preferences, cached dashboard data, selected accounts, widget snapshots, and session state locally on your device.

## Network Requests

Metrics Data uses encrypted HTTPS connections to communicate with Google APIs only after explicit user authorization through the Google OAuth consent flow.

## No Ads or Tracking

Metrics Data does not sell user data, does not use Google user data for advertising, and does not include developer-operated advertising trackers.

## Contact

If you have questions about Google data handling, use [Support and Feedback](/support/support-and-feedback).

## Related Policies

- [Metrics Data on the App Store](https://apps.apple.com/us/app/metrics-data/id6758959570)
- [Site Privacy Policy](/policies/privacy-policy)
- [EU Cookie Notice](/policies/eu-cookie-notice)

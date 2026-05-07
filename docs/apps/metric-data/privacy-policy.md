# Metrics Data Privacy Policy

_Last updated: May 7, 2026_

Metrics Data is an analytics dashboard app for macOS, iPadOS, and iOS. This policy explains how Metrics Data handles app data and Google user data when you choose to connect a Google account.

## Google User Data

If you choose to connect your Google account, Metrics Data requests only the permissions needed to provide read-only analytics dashboards.

Requested Google scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/adsense.readonly`
- `openid`, `profile`, `email` for authentication and account identity

How we use this data:

- To display your own GA4 and/or AdSense metrics in the app, for example trends, totals, and dashboard cards.
- To authenticate your session and associate dashboard data with your account.

What we do not do:

- We do not modify your Google Analytics or AdSense configuration/data.
- We do not sell Google user data.
- We do not use Google user data for advertising purposes.

Data sharing:

- We do not share Google user data with third parties except as required to operate the Google APIs you explicitly authorize.

Data retention and deletion:

- OAuth tokens are stored securely on your device in Keychain.
- You can disconnect at any time by signing out in the app and/or revoking access in your Google Account security settings.
- Upon sign-out, the app removes local session credentials; API access can be re-granted only by a new consent flow.

## Local App Data

Metrics Data may store preferences, cached dashboard data, selected accounts, widget snapshots, and session state locally on your device or in the app group container used by its widgets.

This local data is used for app functionality, dashboard performance, and continuity across app surfaces.

## Network Requests

Metrics Data uses HTTPS requests to access Google APIs only after you explicitly authorize access through the Google OAuth consent flow.

## No Ads or Tracking

Metrics Data does not sell user data, does not use Google user data for advertising, and does not include developer-operated advertising trackers.

## Contact

If you have questions about Google data handling, use [Support and Feedback](/support/support-and-feedback).

## Related Policies

- [Site Privacy Policy](/policies/privacy-policy)
- [EU Cookie Notice](/policies/eu-cookie-notice)

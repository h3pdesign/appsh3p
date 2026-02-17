# Security and Trust

## Current status

No malware code is intentionally shipped in this documentation site or linked app docs.

If a browser, DNS resolver, or endpoint filter flags the domain, treat it as a reputation or configuration incident and verify each layer below.

## Quick external checks

Run these checks after any DNS or deployment change:

1. [Google Safe Browsing transparency report](https://transparencyreport.google.com/safe-browsing/search)
2. [VirusTotal URL scan](https://www.virustotal.com/gui/home/url)
3. [URLVoid](https://www.urlvoid.com/)
4. [Sucuri SiteCheck](https://sitecheck.sucuri.net/)

Check both apps-h3p.com and www.apps-h3p.com.

## Domain and TLS checklist

1. DNS A records for apex should point only to GitHub Pages IPs.
2. www should be CNAME to h3pdesign.github.io.
3. GitHub Pages custom domain should be set to apps-h3p.com.
4. HTTPS must be enabled and certificate valid for apex + www.
5. Avoid mixed content and avoid loading unknown third-party scripts.

## Security files

- /.well-known/security.txt
- /security.txt
- /robots.txt
- /sitemap.xml

## SEO and trust baseline

1. Canonical tags enabled.
2. Open Graph/Twitter metadata enabled.
3. XML sitemap generated on build.
4. Robots policy allows indexing of docs pages.
5. Per-app metadata and structured data present for core app docs.

## Private security contact

- GitHub Sponsors profile: [https://github.com/sponsors/h3pdesign](https://github.com/sponsors/h3pdesign)
- Patreon: [https://www.patreon.com/cw/h3p](https://www.patreon.com/cw/h3p)
- GitHub profile: [https://github.com/h3pdesign](https://github.com/h3pdesign)

If you report a security issue, include URL, timestamp, environment, and reproducible steps.

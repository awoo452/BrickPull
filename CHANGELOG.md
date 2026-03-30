# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.9] - 2026-03-30

### Changed
- Added a BrickPull-specific `.gitignore` to match the other apps.

## [0.0.8] - 2026-03-30

### Changed
- Simplified the theme selector so it stays usable and aligned with the CTA.

## [0.0.7] - 2026-03-30

### Changed
- Refined the control panel styling for a more polished layout.

## [0.0.6] - 2026-03-30

### Changed
- Moved theme filtering to a dropdown so the UI keeps a single action button.
- Removed the secondary retry button in favor of the primary action button.

## [0.0.5] - 2026-03-28

### Added
- Added theme selection for City, Minecraft, and Creator in the BrickPull UI.
- Added recent pull history chips with theme metadata.

### Changed
- Improved error handling for rate limits with a retry button and hint text.
- Simplified the hero subtitle.

## [0.0.4] - 2026-03-28

### Changed
- Improved error messaging with rate-limit hints and a retry button.
- Added recent pull history to the BrickPull UI.
- Simplified the hero subtitle copy.

## [0.0.3] - 2026-03-28

### Changed
- Updated the default LEGO API base URL to the production Heroku hostname.

## [0.0.2] - 2026-03-28

### Changed
- Switched the API proxy to call the Rails LEGO API instead of Rebrickable directly.

## [0.0.1] - 2026-03-28

### Added
- Initialized the BrickPull Next.js app.
- Built the one-button UI for fetching random LEGO sets.
- Added a server-side API proxy to Rebrickable.
- Documented local development and Amplify deployment.

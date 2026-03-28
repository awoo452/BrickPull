# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

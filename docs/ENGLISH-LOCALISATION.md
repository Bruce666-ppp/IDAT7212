# English localisation notes

All five HTML entries and their modules were localised: navigation, landing content, Patient, Coach, AI Dashboard, Assist Level, voice/M5 labels, game cues and summaries, Body Map forms, all four 3D modes and hotspot cards, pose-demo forms, chart labels, alerts, tooltips and JSON display strings. The inventory contained 687 Chinese display fragments. English voice input maps to the same actions and scene keys; original Chinese aliases remain internally compatible.

Original CSS, vendor code, GLB, firmware, simulation generators, state store and calculation implementation remain unchanged. Additional English-only display rules bound the mobile 3D corner panel and fit game dialog text/buttons without clipping. Original fonts, colours and base CSS files are retained. Original enums, storage namespaces and export schemas are retained. Upstream comments, development documents and internal test labels may still contain Chinese; they do not appear in the running interface.

The app's Training Game route retains its original entry card; the complete game is in `demo.html#demo`. Body Map records are local. A separately opened 3D tab reads the latest saved state after reload; no new real-time cross-tab transport was introduced.

## Media

- The existing English KneeUp wordmark is retained; its duplicate Chinese alias is clipped out.
- All 13 deck images have English SVG display editions. Existing English, illustrations, photos, numbers and technical geometry are retained; Chinese-only labels are translated and duplicate Chinese is removed. SVG text is editable.
- The hardware pipeline has an English SVG edition, preserving the distinction between physical bench evidence and planned integration.
- Four gallery images are genuine browser captures of the translated original website, with simulated-data labels. No UI was invented.
- The 55-second video retains 1× timing, 30 fps, original footage and the original AAC audio stream. Only the duplicate Chinese logo alias is removed.
- The linked three-minute release video has an English edition and captions. Original frames, cuts, graphics and hardware footage are retained beneath text-region overlays. Chinese synthetic narration is replaced by the installed Microsoft Zira Desktop English voice at its default rate, without speed/pitch changes or voice cloning. Its software screenshots are labelled historical, not current-site functions.
- An unused mould photograph has an English stationery-label edition; only the label was composited, leaving the technical evidence unchanged.
- QR codes target this owner's repository, with an alternate for `/kneeup-english/`.

Unlinked original media remain as provenance. The website references English editions. JSON manifests retain translation boxes, source hashes and editing methods. Small text in legacy screenshots retains the original compact layout; editable translation source is supplied.

## Verification boundaries

Numerical output comparisons, original unit suites, English voice-action checks, JavaScript parsing, resource-reference checks and browser tests are recorded in the delivery report. Camera/microphone permissions and actual Arduino, BLE or M5 hardware were not exercised. Browser speech availability varies. Video decoding and sampled visual/OCR checks do not constitute a full listening review of the synthetic narration.

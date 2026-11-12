# Browser verification — 12 November 2026

The actual translated source was served over HTTP and inspected in the in-app Chromium browser. All six app routes were checked for rendered Chinese text: zero Chinese characters were found in the website's own visible body text. Native browser controls follow the host browser's language and are outside the website copy.

| Area | Observed result |
| --- | --- |
| Landing and deck | English content, relative page links, local English media and slide lightbox work |
| Patient / Coach | Plan saved as 4×13 and read by Patient; restored to 3×12 at 40% support; all group filters work |
| AI Dashboard | Simulated values/charts update; three-second loss displays SIGNAL LOST and recovers |
| Assist Level | All five scenarios show the original baselines 10 / 25 / 35 / 30 / 20; cap and slew-rate text retained |
| Body Map | All seven forms open; self-report, load, English notes, Save and Cancel checked; test entry restored |
| 3D | Original model rendered; product, wearing, procedural inner anatomy and heat modes checked; saved 6/10 and load 7/10 read after refresh, with English hotspot detail |
| Game | Simulated input, charging/counting, inter-set continuation, pause/continue, self-report 4/10 pause, manual end, summary and restart checked; short plan completed 4/4 with score 700 and combo ×4 |
| JSON export | Download succeeded; schema version 1, all 20 exported session records retained simulated source labels; test self-report 4 retained |
| Pose laboratory | Local MP4 chooser/model pipeline completed and showed an English Session Report; this was a file-input smoke test, not a measurement-accuracy benchmark |
| Responsive display | Real 390px embedded viewports checked for landing, apps, 3D, demo and pose lab; page widths stayed within their viewports. English 3D labels and game dialogs were adjusted to fit. Final mobile summary fit a 252px track width and 400px height; card measured approximately 251×330px |
| Desktop summary | Final English card measured about 219px tall inside the original 236px track, with buttons visible |

The browser-wide viewport override did not take effect in this environment, so narrow-screen checks used actual iframe viewports. This checks CSS reflow but does not replace testing on physical mobile devices. Camera and microphone permissions, Web Speech recognition, live Arduino, BLE and M5 devices were not exercised. Numerical logic was verified separately against the immutable original source.

The separately opened 3D tab reads updated Body Map data after reload. No new real-time cross-tab synchronisation was introduced. The original game app route remains a link to the complete game in `demo.html#demo`.

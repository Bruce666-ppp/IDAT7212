# KneeUp — English Showcase

English localisation of the KneeUp project for HKU IDAT7212 Mechatronics System Engineering, Group 12, prepared for presentation and exhibition use.

This is a static HTML/CSS/ES-module website. No installation, build step, backend or API key is required for deployment. Three.js, Draco, Chart.js, MediaPipe runtime/model files and the original CAD GLB are included.

## Pages

| Entry | Contents |
| --- | --- |
| `index.html` | Project showcase, embedded apps and 3D, 13-slide deck, pipeline, English media and QR |
| `apps.html` | Patient, Coach, AI Dashboard, Assist Level, Training Game entry and Body Map |
| `3d.html` | Product, wearing relationship, procedural internal anatomy and heat-map modes |
| `demo.html#demo` | Full original training game and simulated/camera demo |
| `meniscus/index.html` | On-device pose demo, local video input and simulated secondary channel |

## Data and hardware

The web sensor demonstration uses **simulated data**. Real-time Arduino-to-website integration is **not implemented or validated**. BLE, Web Serial and M5 code are experimental interfaces, not evidence of a connected prototype. Camera pose estimation is a separate on-device input option; camera and microphone features require permission and supporting browser APIs.

Calculations, thresholds, scenario keys, storage namespaces, JSON schemas, simulated streams, game logic, CSS, vendor code, firmware and the CAD model are preserved. English speech commands map to the original parser's actions. Localisation does not establish clinical efficacy or hardware validation.

## GitHub Pages

Destination: [Bruce666-ppp/IDAT7212](https://github.com/Bruce666-ppp/IDAT7212).

1. Put this folder's contents at the root of `main`. Keep `index.html`, `.nojekyll`, `css/`, `js/`, `assets/`, `vendor/` and `meniscus/` together.
2. In **Settings → Pages → Build and deployment**, select **Deploy from a branch**.
3. Choose **main** and **/ (root)**, then Save.
4. Wait for the deployment and open the URL GitHub displays.

After successful deployment, this repository's URL is `https://bruce666-ppp.github.io/IDAT7212/`. Relative resource paths also support `/kneeup-english/` if the repository is renamed. The displayed address resolves the current deployment folder; QR images for both repository names are included.

For browser uploads, unzip the archive first. Uploading the ZIP itself does not publish its contents. GitHub's uploader accepts up to 100 files per batch and 25 MiB per file; preserve the folder tree when batching. See the official [upload guide](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository) and [Pages source guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Local preview and tests

Serve this directory over HTTP; `file://` commonly blocks modules/models. For example, run `python -m http.server 8080` here and open `http://localhost:8080/`.

```sh
node js/ai/assist-engine.test.mjs
node js/ai/pose-engine.test.mjs
```

Original internal test labels/comments are retained. See `docs/ENGLISH-LOCALISATION.md` and the JSON media manifests for scope, source hashes and editing provenance.

## Attribution

Complete current-site source: [KINGKAZMAX/kneeup-web](https://github.com/KINGKAZMAX/kneeup-web), commit `f505cf1378a072ddf6635b1be62a7798506d83e2`. The separately supplied [reference repository](https://github.com/KINGKAZMAX/kneeup-aix-origin-2026-vital) contains historical submission material; its application differs from the current static showcase.

The project owner states that the author authorised copying and modification. Original project, design and third-party credits are retained; no new licence is asserted for upstream assets. No changes were submitted to either KINGKAZMAX repository.

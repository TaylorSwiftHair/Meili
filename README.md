# MeiLi

MeiLi is a browser-based hair and makeup application. It includes guided camera capture, an immediate hair-history quiz, experimental 1A–4C hair-pattern resemblance rankings, cosmetic damage-concern estimates, product options, four hair routines, a makeup quiz, a Makeup Style Catalog and illustrated step-by-step tutorials. The results page links each valid leading subtype directly to its existing broad hair routine.

This is the GitHub Pages export of MeiLi source version 15, commit `bee53401499a1ef0629d5dc9e76a516ace1ccee8`. The layout, artwork, quiz content, scoring and tutorial steps are retained. Deployment-specific changes make public URLs relative to this site's folder, including ONNX model and WASM loading. The old nested source-download ZIP is replaced by a link to the current GitHub repository's source archive; during local development it opens this guide. No live hosted MeiLi site was modified by preparing this export.

## What you need

- For public visitors: a recent browser with WebAssembly SIMD, JavaScript, enough available memory and a stable connection. Camera capture requires HTTPS and camera permission. GitHub Pages provides HTTPS. No account with an AI vendor, API key, local Python server or installation is needed for visitors.
- For local development: Node.js 24 LTS and its bundled npm. Node 22 or newer is accepted by the scripts. Install Git only if using the terminal upload method.
- No third-party npm dependencies need downloading. ONNX Runtime Web is already vendored under `site/vendor/`, with its license, and all model chunks are included.

## Local development

Extract the ZIP and open a terminal **inside `MeiLi-GitHub-Pages`**, next to `package.json`.

```bash
npm ci
npm run dev
```

Open `http://localhost:8080/`. Stop the server with Ctrl+C. Changes are plain files under `site/`; refresh the browser after saving. Do not double-click `index.html` as a `file://` URL: ES modules, fetch and the model need an HTTP server.

Production build:

```bash
npm test
npm run build
npm run preview
```

The production output is **`_site/`**. It is generated and ignored by Git. Upload the repository source to GitHub; the workflow builds `_site` for you.

Test a repository subpath locally:

```bash
npm run build
npm run preview -- --base=/MeiLi-test/
```

Open `http://localhost:8080/MeiLi-test/`. Use a separate server process or stop the first one before starting another. You can change the port with `--port=8081`. These local server URLs are for development only; the deployed browser application has no localhost endpoint.

No production environment variables, `.env` file or private credentials are required. Do not add tokens or API keys to the frontend. `.gitignore` excludes secret environment files and caches but **does not ignore required model weights or public assets**.

## Publish on GitHub Pages

### 1. Create an empty repository

1. Sign in at <https://github.com>.
2. Click **+ → New repository**.
3. Choose a name, for example `MeiLi`. The default address will be `https://YOUR-USERNAME.github.io/MeiLi/`. Keep the exact capitalization when entering the URL.
4. Choose **Public** for the simplest GitHub Free setup. Private repository Pages availability depends on your GitHub plan. A public website serves its model and artwork publicly; publishing does not make visitor photos public.
5. Leave the options to add a README, license or `.gitignore` unchecked because this ZIP already contains the needed project files. Click **Create repository**.

Upload the **extracted contents**, not the ZIP itself and not an extra outer `MeiLi-GitHub-Pages/` folder. `package.json`, `README.md`, `site/`, `scripts/`, `tests/` and `.github/` must be at the repository root.

### 2A. Upload using Git (recommended for this model-sized project)

In the extracted project terminal, replace `YOUR-USERNAME` and `REPOSITORY-NAME` below:

```bash
git init
git add .
git commit -m "Initial MeiLi GitHub Pages deployment"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/REPOSITORY-NAME.git
git push -u origin main
```

Follow Git's normal browser sign-in prompt or your configured credential manager. Do not put a token into the remote URL or any project file. If Git asks for your identity, configure your own name and email using its displayed instructions. If you accidentally created an initial remote README, use a fresh empty repository or clone it and copy this project's contents into the clone before committing; do not force-push over work you want to keep.

### 2B. Upload using the GitHub website

GitHub's browser uploader accepts **at most 100 files per upload** and **25 MiB per file**. Every supplied repository file is below that size limit. The complete project contains more than 100 files, so do several batches. Model chunks are already split; do not merge them and do not use Git LFS.

1. At the repository's **Code** tab, choose **Add file → Upload files** (on an empty repository, choose **uploading an existing file**).
2. Drag in the root files (`README.md`, `THIRD_PARTY.md`, `package.json`, `package-lock.json`, `.gitignore`, `.nvmrc`) and the small `scripts/`, `tests/`, and `artwork/` folders. Commit to `main` with a short message. Do not upload `_site/` or `node_modules/` if you built locally.
3. Upload the `.github/` folder, including `workflows/deploy.yml`. If your file picker hides dot folders, use **Add file → Create new file**, enter `.github/workflows/deploy.yml` as its name, paste the supplied workflow's full contents, and commit. Check that `.gitignore` also uploaded; create it the same way if needed.
4. Create the site folder using **Add file → Create new file** with the name `site/.gitkeep` and commit it. Open the new **site** folder in GitHub.
5. From inside `site/`, choose **Add file → Upload files**. Upload its loose files (`index.html`, JS, CSS, JSON and manifest files, plus `.nojekyll`) and the `vendor/` and `visual-model/` folders. This batch is fewer than 100 files. **All 11 `clip-00.bin` through `clip-10.bin` files must be included.** Keep those files inside `site/visual-model/`, not at the repository root.
6. Create `site/assets/.gitkeep` from the repository root using **Create new file**, then open **site/assets**. Upload the loose files from the local `site/assets/` folder.
7. Still inside **site/assets**, upload its subfolders **one folder per commit**: `branding`, `fonts`, `hair-art`, `hair-steps`, `looks`, `makeup-art`, `makeup-steps`, `opening`, `products`, and `y2k`. Each folder is under the 100-file limit. Preserve the folder names and nesting. You may leave the empty `.gitkeep` markers; they are harmless.
8. On the Code tab, verify that `.github/workflows/deploy.yml`, `site/index.html`, `site/visual-model/manifest.json`, all 11 model chunks, and `site/vendor/ort-wasm-simd-threaded.wasm` exist.

If the uploader fails or changes folder nesting, use the Git method above; it preserves the full directory structure in one push. Early workflow runs can fail while you are uploading incomplete batches. Finish every batch, then rerun the workflow after enabling Pages.

### 3. Enable Pages and run the deployment

1. Open your repository's **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**. Do not select branch deployment with `/docs` or the repository root.
3. Go to the **Actions** tab. Select **Deploy MeiLi to GitHub Pages**.
4. If no deployment starts after enabling Pages, click **Run workflow**, choose `main`, then click **Run workflow**. Future pushes to `main` trigger it automatically.
5. Wait for both **build** and **deploy** jobs to finish successfully. The build installs the empty locked npm dependency set, runs the tests, verifies every model chunk and asset path, creates `_site`, and uploads it. The deploy job uses GitHub's Pages service.
6. Return to **Settings → Pages** and open the published URL. It can take a short time for a new deployment to become available.
7. On the public site, click START, open the catalogs and a tutorial, then open Scan Hair. Allow the camera when asked. The first model download is large; allow it to finish on a stable connection.

The workflow includes `contents: read`, `pages: write` and `id-token: write` at the appropriate job scopes. The workflow uses GitHub's short-lived built-in deployment identity, not a secret embedded in the browser. It deploys from `main`. If you intentionally rename that branch, update the workflow's `branches` entry as well.

No repository-name edit or base-path environment variable is needed. Assets resolve from the deployed folder; fragment routes such as `#hair-tutorial/3` do not require GitHub server rewrites. Both `USERNAME.github.io/REPO/` and a user-site root can serve the same build. Use the trailing slash on the site's root URL.

## Updating the site later

Edit files under `site/`, keep the same folders, then commit and push to `main`. GitHub Actions validates, rebuilds and republishes automatically. With browser uploads, open the correct repository folder, upload the changed files to replace the existing versions, and commit. Do not upload a second nested copy of the project. Check the Actions tab after every update. Changes to ignored `_site/` do not update the source; edit `site/` instead.

## Model and camera details

- Runtime: **ONNX Runtime Web**, using **WebAssembly**, entirely in the visitor's browser. One WASM thread is used, so GitHub Pages does not need special cross-origin isolation headers.
- Model: the existing quantized CLIP vision graph from `Xenova/clip-vit-base-patch32`, pinned upstream revision `d15189d7028b43f1d3e65039190477f6af591c2a`.
- Model bytes: **89,117,001**, delivered in 11 ordinary Git-tracked `.bin` chunks and reassembled in browser memory. SHA-256: `583fd1110a514667812fee7d684952aaf82a99b959760c8d7dca7e0ab9839299`.
- Required labels, preprocessing values and precomputed text embeddings are in `site/visual-model/manifest.json`. The vendor runtime, module and WASM binary are all included.
- There is **no external inference backend**, private API key or paid inference service. The site does not upload visitor photos for inference. The existing browser-local preferences and derived estimates remain browser-local; they are not shared among visitors or synchronized across devices.
- The current classifier is an **experimental zero-shot resemblance system**, not a fine-tuned or validated hair-subtype classifier. Deployment preparation does not improve its accuracy. Damage is an unvalidated cosmetic care-concern estimate, not a medical diagnosis.
- The first visit downloads roughly 89 MB of model weights plus the runtime and page assets. Older or low-memory devices may fail to initialize it. Internet access is required for initial loading. The app's existing quiz-only alternative remains available.
- Camera access requires HTTPS, permission and a supported device/browser. The capture count, camera prompts, image processing, quiz questions, ranking calculations and results are unchanged. A physical phone camera and every possible device cannot be verified in this environment.

## Project structure

- `site/` — plain HTML, CSS, ES modules, JSON data and all required public assets.
- `site/assets/` — logo, responsive opening artwork, lace, fonts, product photos and tutorial drawings.
- `site/visual-model/` — model chunks, label/embedding manifest and model license.
- `site/vendor/` — vendored ONNX Runtime Web and its license.
- `scripts/` — dependency-free local server, production copy/validation scripts.
- `tests/` — mapping, content and protected-function regression tests.
- `artwork/hair-tutorial-brief.txt` — written content fixture used by a tutorial regression test; no temporary processing images are needed to build.
- `.github/workflows/deploy.yml` — Pages build/deployment workflow.
- `_site/` — generated production output, intentionally not committed or included in the ZIP.
- `THIRD_PARTY.md` — asset and model credits retained from MeiLi.
- `VERIFICATION.md` — completed checks and limits for this export.

## Troubleshooting

**Blank page / CSS missing:** check Actions logs, then browser Console and Network. Ensure you uploaded the contents at the repository root and selected GitHub Actions in Pages settings. Open the published `/REPOSITORY-NAME/` URL with its trailing slash. Do not add a root-only `<base href="/">`. Hash links stay in that folder.

**Images or fonts missing:** filenames are case-sensitive on GitHub. Preserve the exact folders and capitalization. Make sure the relevant `site/assets` files were committed. Look for 404 requests in Network; page-relative `./assets/...` URLs should include the repository's subpath.

**Model fails to load:** verify all 11 chunks, their names, `manifest.json`, the runtime `.mjs` files and `.wasm` file are committed as ordinary binary files. Do not replace them with Git LFS pointer text. Check Console/Network for missing files, partial downloads or memory errors. Use a modern browser, stable connection and sufficient memory. All model URLs are same-origin, so no remote model CORS setting or external API is required. If you deliberately move assets to another host later, that host will need appropriate CORS headers.

**Camera will not open:** open the HTTPS Pages URL, allow camera permission in browser/site settings, close applications already using the camera, and try a supported device. Local development should use `localhost`, which browsers treat as a secure development context. Arbitrary LAN HTTP addresses may not allow camera capture. The existing quiz-only flow still works when a camera is unavailable.

**A fragment route refresh fails:** use the full page root and hash, e.g. `https://YOUR-USERNAME.github.io/MeiLi/#hair-tutorial/3`. Do not turn it into `/MeiLi/hair-tutorial/3`; this app uses hash routing.

**Actions build fails:** open **Actions → failed run → failed job → logs** and read the first actual error. Missing model chunks or asset files must be uploaded, not ignored or bypassed. If the deploy job reports Pages is not enabled, select GitHub Actions in Settings → Pages and rerun. If an organization policy blocks the provided actions, follow the administrator's repository policy.

**Source/setup link:** on `github.io`, it downloads the current `main` branch archive from the corresponding repository. During local development (or on a custom domain without GitHub-host metadata), it opens this README. This replaces the obsolete nested source ZIP and avoids shipping duplicate archives in this package.

## Credits and official deployment references

The MeiLi logo and supplied hand-drawn illustrations remain the project's supplied visual assets, without regenerated replacements. Third-party product/reference images, fonts, ONNX Runtime and CLIP retain their original credits and licenses; see `THIRD_PARTY.md` and the included license files. Do not assume this export grants ownership of third-party assets.

- GitHub Pages custom workflows: <https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages>
- Publishing source settings: <https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site>
- Browser and Git file uploads: <https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository>
- ONNX Runtime Web: <https://onnxruntime.ai/docs/tutorials/web/>
- Pinned upstream model: <https://huggingface.co/Xenova/clip-vit-base-patch32/tree/d15189d7028b43f1d3e65039190477f6af591c2a>

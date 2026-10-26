# Export verification — October 26, 2026

Source: MeiLi version 15, commit `bee53401499a1ef0629d5dc9e76a516ace1ccee8`.

Completed:

- `npm ci` succeeded; no external npm dependencies are required.
- `npm test`: **20 tests passed**, including all 12 result-to-routine mappings, exact authored tutorial content, protected scanner/quiz functions, and the deployment checks.
- `npm run build` succeeded and generated `_site/`.
- All 219 original public files other than the obsolete nested download ZIPs are accounted for. Tests compare original source hashes after reversing only the documented URL/source-download substitutions. Artwork, fonts, model chunks and runtime vendor binaries remain byte-for-byte unchanged.
- Static checks reject root-only asset paths, missing referenced assets, developer-only paths and any public file exceeding 25 MiB. The model's 11 chunks are validated against the pinned complete-model byte count and SHA-256.
- The actual production output was served under **`/MeiLi-test/`**, with no app assets available at `/assets/` or `/vendor/`. The homepage and START link worked.
- Browser-side ONNX Runtime loaded all **89,117,001** model bytes from that subpath and completed an actual WASM inference. It returned 12 finite subtype scores totaling approximately 1.0. The input was a synthetic canvas used solely to check runtime execution, not hair accuracy.
- The existing camera page rendered with its required/optional angle prompts. The camera API code is unchanged.
- The quiz-only path completed all **17 hair questions**, produced a displayed **1B** example result, and its direct routine button opened the existing **Type 1 — Straight Hair** tutorial.
- All four Hair Routine Catalog selections used subpath-safe images and their canonical tutorial links.
- The **15-question makeup quiz** completed, opened Makeup Style Catalog, loaded its drawings, and opened the existing Clean Girl tutorial. Next advanced both the step and drawing. Refreshing that hash route restored the tutorial without a server rewrite.
- No application-origin console error was observed in the checked flows. Browser-extension errors are outside the app.
- All required model/runtime/artwork files are included in the ZIP. Required `.bin` and `.wasm` files are not ignored by `.gitignore` or stored as Git LFS pointers.
- The original hosted Site and its sharing settings were not modified by this export.

Limits:

- This ZIP has not been pushed to a GitHub repository or deployed by GitHub Actions on the user's account. The user must enable Pages and run the included workflow; the real GitHub URL can only be verified after that deployment.
- Real phone camera permission/capture and performance across every browser/device were not tested. HTTPS and the unchanged normal camera API support deployment, but hardware, browser permission and memory still matter.
- Runtime execution does not validate hair subtype or damage accuracy. The current experimental zero-shot model and scoring are unchanged. The first download is large and older/low-memory devices may not run it.
- External product shops and linked YouTube content still require their own internet availability; they were not altered by the export.

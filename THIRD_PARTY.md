# Third-party notices

The app includes an ONNX-converted, INT8-quantized derivative of `dima806/hair_type_image_detection`, revision `c918d5859f6830e667edd0aa4260703ea11a8d10`, declared Apache-2.0 by its publisher. Original model: https://huggingface.co/dima806/hair_type_image_detection. Conversion changes the storage format and numeric precision, not its training labels. See `dist/models/LICENSE-Apache-2.0.txt`.

ONNX Runtime Web 1.22.0 is redistributed under MIT. Its license is in `dist/vendor/LICENSE`. Upstream project: https://github.com/microsoft/onnxruntime. The runtime was obtained from the official npm registry package.

Temporary people, satin, and lace image crops come from the user's supplied reference images. They are placeholders, not training data, and this project does not grant new rights to those reference photos. Replace them before broader publication if appropriate. The site is owner-private.

The app optionally loads DM Sans and Playfair Display through Google Fonts; fallbacks are included. User photos are not sent there. Product names are identifiers of their respective brands; no affiliation is implied.

## Current visual ranker and content

The current release uses Xenova/clip-vit-base-patch32 revision d15189d7028b43f1d3e65039190477f6af591c2a, derived from OpenAI CLIP and distributed under MIT. It is used for experimental image–text resemblance, not as a validated hair classifier. License: dist/visual-model/LICENSE-MIT.txt. Subtype descriptions and the resulting embeddings are retained in the model manifest.

Actual product photographs identify the products from the linked official brand catalogs. Original source-image URLs are retained in dist/catalog.json. Product names and photographs belong to their respective owners; no endorsement or sponsorship is implied.

Look photographs are official thumbnail previews of the linked YouTube creator tutorials. Sources are listed in dist/assets/attribution.json. Full creator videos are not redistributed. Meili’s written steps and feature-specific suggestions are independent original guidance, not transcripts of those videos.

## Reference UI assets and fonts

`dist/assets/y2k/` contains UI artwork extracted from the user's nine supplied reference mockups, used as temporary display artwork only. These images are not model training data. The replacement manifest is `dist/assets/ui-slots.json`.

Lobster, Fredoka and the retained Great Vibes font are from the official `google/fonts` repository, under the SIL Open Font License. Their license files accompany the locally hosted font files in `dist/assets/fonts/`.

The October opening artwork was supplied by the user as `verticalhomepageapp.png`, `horizontal homepage.pdf` and `standardhomepage(1).pdf`. Runtime PNGs are stored under `dist/assets/opening/`; the desktop composition is a PDF rendering and the base is extracted with its embedded alpha mask. These display assets are not training data.

Makeup Style Catalog portraits: user-supplied original hand-drawn artwork from `Makeup Catalog (1).png` and `Makeup catalog (2) .png`. Originals are preserved under `artwork/source/`; runtime portraits are direct crops with the development labels excluded. Not used as model training data.

Makeup tutorial illustrations and written routines: supplied by the user in `Add a little bit of body text(1).zip` and `Pasted text(20261025-221631).txt`. Six untouched original sheets are retained in `artwork/tutorial-sheets/`; runtime illustrations are derived crops under `dist/assets/makeup-steps/`. No generated replacement artwork. These are display assets, not training data.

Tutorial image cleanup: deterministic extraction, alpha matting, source-pixel caption repair and proportional normalization of the same user-supplied artwork. No generative image model was used. Original source sheets are preserved.

User-supplied Hair types PNG and Wash Hair ZIP: preserved unchanged under
artwork/source. Hair catalog PNGs are deterministic transparent extractions;
no stock substitutes, generation or redrawing. User artwork rights remain with
the source owner. No new third-party imagery is included.

Hair tutorial sheets: original four PNGs from user-provided Wash Hair(3).zip,
preserved byte-for-byte under artwork/hair-tutorial-sheets. Derived transparent
art under dist/assets/hair-steps uses only these drawings. No generative editing,
stock replacement, redrawing, added details or invented illustration is used.

# PyroLab 3D — Interactive Pyrolysis Process Model

An original, dependency-free interactive teaching model based on the supplied hand-drawn **Solid Waste Management / Pyrolysis System (for Dry Waste)** poster.

## Open / deploy

- Open `index.html` in Chrome, Edge, or Firefox, or upload the contents of this folder to a new GitHub repository and import it into Vercel (Framework: **Other**; no build command).
- **Keep the `audio/` folder intact** so `audio/stage-01.mp3` etc. load correctly.
- No backend, API key or heavy model download is required. Font imports are optional: the app falls back to system fonts offline.

## How to present

Click **Start Guided Tour** for automatic stage changes and spoken English explanations. You can also click any of nine stages, rotate the diorama by dragging, scroll to zoom, pause/resume machinery, or use fullscreen on a projector. Enable sound, since browsers usually need a click before audio playback.

## What it shows

1. Source segregation (wet stream -> compost; appropriate dry stream -> pyrolysis)
2. Shredding/pre-treatment
3. Feed hopper
4. Oxygen-excluded pyrolysis reactor
5. Heat exchanger
6. Condenser and phase separation
7. Pyrolysis oil storage and optional upgrading
8. Non-condensable gas treatment and external burner heat loop
9. Solid char discharge and potential uses after quality testing

**Important scientific note:** Pyrolysis is thermal decomposition without intentional oxygen supply, not direct incineration. The three outputs are condensable liquid, non-condensable gas, and solid residue. Yields, applications and hazards depend on composition and process conditions. Pyrolysis oil and char must not be called universally safe or ready for use. This classroom visualization is **not** a construction, operating, or emissions-safety design.

The 3D-like rendering is a custom projected geometry drawn on HTML Canvas (not engineering CAD). Narration uses native browser text-to-speech when available and falls back to the supplied MP3 clips.

# CSS Tetris 3D

> :construction: **Work In Progress**..._ish_ ヾ(`ヘ ´)ﾉﾞ

This is an unfinished _Tetris_ game implied experiment with [CSS 3D](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style) view and belonging perspective settings.

_Tetromino_ aka block movement is implemented as expected but rotation only on the Z axis is enabled by default. Collision detection in 3D space goes beyond the original purpose of this thing.

## Demo

**Live on [GitHub Pages](https://subztep.github.io/css-tetris-3d/).**

Running locally as usual — `clone && npm i && npm start`.

## Configured Inputs

| Input                               | Event                                         |
| ----------------------------------- | --------------------------------------------- |
| ~~Up / W~~                          | ~~Move (or rotate) on X axis~~                |
| ~~Down / S~~                        | ~~Move (or rotate) on X axis backwards~~      |
| Left / A                            | Move (or rotate) on Y axis                    |
| Right / D                           | Move (or rotate) on Y axis backwards          |
| _Q_                                 | _Move on Z axis backwards (for test :ghost:)_ |
| _E_                                 | _Move on Z axis (for test :ghost:)_           |
| _(left?)_ SHIFT or ALT + _move key_ | Toggle rotation                               |
| SHIFT + Mouse move                  | Perspective follows mouse cursor              |
| Mouse scroll                        | Change perspective                            |
| Both mouse buttons                  | Pointless perspective underload               |

## GUI

For other tweaks please find the implemented [dat.GUI](https://github.com/dataarts/dat.gui) runtime. The most intriguing state parameters are connected. Probably only these toggleables below are nebulous.

| Property     | State changes                               |
| ------------ | ------------------------------------------- |
| `live`       | Moving tetrominos automatically like a game. |
| `screwAxisX` | Enable 3D rotation on X axis.                |

## Outcome

- Fun and easy to work with, spectacular with the combination of animation [keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes) without any supplementary knowledge.
- Performance differences are visible — especially with unoptimised code — within different CSS engines.
- Feels basic compared to WebGL. Aspire to post‒ _Flash_／_jQuery_ image carousel fallout but I don't really see any real-life consumption on this level. However, there is potential to bring [A-Frame](https://github.com/aframevr/aframe/) like 3D markup for messes.

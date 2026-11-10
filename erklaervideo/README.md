# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Commands

**Install Dependencies**

```console
npm i --loglevel=error
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).

## CartoonDemo

Original SVG cartoon with Mila and Ben facing rent, electricity and grocery bills.
The 20-second story moves from financial stress to a shared plan, with animated
invoices, timed German speech bubbles, facial reactions and a moving title.
No external images, fonts or audio are required. `MyComp` remains available unchanged.

```console
npm ci
npm run dev
npm run lint
npx remotion render src/index.ts CartoonDemo out/CartoonDemo.mp4
```

`CartoonDemo`: 1920 × 1080, 30 FPS, 600 frames (20 seconds). On machines with a
system Chromium installation, append `--browser-executable=/usr/bin/chromium`.

Story timing: 0–2 s title and characters; 2–6 s bills arrive; 6–13.5 s dialogue
and worried reactions; 13.5–20 s shared plan and relieved expressions. The final
“IM PLAN” labels mean the bills have been included in the plan, not paid.
The composition is silent and communicates through on-screen text.

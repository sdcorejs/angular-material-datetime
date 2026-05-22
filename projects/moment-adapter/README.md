# @sdcorejs/angular-material-datetime-moment

Moment.js adapter package for `@sdcorejs/angular-material-datetime`.

## Current Status

This package is published for version alignment with the main datetime package, but the Moment adapter implementation is not included in the `1.0.x` line yet. Its public API is intentionally empty in this release.

Use the native adapter from `@sdcorejs/angular-material-datetime` today:

```ts
import { provideSdNativeDateAdapter } from '@sdcorejs/angular-material-datetime';

export const appConfig = {
  providers: [
    provideSdNativeDateAdapter(),
  ],
};
```

## Install

```bash
npm install @sdcorejs/angular-material-datetime @sdcorejs/angular-material-datetime-moment moment
```

Installing this package is only useful if you want to pin the future adapter package name now. For production use in `1.0.x`, configure the native adapter instead.

## Peer Dependencies

| Dependency | Supported range |
| --- | --- |
| `@angular/core` | `>=19.0.0 <22.0.0` |
| `@sdcorejs/angular-material-datetime` | `^1.0.0` |
| `moment` | `^2.29.0` |

## Roadmap

The package is reserved for a Moment-backed implementation of `SdDateAdapter<D>`. Until that lands, do not import runtime symbols from this package.

## License

MIT

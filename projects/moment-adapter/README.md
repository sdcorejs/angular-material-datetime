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

Do not install this placeholder for production use. It has no runtime exports and is excluded from the current release workflow.

## Roadmap

The package is reserved for a Moment-backed implementation of `SdDateAdapter<D>`. Until that lands, do not import runtime symbols from this package.

## License

MIT

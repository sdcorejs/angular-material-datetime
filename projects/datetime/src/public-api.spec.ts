import * as publicApi from './public-api';

describe('public-api exports', () => {
  it('exports SD_DATE_FORMATS', () => {
    expect(publicApi.SD_DATE_FORMATS).toBeDefined();
  });
  it('exports SdDateAdapter', () => {
    expect(publicApi.SdDateAdapter).toBeDefined();
  });
  it('exports SD_DATETIME_DEFAULT_OPTIONS', () => {
    expect(publicApi.SD_DATETIME_DEFAULT_OPTIONS).toBeDefined();
  });
});

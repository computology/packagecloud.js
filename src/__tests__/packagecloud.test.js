import PackageCloud from '../packagecloud';

describe("Initialization Actions", () => {
  it('should throw an error when initializing with no options', function() {
    expect(function() {
      new PackageCloud();
    }).toThrowError("packagecloud API token is required: {token: packagecloud_api_token}");
  });

    it('should throw an error when initializing with no API token', function() {
    expect(function() {
      new PackageCloud({token: null});
    }).toThrowError("token cannot be null or undefined");
  });

  it('should generate the correct base url', function() {
    var new_pc = new PackageCloud({token: 'test_token2', baseUrl: 'https://packagecloud.io/'});
    expect(new_pc.requestOptions.baseUrl).toBe("https://packagecloud.io/api/v1/");
  });
});

import PackageCloud from './packagecloud';
const pc = new PackageCloud('test_token');

describe("Initialization Actions", () => {
  it('should throw an error when initializing with no API token', function() {
    expect(function() {
      new PackageCloud();
    }).toThrowError("packagecloud API token is required");
  });

  it('should remove trailing slash of baseUrl', function() {
    var new_pc = new PackageCloud('test_token2', 'http://packagecloud.io/');
    expect(new_pc.baseUrl).toBe("http://packagecloud.io");
  });
});

import PackageCloud from '../../packagecloud';
const pc = new PackageCloud('test_token');

describe("Uploading a package from a browser environment", () => {
  it('should warn if calling uploadPackage from a browser-environment', () => {
    expect(() => {
      pc.uploadPackage();
    }).toThrowError("Attempting to upload a package in a browser environment. Use uploadPackageFromBrowser method instead.");
  });
  it('should throw an error if repo name is malformatted', () => {
    expect(() => {
      pc.uploadPackageFromBrowser({repo: "test"});
    }).toThrowError("Repository path must be in the fully-qualified format - user/repo");
  });

  it('should throw an error if file is missing', () => {
    expect(() => {
      pc.uploadPackageFromBrowser({repo: "test/repo", file: null});
    }).toThrowError("Expects an object with string file path (node) or File (browser) as a value");
  });

  it('should throw an error if filename is missing', () => {
    expect(() => {
      pc.uploadPackageFromBrowser({repo: "test/repo", file: new Blob()});
    }).toThrowError("Expects a filename");
  });

  it('should upload a package without a dist', () => {
    expect.assertions(1);
    let resolve = (data) => {
      expect(data).toBeDefined();
    }

    return pc.uploadPackageFromBrowser({repo: "saldo/test", file: new Blob(), filename: 'packagecloud-test-gem'}).then(resolve);
  });

  it('should upload a package with a dist', () => {
    expect.assertions(1);
    let resolve = (data) => {
      expect(data).toBeDefined();
    }

    return pc.uploadPackageFromBrowser({repo: "saldo/test", file: new Blob(), filename: 'packagecloud-test-py', dist: 1}).then(resolve);
  });
});

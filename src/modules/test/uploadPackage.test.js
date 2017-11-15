/**
 * @jest-environment node
 */

import PackageCloud from '../../packagecloud';
const pc = new PackageCloud({token: 'test_token'});

describe("Uploading a package from a NodeJS environment", () => {
  it('should throw an error if repo name is malformatted', () => {
    expect(() => {
      pc.uploadPackage();
    }).toThrowError("Repository path must be in the fully-qualified format - user/repo");
  });
  it('should throw an error if file is missing', () => {
    expect(() => {
      pc.uploadPackage({repo: "test/repo", file: null});
    }).toThrowError("Expects an object with string file path (node) or File (browser) as a value");
  });
  it('should throw an error if file is missing', () => {
    expect(() => {
      pc.uploadPackage({repo: "test/repo", file: "./filepath", filename: null});
    }).toThrowError("Expects a filename");
  });

  
  it('should upload a package without a dist', () => {
    expect.assertions(1);
    let resolve = (data) => {
      expect(data).toBeDefined();
    }

    return pc.uploadPackage({repo: "saldo/test", file: "./packagecloud-test.gem", filename: 'packagecloud-test-gem'}).then(resolve);
  });

  it('should upload a package with a dist', () => {
    expect.assertions(1);
    let resolve = (data) => {
      expect(data).toBeDefined();
    }

    return pc.uploadPackage({repo: "saldo/test", file: "./packagecloud-test-py.tar.gz", filename: 'packagecloud-test-py', dist: 1}).then(resolve);
  });
});

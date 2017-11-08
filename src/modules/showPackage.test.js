import PackageCloud from '../packagecloud';
const pc = new PackageCloud('test_token');

describe("RPM and Debian package details", () => {
  it('should throw an error when called with no options', () => {
    expect(() => {
      pc.showPackage()
    }).toThrowError("show package requires the following options: type, distro, distroVersion, name, arch, version");
  });

  it('should throw an error if repo path is malformatted', () => {
    expect(() => {
      pc.showPackage({repo: "test"})
    }).toThrowError("Repository path must be in the fully-qualified format - {repo: 'user/repo'}");
  });

  it('should throw an error if required field (type) is missing', () => {
    expect(() => {
      pc.showPackage({repo: "saldo/test"})
    }).toThrowError("missing field: type");
  });

  it('should return package details with version', () => {
    expect.assertions(1);
    let resolve = (data) => {
      expect(data).toBeDefined();
    }
    pc.showPackage({
      repo: 'saldo/test',
      type: "rpm",
      distro: "ubuntu",
      distroVersion: "precise",
      name: "packagecloud-test-0.1.x86_64",
      arch: "x86_64", version: "0.1.0"}).then(resolve);
  });

  it('should return package details with release', () => {
    expect.assertions(1);
    let resolve = (data) => {
      expect(data).toBeDefined();
    }
    pc.showPackage({
      repo: 'saldo/test',
      type: "rpm",
      distro: "ubuntu",
      distroVersion: "precise",
      name: "packagecloud-test-0.1.x86_64",
      arch: "x86_64", version: "0.1.0", release: "release"}).then(resolve);
  });
});

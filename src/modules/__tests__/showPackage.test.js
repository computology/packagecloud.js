import PackageCloud from '../../packagecloud';
const pc = new PackageCloud('test_token');

describe("RPM and Debian package details", () => {
  it('should throw an error if required field is missing', () => {
    expect(() => {
      pc.showPackage({repo: "saldo/test"})
    }).toThrowError("missing field: type");
  });

  it('should throw an error if repo path is malformatted', () => {
    expect(() => {
      pc.showPackage({
        repo: 'saldo',
        type: "deb",
        distro: "ubuntu",
        distroVersion: "precise",
        packageName: "packagecloud-test-0.1.x86_64",
        arch: "x86_64", version: "0.1.0", release: "release"})
    }).toThrowError("The repo field must be in the format: username/reponame");
  });

  it('should return package details with version', () => {
    expect.assertions(1);
    let resolve = (data) => {
      expect(data).toBeDefined();
    }
    pc.showPackage({
      repo: 'saldo/test',
      type: "deb",
      distro: "ubuntu",
      distroVersion: "precise",
      packageName: "packagecloud-test-0.1.x86_64",
      arch: "x86_64", version: "0.1.0"}).then(resolve);
  });

  it('should return package details with release', () => {
    expect.assertions(1);
    let resolve = (data) => {
      expect(data).toBeDefined();
    }
    pc.showPackage({
      repo: 'saldo/test',
      type: "deb",
      distro: "ubuntu",
      distroVersion: "precise",
      packageName: "packagecloud-test-0.1.x86_64",
      arch: "x86_64", version: "0.1.0", release: "release"}).then(resolve);
  });
});

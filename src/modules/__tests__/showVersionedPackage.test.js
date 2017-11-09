import PackageCloud from '../../packagecloud';
const  pc = new PackageCloud('test_token');

describe("Package details", () => {
  describe('Versioned package details', () => {
    it('should throw an error if type is missing', () => {
      expect(() => {
        pc.showVersionedPackage({repo:"saldo/test", packageName: "packagecloud-test-gem", version: "0.1.0"});
      }).toThrowError("missing field: type");
    });

    it('should throw an error if name is missing', () => {
      expect(() => {
        pc.showVersionedPackage({repo: "saldo/test", type: "gem"});
      }).toThrowError("missing field: packageName");
    });

    it('should throw an error if version is missing', () => {
      expect(() => {
        pc.showVersionedPackage({repo: "user/repo", packageName: "name", type: "deb"});
      }).toThrowError("missing field: version");
    });

    it('should throw an error if repo path is malformatted', () => {
      expect(() => {
        pc.showVersionedPackage({repo: "saldo", type: "gem", packageName:"packagecloud-test-gem", "version": "1"});
      }).toThrowError("The repo field must be in the format: username/reponame");
    });
  });

  describe('Gem package details', () => {
    it('should return versioned package details for a gem', () => {
      expect.assertions(1);
      let resolve = (data) => {
        expect(data).toBeDefined();
      }
      return pc.showGemPackage({
        repo: "saldo/test",
        type: "gem",
        packageName: "packagecloud-test-gem",
        version: "0.1.0"}).then(resolve);
    })
  });

  describe('Python package details', () => {
    it('should return versioned package details for a python sdist', () => {
      expect.assertions(1);
      let resolve = (data) => {
        expect(data).toBeDefined();
      }
      return pc.showPythonPackage({
        repo: "saldo/test",
        type: "python",
        packageName: "packagecloud-test",
        version: "0.1.0"}).then(resolve);
    });
  });

  describe('Java package details', () => {
    it('should return versioned package details for a java package', () => {
      expect.assertions(1);
      let resolve = (data) => {
        expect(data).toBeDefined();
      }
      return pc.showJavaPackage({
        repo: "saldo/test",
        type: "java",
        packageName: "packagecloud-test",
        version: "0.1.0"}).then(resolve);
    })
  });
});

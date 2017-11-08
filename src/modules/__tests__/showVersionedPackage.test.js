import PackageCloud from '../../packagecloud';
const pc = new PackageCloud('test_token');

describe("Package details", () => {
  describe('Versioned package details', () => {
    it('should throw an error if repo path is malformatted', () => {
      expect(() => {
        pc.showVersionedPackage();
      }).toThrowError("Repository path must be in the fully-qualified format - {repo: 'user/repo', ...}");
    });
  });
  
  describe('Gem package details', () => {
    it('should throw an error if repo path is malformatted', () => {
      expect(() => {
        pc.showGemPackage({repo: "test"})
      }).toThrowError("Repository path must be in the fully-qualified format - {repo: 'user/repo', ...}");
    });

    it('should throw an error if required field (name) is missing', () => {
      expect(() => {
        pc.showGemPackage({repo: "saldo/test"})
      }).toThrowError("missing field: name");
    });
    
    it('should return versioned package details for a gem', () => {
      expect.assertions(1);
      let resolve = (data) => {
        expect(data).toBeDefined();
      }
      return pc.showGemPackage({
        repo: "saldo/test",
        type: "gem",
        name: "packagecloud-test-gem",
        version: "0.1.0"}).then(resolve);
    })
  });

  describe('Python package details', () => {
    it('should throw an error if repo path is malformatted', () => {
      expect(() => {
        pc.showPythonPackage({repo: "test"})
      }).toThrowError("Repository path must be in the fully-qualified format - {repo: 'user/repo', ...}");
    });
    
    it('should return versioned package details for a python sdist', () => {
      expect.assertions(1);
      let resolve = (data) => {
        expect(data).toBeDefined();
      }
      return pc.showPythonPackage({
        repo: "saldo/test",
        type: "python",
        name: "packagecloud-test",
        version: "0.1.0"}).then(resolve);
    });
  });

  describe('Java package details', () => {
    it('should throw an error if repo path is malformatted', () => {
      expect(() => {
        pc.showJavaPackage({repo: "test"})
      }).toThrowError("Repository path must be in the fully-qualified format - {repo: 'user/repo', ...}");
    });

    it('should throw an error if a required field is missing', () => {
      expect(() => {
        pc.showJavaPackage({repo: "saldo/test"})
      }).toThrowError("missing field: name");
    });
    
    it('should return versioned package details for a java package', () => {
      expect.assertions(1);
      let resolve = (data) => {
        expect(data).toBeDefined();
      }
      return pc.showJavaPackage({
        repo: "saldo/test",
        type: "java",
        name: "packagecloud-test",
        version: "0.1.0"}).then(resolve);
    })
  });
});

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
})

describe("Repository Actions", () => {
  describe("Fetching Distros", () => {
    it('should return a JSON list of distros', () => {
      expect.assertions(1);
      let resolve = (data) => {
        expect(data).toBeDefined();
      }

      return pc.getDistributions().then(resolve);
    });
  });

  describe("Creating a Repository", () => {  
    it('should throw an error if repo name is missing in options', () => {
      expect(() => {
        pc.createRepository()
      }).toThrowError("This method expects an object parameter with a name and value - {name: 'new-repo'}");
    });

    it('should create a private repository', () => {
      expect.assertions(1);
      let resolve = (data) => {
        expect(data).toBeDefined();
      }
      return pc.createRepository({name: 'new-repo', privacy: true}).then(resolve);
    });

    it('should create a public repository', () => {
      expect.assertions(1);
      let resolve = (data) => {
        expect(data).toBeDefined();
      }
      return pc.createRepository({name: 'new-repo', privacy: false}).then(resolve);
    });
  });

  describe("Show Repository Details", () => {
    it('should throw an error if repo name is missing in options', () => {
      expect(() => {
        pc.getRepository({})
      }).toThrowError("Repository path must be in the fully-qualified format - {repo: 'user/repo'}");
    });

    it('should return repository information', () => {
      expect.assertions(1);
      let resolve = (data) => {
        expect(data).toBeDefined();
      }
      return pc.getRepository({repo: 'test/test'}).then(resolve);
    });
  })

  describe('Show a list of repositories', () => {
    it('should return a JSON list of repositories', () => {
      expect.assertions(1);
      let resolve = (data) => {
        expect(data).toBeDefined();
      }
      return pc.getRepositories().then(resolve);
    });
  })

  describe("Listing packages in a repository", () => {
    it('should throw an error if repo path is missing', () => {
      expect(() => {
        pc.listPackages()
      }).toThrowError("Repository path must be in the fully-qualified format - {repo: 'user/repo'}");
    });

    it('should throw an error if repo path is not in fully-qualifiedq format', () => {
      expect(() => {
        pc.listPackages({repo: 'test'})
      }).toThrowError("Repository path must be in the fully-qualified format - {repo: 'user/repo'}");
    });

    it('should return a list of packages', () => {
      expect.assertions(1);
      let resolve = (data) => {
        expect(data).toBeDefined();
      }
      return pc.listPackages({repo: 'saldo/test'}).then(resolve);
    });
  });
  
});

describe("Package details", () => {
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

describe('Deleting a package', () => {
  it('should delete a package', () => {
    expect.assertions(1);
    let resolve = (data) => {
      expect(data).toBeDefined();
    }
    return pc.deletePackage('/delete_url').then(resolve);
  })
});

describe("Uploading a package", () => {
  describe("From a browser environment", () => {
    it('should throw an error if repo name is malformatted', () => {
      expect(() => {
        pc.putPackage({repo: "test"});
      }).toThrowError("Repository path must be in the fully-qualified format - user/repo");
    });

    it('should throw an error if file is missing', () => {
      expect(() => {
        pc.putPackage({repo: "test/repo", file: null});
      }).toThrowError("Expects an object with string file path (node) or File (browser) as a value");
    });

    it('should throw an error if filename is missing', () => {
      expect(() => {
        pc.putPackage({repo: "test/repo", file: new Blob()});
      }).toThrowError("Expects a filename");
    });

    it('should upload a package without a dist', () => {
      expect.assertions(1);
      let resolve = (data) => {
        expect(data).toBeDefined();
      }

      return pc.putPackage({repo: "saldo/test", file: new Blob(), filename: 'packagecloud-test-gem'}).then(resolve);
    });

    it('should upload a package with a dist', () => {
      expect.assertions(1);
      let resolve = (data) => {
        expect(data).toBeDefined();
      }

      return pc.putPackage({repo: "saldo/test", file: new Blob(), filename: 'packagecloud-test-py', dist: 1}).then(resolve);
    });
  });

  describe("From a Node environment", () => {
    beforeEach(() => {
      pc.isBrowser = false;
    })

    it('should throw an error if file is missing', () => {
      expect(() => {
        pc.putPackage({repo: "test/repo", file: null});
      }).toThrowError("Expects an object with string file path (node) or File (browser) as a value");
    });

    
    it('should upload a package without a dist', () => {
      expect.assertions(1);
      let resolve = (data) => {
        expect(data).toBeDefined();
      }

      return pc.putPackage({repo: "saldo/test", file: "./packagecloud-test.gem", filename: 'packagecloud-test-gem'}).then(resolve);
    });

    it('should upload a package with a dist', () => {
      expect.assertions(1);
      let resolve = (data) => {
        expect(data).toBeDefined();
      }

      return pc.putPackage({repo: "saldo/test", file: "./packagecloud-test-py.tar.gz", filename: 'packagecloud-test-py', dist: 1}).then(resolve);
    });
  });
});

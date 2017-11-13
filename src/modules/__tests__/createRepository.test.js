import PackageCloud from '../../packagecloud';
const pc = new PackageCloud({token: 'test_token'});

describe("Creating a Repository", () => {
  it('should throw an error if repo name is missing in options', () => {
    expect(() => {
      pc.createRepository()
    }).toThrowError("missing field: name");
  });

    it('should throw an error if name is null or undefined', () => {
    expect(() => {
      pc.createRepository({name: null})
    }).toThrowError("name cannot be null or undefined");
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

import PackageCloud from '../../packagecloud';
const pc = new PackageCloud('test_token');

describe("Show Repository Details", () => {
  it('should throw an error if repo name is missing in options', () => {
    expect(() => {
      pc.showRepository({})
    }).toThrowError("missing field: repo");
  });
  
  it('should throw an error if repo name is malformatted', () => {
    expect(() => {
      pc.showRepository({repo: "saldo"})
    }).toThrowError("The repo field must be in the format: username/reponame");
  });

  it('should return repository information', () => {
    expect.assertions(1);
    let resolve = (data) => {
      expect(data).toBeDefined();
    }
    return pc.showRepository({repo: 'test/test'}).then(resolve);
  });
})

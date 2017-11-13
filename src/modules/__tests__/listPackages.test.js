import PackageCloud from '../../packagecloud';
const pc = new PackageCloud({token: 'test_token'});

describe("Listing packages in a repository", () => {
  it('should throw an error if repo path is missing', () => {
    expect(() => {
      pc.listPackages()
    }).toThrowError("missing field: repo");
  });

  it('should throw an error if repo path is not in fully-qualifiedq format', () => {
    expect(() => {
      pc.listPackages({repo: 'test'})
    }).toThrowError("The repo field must be in the format: username/reponame");
  });

  it('should return a list of packages', () => {
    expect.assertions(1);
    let resolve = (data) => {
      expect(data).toBeDefined();
    }
    return pc.listPackages({repo: 'saldo/test'}).then(resolve);
  });
});

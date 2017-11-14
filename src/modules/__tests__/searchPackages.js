import PackageCloud from '../../packagecloud';
const pc = new PackageCloud({token: 'test_token'});

describe("Searching for packges in a repository", () => {
  it('should return a list of packages', () => {
    expect.assertions(1);
    let resolve = (data) => {
      expect(data).toBeDefined();
    }
    return pc.searchPackages({repo: 'user/repo', filename: 'mypackage'}).then(resolve);
  });

    it('should return a list of all packages in a repo', () => {
    expect.assertions(1);
    let resolve = (data) => {
      expect(data).toBeDefined();
    }
    return pc.searchPackages({repo: 'user/repo'}).then(resolve);
  });
});

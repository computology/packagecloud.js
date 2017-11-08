import PackageCloud from '../../packagecloud';
const pc = new PackageCloud('test_token');

describe('Show a list of repositories', () => {
  it('should return a JSON list of repositories', () => {
    expect.assertions(1);
    let resolve = (data) => {
      expect(data).toBeDefined();
    }
    return pc.getRepositories().then(resolve);
  });
});

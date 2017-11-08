import PackageCloud from '../packagecloud';
const pc = new PackageCloud('test_token');

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

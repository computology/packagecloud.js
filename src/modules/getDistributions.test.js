import PackageCloud from '../packagecloud';
const pc = new PackageCloud('test_token');

describe("Fetching Distros", () => {
  it('should return a JSON list of distros', () => {
    expect.assertions(1);
    let resolve = (data) => {
      expect(data).toBeDefined();
    }

    return pc.getDistributions().then(resolve);
  });
});

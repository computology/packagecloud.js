import PackageCloud from '../../packagecloud';
const pc = new PackageCloud({token: 'test_token'});

describe("Get current_user info", () => {
  it('should return a JSON with the user info', () => {
    expect.assertions(1);
    let resolve = (data) => {
      expect(data).toBeDefined();
    }

    return pc.getCurrentUserInfo().then(resolve);
  });
});

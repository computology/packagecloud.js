import PackageCloud from '../../packagecloud';
const pc = new PackageCloud({token: 'test_token'});

describe('Deleting a package', () => {
  it('should delete a package', () => {
    expect.assertions(1);
    let resolve = (data) => {
      expect(data).toBeDefined();
    }
    return pc.deletePackage('/delete_url').then(resolve);
  })
});

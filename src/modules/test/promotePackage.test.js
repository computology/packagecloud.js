/**
 * @jest-environment node
 */

import PackageCloud from '../../packagecloud';
const pc = new PackageCloud({token: 'test_token'});

describe("Promote a package", () => {
  
  it('should resolve the promote endpoint', () => {
    expect.assertions(1);
    let resolve = (data) => {
      expect(data).toBeDefined();
    }

    return pc.promotePackage({
      sourceRepo: "saldo/test",
      destination: "dest/repo",
      distroFqname: "gems",
      filename: 'packagecloud-test-gem'}).then(resolve);
  });
});

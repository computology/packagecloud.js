/**
 * Get package information for Debian and RPM packages.
 * @module src/modules/showPackage
 * @param {Object} superagent request object.
 * @param {Object} options - Repository options.
 * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
 * @param {string} options.type - The type of package, supported: deb, rpm.
 * @param {string} options.distro - The distribution name, i.e., 'ubuntu'.
 * @param {string} options.distroVersion - The distribution version, i.e., 'precise'.
 * @param {string} options.name - The name of the package.
 * @param {string} options.arch - The architecture of the package. NOTE: debs use amd64 while rpms use x86_64 for arch.
 * @param {string} options.version - The version of the package without epoch.
 * @param {string} options.release - &lt;Optional&gt; The release, if the package contains one.
 * @return {Promise} The superagent promise object.
 */
export default function(request, options) {
  if(!options) {
    throw new Error("show package requires the following options: type, distro, distroVersion, name, arch, version");
  }
  
  if(!options.repo || options.repo.split("/").length < 2) {
    throw new Error("Repository path must be in the fully-qualified format - {repo: 'user/repo'}");
  }

  const RequiredFields = ['type', 'distro', 'distroVersion', 'name', 'arch', 'version'];

  RequiredFields.forEach(function(field) {
    if (!(field in options)) {
      throw new Error("missing field: " + field)
    } 
  });
  var packageType = options.type,
      distro = options.distro,
      distroVersion = options.distroVersion,
      packageName = options.name,
      arch = options.arch,
      pkgVersion = options.version,
      release = options.release;

  if(release) {
    release = release + ".json";
  } else {
    pkgVersion = pkgVersion + ".json";
  }
  var url = [request.baseUrl + "/api/v1/repos", options.repo, "package", packageType, distro, options.version,
             packageName, arch, pkgVersion, release].join("/").replace(/\/+$/, ""); // remove trailing slash

  return request.get(url);
}

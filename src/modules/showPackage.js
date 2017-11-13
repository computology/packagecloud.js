import validateOptions from './validateOptions';
/**
 * Get package information for Debian and RPM packages.
 * @module src/modules/showPackage
 * @param {Object} superagent request object.
 * @param {Object} options - Repository options.
 * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
 * @param {string} options.type - The type of package, supported: deb, rpm.
 * @param {string} options.distro - The distribution name, i.e., 'ubuntu'.
 * @param {string} options.distroVersion - The distribution version, i.e., 'precise'.
 * @param {string} options.packageName - The name of the package.
 * @param {string} options.arch - The architecture of the package. NOTE: debs use amd64 while rpms use x86_64 for arch.
 * @param {string} options.version - The version of the package without epoch.
 * @param {string} options.release - &lt;Optional&gt; The release, if the package contains one.
 * @return {Promise} The superagent promise object.
 */
export default (request, options) => {

  validateOptions(options, ['repo', 'type', 'distro', 'distroVersion', 'packageName', 'arch', 'version']);

  let [version, release] = [options.version, options.release];

  if(options.release) {
    release = options.release + ".json";
  } else {
    version = options.version + ".json";
  }

  return request.get([options.baseUrl + "repos",
                      options.repo, "package",
                      options.type, options.distro,
                      options.distroVersion, options.packageName,
                      options.arch, version, release].join("/").replace(/\/+$/, ""));
}

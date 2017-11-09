import ValidateOptions from './validateOptions';
/**
 * Get package information for RubyGem, Python, and Java packages.
 * @module src/modules/showVersionedPackage
 * @param {Object} superagent request object.
 * @param {Object} options - Repository options.
 * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
 * @param {string} options.type - The type of package, supported types: gem, python, java.
 * @param {string} options.packageName - The name of the package.
 * @param {string} options.version - The version number of the package.
 * @return {Promise} The superagent promise object.
 */
export default (request, options) => {
  ValidateOptions(options, ['repo', 'type', 'packageName', 'version']);

  var repo = options.repo,
      name = options.packageName,
      version = options.version,
      packageType = privateMethods.versionedPackageString(options.type);
  var url = [options.baseUrl + "/api/v1/repos", repo, "package", packageType, name, version + ".json"].join("/");

  return request.get(url);
}

const privateMethods = {
  versionedPackageString(string) {
    switch (string) {
    case "java":
      return "java/maven2";
    case "gem":
      return string;
    case "python":
      return string;
    }
  }
}

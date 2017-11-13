import validateOptions from './validateOptions';
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
  validateOptions(options, ['repo', 'type', 'packageName', 'version']);

  let repo = options.repo,
      name = options.packageName,
      version = options.version,
      packageType = privateMethods.versionedPackageString(options.type);

  return request.get([options.baseUrl + "repos",
                      repo, "package", packageType,
                      name, version + ".json"].join("/"));
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

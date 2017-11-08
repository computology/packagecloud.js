/**
 * Get package information for RubyGem, Python, and Java packages.
 * @module src/modules/showVersionedPackage
 * @param {Object} superagent request object.
 * @param {Object} options - Repository options.
 * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
 * @param {string} options.type - The type of package, supported types: gem, python, java.
 * @param {string} options.name - The name of the package.
 * @param {string} options.version - The version number of the package.
 * @return {Promise} The superagent promise object.
 */
export default (request, options) => {
  if(!options || options.repo.split("/").length < 2) {
    throw new Error("Repository path must be in the fully-qualified format - {repo: 'user/repo', ...}");
  }
  const RequiredFields = ['name', 'version'];

  RequiredFields.forEach(function(field) {
    if (!(field in options)) {
      throw new Error("missing field: " + field)
    } 
  });
  var repo = options.repo,
      name = options.name,
      version = options.version,
      packageType = privateMethods.versionedPackageString(options.type);
  var url = [request.baseUrl + "/api/v1/repos", repo, "package", packageType, name, version + ".json"].join("/");

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

import request from 'superagent';

/**
 * PackageCloud API JavaScript Client.
 * @module src/packagecloud
 * @param {string} token - a packagecloud API Token.
 * @param {string} baseUrl - URL to the packagecloud API.
 */
export default function(token, baseUrl) {

  if(!token) {
    throw new Error("packagecloud API token is required");
  }

  var baseUrl = baseUrl ? baseUrl.replace(/\/+$/, "") : null;
  
  this.token = token;
  this.isBrowser = new Function("try {return this===window;}catch(e){ return false;}")();
  this.baseUrl = baseUrl;

  if (this.isBrowser && !this.baseUrl) {
    baseUrl = this.baseUrl = window.location.origin;
  }

  /**
   * Create a repository.
   * @param {Object} options - Repository options.
   * @param {string} options.name - The repository name.
   * @return {Promise} The superagent promise object.
   */
  this.createRepository = function(options) {
    if(!options || !options.name) {
      throw new Error("This method expects an object parameter with a name and value - {name: 'new-repo'}");
    }

    var privacy = options.privacy ? true : false;
    var body = JSON.stringify({'repository': {'name': options.name,
                                              'private': privacy }});
    return request.post(baseUrl + "/api/v1/repos.json")
      .type('json')
      .auth(token, '')
      .send(body);
  }

  /**
   * Get repository information.
   * @param {Object} options - Repository options.
   * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
   * @return {Promise} The superagent promise object.
   */
  this.getRepository = function(options) {
    if(!options.repo || options.repo.split("/").length < 2) {
      throw new Error("Repository path must be in the fully-qualified format - {repo: 'user/repo'}");
    }

    var url = [baseUrl + "/api/v1/repos", options.repo + ".json"].join("/");

    return request.get(url)
      .accept('json')
      .auth(token, '');
  }

  /**
   * Get a list of repositories for the authenticated user.
   * @return {Promise} The superagent promise object.
   */
  this.getRepositories = function() {
    return request.get(baseUrl + "/api/v1/repos.json")
      .accept('json')
      .auth(token, '');
  }

  /**
   * Get a list of supported distributions on packagecloud.
   * @return {Promise} The superagent promise object.
   */
  this.getDistributions = function() {
    return request.get(baseUrl + "/api/v1/distributions.json")
      .accept('json')
      .auth(token, '');
  }

  /**
   * Get a list of packages from a repository.
   * @param {Object} options - Repository options.
   * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
   * @return {Promise} The superagent promise object.
   */
  this.listPackages = function(options) {
    if(!options || !options.repo || options.repo.split("/").length < 2) {
      throw new Error("Repository path must be in the fully-qualified format - {repo: 'user/repo'}");
    }
    var url = [baseUrl + "/api/v1/repos", options.repo, "packages.json"].join("/");
    return request.get(url)
      .accept('json')
      .auth(token, '');
  }

  /**
   * Delete a package.
   * @param {string} URL of the package to delete. NOTE: URL is returned from showPackage and showVersionedPackage methods.
   * @return {Promise} The superagent promise object.
   */
  this.deletePackage = function(url) {
    return request.delete(url)
      .accept('json')
      .auth(token, '');
  }

  /**
   * Upload a package.
   * @param {Object} options - Repository options.
   * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
   * @param {string} options.file - The file to upload, must be a File object (browser). Buffer or ./path/to/file (NodeJS).
   * @param {string} options.filename - The filename of the package.
   * @return {Promise} The superagent promise object.
   */
  this.putPackage = function(options) {
    if(!options.repo || options.repo.split("/").length < 2) {
      throw new Error("Repository path must be in the fully-qualified format - user/repo");
    }
    if(!options.file) {
      throw new Error("Expects an object with string file path (node) or File (browser) as a value");
    }
    if(!options.filename) {
      throw new Error("Expects a filename");
    }

    var url = [baseUrl + "/api/v1/repos", options.repo, "packages.json"].join("/");

    if(this.isBrowser) {
      return browserUpload(url, options);
    } else {
      return serverUpload(url, options);
    }
  }

  /**
   * Get package information for Debian and RPM packages.
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
  this.showPackage = function(options) {
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
    var url = [baseUrl + "/api/v1/repos", options.repo, "package", packageType, distro, options.version,
               packageName, arch, pkgVersion, release].join("/").replace(/\/+$/, ""); // remove trailing slash

    return request.get(url)
      .accept('json')
      .auth(token, '');
  }
  
  /**
   * Get package information for RubyGem, Python, and Java packages.
   * @param {Object} options - Repository options.
   * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
   * @param {string} options.type - The type of package, supported types: gem, python, java.
   * @param {string} options.name - The name of the package.
   * @param {string} options.version - The version number of the package.
   * @return {Promise} The superagent promise object.
   */
  this.showVersionedPackage = function(options) {
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
        packageType = versionedPackageString(options.type);
    var url = [baseUrl + "/api/v1/repos", repo, "package", packageType, name, version + ".json"].join("/");

    return request.get(url)
      .accept('json')
      .auth(token, '');
  }

  /**
   * Get package information for RubyGem packages.
   * @param {Object} options - Repository options.
   * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
   * @param {string} options.name - The name of the gem package.
   * @param {string} options.version - The version number of the gem package.
   * @return {Promise} The superagent promise object.
   */
  this.showGemPackage = function(options) {
    if(!options || options.repo.split("/").length < 2) {
      throw new Error("Repository path must be in the fully-qualified format - {repo: 'user/repo', ...}");
    }
    options.type = "gem";
    return this.showVersionedPackage(options);
  }

  /**
   * Get package information for Python packages.
   * @param {Object} options - Repository options.
   * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
   * @param {string} options.name - The name of the gem package.
   * @param {string} options.version - The version number of the python package.
   * @return {Promise} The superagent promise object.
   */
  this.showPythonPackage = function(options) {
    if(!options || options.repo.split("/").length < 2) {
      throw new Error("Repository path must be in the fully-qualified format - {repo: 'user/repo', ...}");
    }
    options.type = "python";
    return this.showVersionedPackage(options);
  }

  /**
   * Get package information for Java packages.
   * @param {Object} options - Repository options.
   * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
   * @param {string} options.name - The name of the gem package.
   * @param {string} options.version - The version number of the gem package.
   * @return {Promise} The superagent promise object.
   */
  this.showJavaPackage = function(options) {
    if(!options || options.repo.split("/").length < 2) {
      throw new Error("Repository path must be in the fully-qualified format - {repo: 'user/repo', ...}");
    }
    options.type = "java";
    return this.showVersionedPackage(options);
  }

  var versionedPackageString = function(string) {
    switch (string) {
    case "java":
      return "java/maven2";
    case "gem":
      return string;
    case "python":
      return string;
    }
  }

  var browserUpload = function(url, options) {
    var reader = new FileReader();

    reader.onload = function(e) {
      var blob = new Blob([this.result], {type: 'application/octet-stream'});
      var fields = {}

      if(options.dist) {
        fields['package[distro_version_id]'] = options.dist
      }

      request.post(url)
        .auth(token, '')
        .field(fields)
        .attach('package[package_file]', blob, {filename: options.filename});
    };

    reader.readAsArrayBuffer(options.file);

    return request.post(url)
      .auth(token, '');
  }

  var serverUpload = function(url, options) {
    var fields = {};

    if(options.dist) {
      fields['package[distro_version_id]'] = options.dist
    }

    return request.post(url)
      .auth(token, '')
      .field(fields)
      .attach('package[package_file]', options.file, {filename: options.filename});
  }
}

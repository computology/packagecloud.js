import request from 'superagent';

export default function(token, baseUrl) {
  var isBrowser = new Function("try {return this===window;}catch(e){ return false;}")();

  if(!token) {
    throw new Error("packagecloud API token is required");
    return;
  }

  if (isBrowser && !baseUrl) {
    var baseUrl = window.location.origin;
  }

  this.createRepository = function(options, success, error) {
    if(!options || !options.name) {
      throw new Error("This method expects an object parameter with a name and value - {name: 'new-repo'}")
      return;
    }

    var privacy = options.private ? true : false;
    var body = JSON.stringify({'repository': {'name': options.name,
                                              'private': privacy }});
    return request.post(baseUrl + "/api/v1/repos.json")
      .type('json')
      .auth(token, '')
      .send(body)
      .then(success, error);
  }

  this.showRepository = function(options, success, error) {
    if(!options.repo || options.repo.split("/").length < 2) {
      throw new Error("Repository path must be in the fully-qualified format - {repo: 'user/repo'}")
      return;
    }

    var url = [baseUrl + "/api/v1/repos", repo, ".json"].join("/");

    return request.get(url)
      .accept('json')
      .auth(token, '')
      .then(success, error);
  }

  this.getRepositories = function(success, error) {
    return request.get(baseUrl + "/api/v1/repos.json")
      .accept('json')
      .auth(token, '')
      .then(success, error);
  }

  this.getDistributions = function(success, error) {
    return request.get(baseUrl + "/api/v1/distributions.json")
      .accept('json')
      .auth(token, '')
      .then(success, error);
  }

  this.listPackages = function(options, success, error) {
    if(!options.repo || options.repo.split("/").length < 2) {
      throw new Error("Repository path must be in the fully-qualified format - {repo: 'user/repo'}")
      return;
    }
    var url = [baseUrl + "/api/v1/repos", repo, "packages.json"].join("/");
    return request.get(url)
      .accept('json')
      .auth(token, '')
      .then(success, error);
  }

  this.showPackage = function(options, success, error) {
    if(!options.repo || options.repo.split("/").length < 2) {
      throw new Error("Repository path must be in the fully-qualified format - {repo: 'user/repo', ...}")
      return;
    }
    var packageType = options.type,
        distro = options.distro,
        distroVersion = options.distroVersion,
        packageName = options.name,
        arch = options.arch,
        pkgVersion = options.version,
        release = options.release;

    var url = [baseUrl + "/api/v1/repos", repo, "package", packageType, distro, version,
               packageName, arch, pkgVersion, release].join("/");

        return request.get(url)
      .accept('json')
      .auth(token, '')
      .then(success, error);
  }

  this.showGemPackage = function(options, success, error) {
    options.type = "gem";
    return showVersionedPackage(options, success, error);
  }

  this.showPythonPackage = function(options, success, error) {
    options.type = "python";
    return showVersionedPackage(options, success, error);
  }

  this.showJavaPackage = function(options, success, error) {
    options.type = "java";
    return showVersionedPackage(options, success, error);
  }

  this.deletePackage = function(url, success, error) {
    return request.delete(url)
      .accept('json')
      .auth(token, '')
      .then(function(s){ return s.body }, error);
  }

  this.putPackage = function(options, success, error) {
    if(!options.repo || options.repo.split("/").length < 2) {
      throw new Error("Repository path must be in the fully-qualified format - user/repo")
      return
    }
    if(!options.file) {
      throw new Error("Expects an object with string file path (node) or File (browser) as a value")
      return
    }
    if(!options.filename) {
      throw new Error("Expects a filename")
      return
    }

    var url = [baseUrl + "/api/v1/repos", options.repo, "packages.json"].join("/");

    if(isBrowser) {
      browserUpload(url, options, success, error);
    } else {
      serverUpload(url, options, success, error);
    }
  }

  var showVersionedPackage = function(options, success, error) {
    if(!options.type) {
      throw new Error("Versioned package type is required (supports: java, gem, python) - {type: 'gem', ...}")
      return;
    }
    if(!options.repo || options.repo.split("/").length < 2) {
      throw new Error("Repository path must be in the fully-qualified format - {repo: 'user/repo', ...}")
      return;
    }
    if(!options.name) {
      throw new Error("Package name is expected - {name: 'packageName',...}")
      return;
    }
    if(!options.version) {
      throw new Error("Version is expected - {version: '0.1.1',...}")
      return;
    }
    var repo = options.repo,
        name = options.name,
        version = options.version,
        packageType = versionedPackageString(options.type);
    var url = [baseUrl + "/api/v1/repos", repo, "package", packageType, name, version + ".json"].join("/");

    return request.get(url)
      .accept('json')
      .auth(token, '')
      .then(success, error);
  }

  var versionedPackageString = function(string) {
    switch (string) {
    case "java":
      return "java/maven2";
    case "gem":
      return string;
    case "python":
      return string;
    default:
      throw new Error("Package type is not one of: java, gem, python")
      return;
    }
  }

  var browserUpload = function(url, options, success, error) {
    var reader = new FileReader();

    reader.onload = function(e) {
      var blob = new Blob([this.result], {type: 'application/octet-stream'});
      var fields = {}

      if(options.dist) {
        fields['package[distro_version_id]'] = options.dist
      }

      return request.post(url)
        .auth(token, '')
        .field(fields)
        .attach('package[package_file]', blob, {filename: options.filename})
        .then(success, error);
    };

    reader.readAsArrayBuffer(options.file);
  }

  var serverUpload = function(url, options, success, error) {
    var fields = {};

    if(options.dist) {
      fields['package[distro_version_id]'] = options.dist
    }

    return request.post(url)
      .auth(token, '')
      .field(fields)
      .attach('package[package_file]', options.file, {filename: options.filename})
      .then(success, error);
  }
}

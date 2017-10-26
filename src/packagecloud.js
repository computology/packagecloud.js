import window from "window";
import RestClient from "./client";
import Dispatcher from "./dispatcher";

function PackageCloud(token) {

  if(!token) {
    throw new Error("packagecloud API token is required");
    return;
  }

  var pc = this,
      client = this.client = new Dispatcher(new RestClient(token));

  this.createRepository = function(repo, isPrivate) {
    var body = JSON.stringify({'repository': {'name': repo,
                                              'private': isPrivate }});
    return client.post("repos.json", body, "application/json");
  }

  this.showRepository = function(repo) {
    var url = ["repos", repo, ".json"].join("/");
    return client.get(url);
  }

  this.getRepositories = function() {
    return client.get("repos.json");
  }

  this.getDistributions = function() {
    return client.get("distributions.json");
  }
  
  this.listPackages = function(repo) {
    var url = ["repos", repo, "packages.json"].join("/");
    return client.get(url);
  }

  this.showPackageContents = function(repo, file, contentType) {
    var url = ["repos", repo, "packages", "contents.json"].join("/");
    return client.post(url, file, contentType);
  }
  
  this.deletePackage = function(repo, distro, distro_release, package_filename) {
    var url = ["repos", repo, distro,
               distro_release, package_filename].join("/");
    return client.delete(url);
  }

  this.uploadPackage = function(repo, file, dist) {
    var url = ["repos", repo, "packages.json"].join("/");
    var contentType = client.client.payload.multipart.contentType();
    var reader = new FileReader();

    reader.onload = function(e) {
      var parts = client.client.payload.multipart.createFileFields(dist, file.name);
      parts.splice(1, 0, this.result);
      var blob = new Blob(parts);
      return client.post(url, blob, contentType);
    };
    
    reader.readAsArrayBuffer(file);
  }
}

if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = PackageCloud;
} else {
  window.PackageCloud = PackageCloud;
}

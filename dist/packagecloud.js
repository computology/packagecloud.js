(function (window) {
'use strict';

window = window && window.hasOwnProperty('default') ? window['default'] : window;

function Client(token) {
  this.token = token;

  this.payload = {
    multipart: {
      boundary: function() {
        var epochTicks = 621355968000000000,
            totalTicks = epochTicks + ((new Date).getTime() * 10000);

        var randstring = function(len) {
          var rand = Math.floor((Math.random() * 1000000) + len);
          return rand.toString(16);
        };
        
        return randstring(8) + totalTicks;
      }(),

      contentType: function() {
        return "multipart/form-data; boundary=" + this.boundary;
      },

      createFileFields: function(dist, filename) {
        var boundary = this.boundary,
            header = "--"+boundary+"\r\n",
            contents = "",
            distContents = "",
            footer = "\r\n--"+boundary+"--\r\n";

        if (dist) {
          distContents+="\r\n"+header+"Content-Disposition: form-data; name=\"package[distro_version_id]\"\r\n";
          distContents+="\r\n"+dist+"";
        }

        contents+=header+"Content-Disposition: form-data; name=\"package[package_file]\"; filename=\""+filename+"\"\r\n";
        contents+="Content-Transfer-Encoding: binary\r\n";
        contents+="Content-Type: "+"application/octet-stream"+"\r\n\r\n";

        return [contents, distContents, footer];
      },
    }
  };

  this.request = function(method, url, data, contentType) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(method, "/api/v1/" + url, true);
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa(token + ":"));
      if (method === "POST") {
        xhr.setRequestHeader("Content-Type", contentType);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if(xhr.status === 200 || xhr.status === 201) {
            resolve(xhr.responseText);
          } else {
            reject(xhr.responseText);
          } 
        }
      };

      xhr.send(data);
    });
  };
}

function Dispatcher(client) {
  this.client = client;

  this.get = function(url) {
    return client.request("GET", url);
  },
  this.post = function(url, data, contentType) {
    return client.request("POST", url, data, contentType);
  },
  this.delete = function(url) {
    return client.request("DELETE", url);
  };

}

function PackageCloud(token) {

  if(!token) {
    throw new Error("packagecloud API token is required");
    return;
  }

  var pc = this,
      client = this.client = new Dispatcher(new Client(token));

  this.createRepository = function(repo, isPrivate) {
    var body = JSON.stringify({'repository': {'name': repo,
                                              'private': isPrivate }});
    return client.post("repos.json", body, "application/json");
  };

  this.showRepository = function(repo) {
    var url = ["repos", repo, ".json"].join("/");
    return client.get(url);
  };

  this.getRepositories = function() {
    return client.get("repos.json");
  };

  this.getDistributions = function() {
    return client.get("distributions.json");
  };
  
  this.listPackages = function(repo) {
    var url = ["repos", repo, "packages.json"].join("/");
    return client.get(url);
  };

  this.showPackageContents = function(repo, file, contentType) {
    var url = ["repos", repo, "packages", "contents.json"].join("/");
    return client.post(url, file, contentType);
  };
  
  this.deletePackage = function(repo, distro, distro_release, package_filename) {
    var url = ["repos", repo, distro,
               distro_release, package_filename].join("/");
    return client.delete(url);
  };

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
  };
}

if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = PackageCloud;
} else {
  window.PackageCloud = PackageCloud;
}

}(window));

export default function Client(token) {
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
  }

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
  }
}

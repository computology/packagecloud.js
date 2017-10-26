export default function Dispatcher(client) {
  this.client = client;

  this.get = function(url) {
    return client.request("GET", url);
  },
  this.post = function(url, data, contentType) {
    return client.request("POST", url, data, contentType);
  },
  this.delete = function(url) {
    return client.request("DELETE", url);
  }
}

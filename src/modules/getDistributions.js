/**
 * Get a list of supported distributions on packagecloud.
 * @module src/modules/getDistributions
 * @param {Object} superagent request object.
 * @return {Promise} The superagent promise object.
 */
export default function(request) {
  return request.get(request.baseUrl + "/api/v1/distributions.json");
}

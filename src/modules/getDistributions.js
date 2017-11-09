/**
 * Get a list of supported distributions on packagecloud.
 * @module src/modules/getDistributions
 * @param {Object} superagent request object.
 * @return {Promise} The superagent promise object.
 */
export default (request, options) => {
  return request.get(options.baseUrl + "/api/v1/distributions.json");
}

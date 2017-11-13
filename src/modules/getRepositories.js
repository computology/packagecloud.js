/**
 * Get a list of repositories for the authenticated user.
 * @module src/modules/getRepositories
 * @param {Object} superagent request object.
 * @return {Promise} The superagent promise object.
 */
export default (request, options) => {
  return request.get(options.baseUrl + "repos.json");
}

/** Get a list of repositories for the authenticated user.
 * @module src/modules/getRepositories
 * @param {Object} superagent request object.
 * @return {Promise} The superagent promise object.
 */
export default function(request) {
  return request.get(request.baseUrl + "/api/v1/repos.json");
}

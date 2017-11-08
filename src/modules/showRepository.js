/** Show repository information.
 * @module src/modules/getRepository
 * @param {Object} superagent request object.
 * @param {Object} options - Repository options.
 * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
 * @return {Promise} The superagent promise object.
 */
export default (request, options) => {
  if(!options.repo || options.repo.split("/").length < 2) {
    throw new Error("Repository path must be in the fully-qualified format - {repo: 'user/repo'}");
  }

  var url = [request.baseUrl + "/api/v1/repos", options.repo + ".json"].join("/");

  return request.get(url);
}

import ValidateOptions from './validateOptions';

/** Show repository information.
 * @module src/modules/getRepository
 * @param {Object} superagent request object.
 * @param {Object} options - Repository options.
 * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
 * @return {Promise} The superagent promise object.
 */
export default (request, options) => {

  ValidateOptions(options, ['repo']);

  var url = [options.baseUrl + "/api/v1/repos", options.repo + ".json"].join("/");

  return request.get(url);
}

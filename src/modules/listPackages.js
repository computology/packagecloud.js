import ValidateOptions from './validateOptions';
/**
 * Get a list of packages from a repository.
 * @module src/modules/listPackages
 * @param {Object} superagent request object.
 * @param {Object} options - Repository options.
 * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
 * @return {Promise} The superagent promise object.
 */
export default (request, options) => {

  ValidateOptions(options, ['repo']);
  
  var url = [options.baseUrl + "/api/v1/repos", options.repo, "packages.json"].join("/");

  return request.get(url);  
}

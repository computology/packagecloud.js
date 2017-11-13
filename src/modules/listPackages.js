import validateOptions from './validateOptions';
/**
 * Get a list of packages from a repository.
 * @module src/modules/listPackages
 * @param {Object} superagent request object.
 * @param {Object} options - Repository options.
 * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
 * @return {Promise} The superagent promise object.
 */
export default (request, options) => {

  validateOptions(options, ['repo']);

  return request.get([options.baseUrl + "repos",
                      options.repo, "packages.json"].join("/"));
}

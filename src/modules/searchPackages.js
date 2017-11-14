import validateOptions from './validateOptions';
/**
 * Search for packages in a repository.
 * @module src/modules/searchPackages
 * @param {Object} superagent request object.
 * @param {Object} options - Search options.
 * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
 * @param {string} options.filename - The query string to search for package filename.
 * @param {string} options.type - The type of package to search, supports: all, debs, gems, rpms, python, dscs, java.
 * @param {string} options.dist - Overrides options.type. The name of the distribution the package is intended for. (i.e., ubuntu, el/6)
 * @param {string} options.perPage - The number of packages to return from the results set, default is 30.
 * @return {Promise} The superagent promise object.
 */
export default (request, options) => {

  validateOptions(options, ['repo']);

  let payload = { 'q': options.filename || '',
                  'filter': options.type,
                  'dist': options.dist,
                  'perPage': options.perPage };

  return request
    .get([options.baseUrl + "repos", options.repo, "search.json"].join("/"))
    .query(payload);
}

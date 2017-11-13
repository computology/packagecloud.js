import validateOptions from './validateOptions';

/** Create a repository.
 * @module src/modules/createRepository
 * @param {Object} superagent request object.
 * @param {Object} options - Repository options.
 * @param {string} options.name - The repository name.
 * @return {Promise} The superagent promise object.
 */
export default (request, options) => {

  validateOptions(options, ['name']);

  let [privacy, name] = [(options.privacy ? true : false), options.name];

  let payload = {'repository': {'name': name,'private': privacy}};
  
  return request
    .post(options.baseUrl + "repos.json")
    .send(payload);
}

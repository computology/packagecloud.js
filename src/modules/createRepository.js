import ValidateOptions from './validateOptions';

/** Create a repository.
 * @module src/modules/createRepository
 * @param {Object} superagent request object.
 * @param {Object} options - Repository options.
 * @param {string} options.name - The repository name.
 * @return {Promise} The superagent promise object.
 */
export default (request, options) => {

  ValidateOptions(options, ['name']);

  var privacy = options.privacy ? true : false;
  var name = options.name;
  var body = JSON.stringify({'repository': {'name': name,
                                            'private': privacy }});

  return request
    .post(options.baseUrl + "/api/v1/repos.json")
    .send(body);
}

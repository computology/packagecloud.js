/** Create a repository.
 * @module src/modules/createRepository
 * @param {Object} superagent request object.
 * @param {Object} options - Repository options.
 * @param {string} options.name - The repository name.
 * @return {Promise} The superagent promise object.
 */
export default (request, options) => {
  if(!options || !options.name) {
    throw new Error("This method expects an object parameter with a name and value - {name: 'new-repo'}");
  }

  var privacy = options.privacy ? true : false;
  var name = options.name;

  var body = JSON.stringify({'repository': {'name': name,
                                            'private': privacy }});
  return request.post(request.baseUrl + "/api/v1/repos.json")
    .send(body);
}

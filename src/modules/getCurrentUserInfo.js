/**
 * Get the authenticated user's information
 * @module src/modules/getCurrentUserInfo
 * @param {Object} superagent request object.
 * @return {Promise} The superagent promise object.
 */
export default (request, options) => {
  return request.get(options.baseUrl + "me.json");
}

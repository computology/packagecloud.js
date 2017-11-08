/**
 * Delete a package.
 * @module src/modules/deletePackage
 * @param {Object} superagent request object.
 * @param {string} URL - URL of the package to delete. NOTE: URL is returned from showPackage and showVersionedPackage methods.
 * @return {Promise} The superagent promise object.
 */
export default (request, url) => {
  return request.delete(url);
}

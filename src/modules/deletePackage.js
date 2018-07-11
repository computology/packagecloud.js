/**
 * Delete a package.
 * @module src/modules/deletePackage
 * @param {Object} superagent request object.
 * @param {string} options.url - URL of the package to delete. NOTE: URL is returned from showPackage and showVersionedPackage methods.
 * @param {string} options.scope - &lt;Optional&gt; Scope for Node packages.
 * @return {Promise} The superagent promise object.
 */
export default (request, options) => {

  if(!options || !options.url) {
    throw new Error("Missing URL from options");
  }
  
  let url = options.url;

  return request.delete(url)
    .send({ scope: options.scope });
}

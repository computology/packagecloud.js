/**
 * Delete a package.
 * @module src/modules/deletePackage
 * @param {Object} superagent request object.
 * @param {Object} options - Promote package options.
 * @param {string} options.repository - The fully-qualified name for the source repository, i.e., 'username/sourcerepo'.
 * @param {string} options.distroFqname - The fully-qualified distribution/version, i.e., 'ubuntu/precise'.
 * @param {string} options.group - The name of the group this package belongs to for Java packages.
 * @param {string} options.scope - The package scope. Required if deleting a scoped Node.JS package
 * @param {string} options.filename - The filename of the package.
 * @return {Promise} The superagent promise object.
 */
export default (request, options) => {
  let url = [options.baseUrl + "repos",
             options.repository,
             options.distroFqname,
             options.group,
             options.filename].filter(Boolean).join("/");
  
  return request.delete(url)
    .send({ scope: options.scope });
}

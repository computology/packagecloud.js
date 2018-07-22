/**
 * Promote a package.
 * @module src/modules/promotePackage
 * @param {Object} options - Promote package options.
 * @param {string} options.sourceRepo - The fully-qualified name for the source repository, i.e., 'username/sourcerepo'.
 * @param {string} options.destination - The fully-qualified destination repository name, i.e., 'username/destrepo'.
 * @param {string} options.distroFqname - The fully-qualified distribution/version, i.e., 'ubuntu/precise'.
 * @param {string} options.group - The name of the group this package belongs to for Java packages.
 * @param {string} options.scope - The package scope. Required if deleting a scoped Node.JS package
 * @param {string} options.filename - The filename of the package.
 */
export default (request, options) => {
  let url = [options.baseUrl + "repos",
             options.sourceRepo,
             options.distroFqname,
             options.group,
             options.filename,
             "promote.json"].filter(Boolean).join("/");

  return request
    .post(url)
    .send({ destination: options.destination,
            group: options.group,
            scope: options.scope });
}

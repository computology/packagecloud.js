/**
 * Promote a package.
 * @module src/modules/promotePackage
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

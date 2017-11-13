/**
 * Validate list of options for packagecloud API requests.
 * @module src/modules/validateOptions
 * @param {Object} options - Repository options.
 * @param {Array} requiredFields - An array of strings containing field names to validate for the API endpoint.
 * @return {Promise} The superagent promise object.
 */
export default (options, requiredFields) => {

  let opts = options || {};

  requiredFields.forEach(function(field) {
    if (!(field in opts)) {
      if(field === "token") {
        throw new Error("packagecloud API token is required: {token: packagecloud_api_token}");
      } else {
        throw new Error(`missing field: ${field}`);
      }
    } else if (!opts[field]) {
      throw new Error(`${field} cannot be null or undefined`);
    }

    switch(field) {
    case 'repo':
      if(opts.repo.split("/").length < 2) {
        throw new Error("The repo field must be in the format: username/reponame");
      }
      break;
    }
  });
}

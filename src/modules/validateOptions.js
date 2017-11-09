/**
 * Validate list of options for packagecloud API requests.
 * @module src/modules/validateOptions
 * @param {Object} options - Repository options.
 * @param {Array} requiredFields - An array of strings containing field names to validate for the API endpoint.
 * @return {Promise} The superagent promise object.
 */
export default (options, requiredFields) => {
  requiredFields.forEach(function(field) {
    if (!(field in options)) {
      throw new Error("missing field: " + field)
    }

    switch(field) {
    case 'repo':
      if(options.repo.split("/").length < 2) {
        throw new Error("The repo field must be in the format: username/reponame");
      }
      break;
    }
  });
}

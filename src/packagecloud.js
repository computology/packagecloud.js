import request from 'superagent';
import createRepository from './modules/createRepository';
import showRepository from './modules/showRepository';
import getRepositories from './modules/getRepositories';
import getDistributions from './modules/getDistributions';
import listPackages from './modules/listPackages';
import deletePackage from './modules/deletePackage';
import uploadPackage from './modules/uploadPackage';
import uploadPackageFromBrowser from './modules/uploadPackageFromBrowser';
import showPackage from './modules/showPackage';
import showVersionedPackage from './modules/showVersionedPackage';

/** JavaScript Client for the packagecloud API.
 */
export default class {
  /** Create the API Client with credentials
   * @class
   * @param {string} token - a packagecloud API Token.
   * @param {string} baseUrl - URL to the packagecloud API.
   */
  constructor(token, baseUrl) {
    if(!token) {
      throw new Error("packagecloud API token is required");
    }

    this.token = token;
    this.baseUrl = request.baseUrl = baseUrl ? baseUrl.replace(/\/+$/, "") : "";
  }

  /** Create a repository.
   * @param {Object} options - Repository options.
   * @param {string} options.name - The repository name.
   * @return {Promise} The superagent promise object.
   */
  createRepository(options) {
    return createRepository(request, options)
      .type('json')
      .auth(this.token, '');
  }

  /** Show repository information.
   * @param {Object} options - Repository options.
   * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
   * @return {Promise} The superagent promise object.
   */
  showRepository(options) {
    return showRepository(request, options)
      .accept('json')
      .auth(this.token, '');
  }

  /** Get a list of repositories for the authenticated user.
   * @return {Promise} The superagent promise object.
   */
  getRepositories() {
    return getRepositories(request)
      .accept('json')
      .auth(this.token, '');
  }

  /**
   * Get a list of supported distributions on packagecloud.
   * @return {Promise} The superagent promise object.
   */
  getDistributions() {
    return getDistributions(request)
      .accept('json')
      .auth(this.token, '');
  }

  /**
   * Get a list of packages from a repository.
   * @param {Object} options - Repository options.
   * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
   * @return {Promise} The superagent promise object.
   */
  listPackages(options) {
    return listPackages(request, options)
      .accept("json")
      .auth(this.token, '');
  }

  /**
   * Delete a package.
   * @param {string} URL - URL of the package to delete. NOTE: URL is returned from showPackage and showVersionedPackage methods.
   * @return {Promise} The superagent promise object.
   */
  deletePackage(url) {
    return deletePackage(request, url)
      .accept("json")
      .auth(this.token, '');
  }

  /**
   * Upload a package.
   * @param {Object} options - Repository options.
   * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
   * @param {string} options.file - The file to upload, must be a File object (browser). Buffer or ./path/to/file (NodeJS).
   * @param {string} options.filename - The filename of the package.
   * @return {Promise} The superagent promise object.
   */
  uploadPackage(options) {
    return uploadPackage(request, options)
      .accept("json")
      .auth(this.token, '');
  }

  /**
   * Upload a package from the browser.
   * @param {Object} options - Repository options.
   * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
   * @param {string} options.file - The file to upload, must be a File object (browser). Buffer or ./path/to/file (NodeJS).
   * @param {string} options.filename - The filename of the package.
   * @return {Promise} The superagent promise object.
   */
  uploadPackageFromBrowser(options) {
    return uploadPackageFromBrowser(request, options)
      .accept("json")
      .auth(this.token, '');
  }
  
  /**
   * Get package information for Debian and RPM packages.
   * @param {Object} options - Repository options.
   * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
   * @param {string} options.type - The type of package, supported: deb, rpm.
   * @param {string} options.distro - The distribution name, i.e., 'ubuntu'.
   * @param {string} options.distroVersion - The distribution version, i.e., 'precise'.
   * @param {string} options.name - The name of the package.
   * @param {string} options.arch - The architecture of the package. NOTE: debs use amd64 while rpms use x86_64 for arch.
   * @param {string} options.version - The version of the package without epoch.
   * @param {string} options.release - &lt;Optional&gt; The release, if the package contains one.
   * @return {Promise} The superagent promise object.
   */
  showPackage(options) {
    return showPackage(request, options)
      .accept('json')
      .auth(this.token, '');
  }
  
  /**
   * Get package information for RubyGem, Python, and Java packages.
   * @param {Object} options - Repository options.
   * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
   * @param {string} options.type - The type of package, supported types: gem, python, java.
   * @param {string} options.name - The name of the package.
   * @param {string} options.version - The version number of the package.
   * @return {Promise} The superagent promise object.
   */
  showVersionedPackage(options) {
    return showVersionedPackage(request, options)
      .accept('json')
      .auth(this.token, '');
  }

  /**
   * Get package information for RubyGem packages.
   * @param {Object} options - Repository options.
   * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
   * @param {string} options.name - The name of the gem package.
   * @param {string} options.version - The version number of the gem package.
   * @return {Promise} The superagent promise object.
   */
  showGemPackage(options) {
    options.type = "gem";
    return this.showVersionedPackage(options);
  }

  /**
   * Get package information for Python packages.
   * @param {Object} options - Repository options.
   * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
   * @param {string} options.name - The name of the gem package.
   * @param {string} options.version - The version number of the python package.
   * @return {Promise} The superagent promise object.
   */
  showPythonPackage(options) {
    options.type = "python";
    return this.showVersionedPackage(options);
  }

  /**
   * Get package information for Java packages.
   * @param {Object} options - Repository options.
   * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
   * @param {string} options.name - The name of the gem package.
   * @param {string} options.version - The version number of the gem package.
   * @return {Promise} The superagent promise object.
   */
  showJavaPackage(options) {
    options.type = "java";
    return this.showVersionedPackage(options);
  }
}

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
import validateOptions from './modules/validateOptions';

import { version as VERSION } from '../package.json';
const API_VERSION = "api/v1";

export default class packagecloud {
  /** JavaScript Client for the packagecloud API.
   * @class packagecloud
   * @param {Object} options - Repository options.
   * @param {string} options.token - a packagecloud API Token.
   * @param {string} options.baseUrl - &lt;Optional&gt;URL to the packagecloud API.
   */
  constructor(options) {
    validateOptions(options, ['token']);
    this.token = options.token;
    this.baseUrl = (options.baseUrl || 'https://packagecloud.io').replace(/\/+$/, "");
    this.requestOptions = {
      baseUrl: `${this.baseUrl}/${API_VERSION}/`
    };
  }

  setHeaders(request) {
    return request
      .auth(this.token, '')
      .set({ 'X-packagecloud-JS-Client': VERSION });
  }

  /** Create a repository.
   * @param {Object} options - Repository options.
   * @param {string} options.name - The repository name.
   * @return {Promise} The superagent promise object.
   */
  createRepository(options) {
    let opts = Object.assign({}, this.requestOptions, options);
    return this.setHeaders(createRepository(request, opts));
  }

  /** Show repository information.
   * @param {Object} options - Repository options.
   * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
   * @return {Promise} The superagent promise object.
   */
  showRepository(options) {
    let opts  = Object.assign({}, this.requestOptions, options);
    return this.setHeaders(showRepository(request, opts));
  }

  /** Get a list of repositories for the authenticated user.
   * @return {Promise} The superagent promise object.
   */
  getRepositories() {
    return this.setHeaders(getRepositories(request, this.requestOptions))
  }

  /**
   * Get a list of supported distributions on packagecloud.
   * @return {Promise} The superagent promise object.
   */
  getDistributions() {
    return this.setHeaders(getDistributions(request, this.requestOptions));
  }

  /**
   * Get a list of packages from a repository.
   * @param {Object} options - Repository options.
   * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
   * @return {Promise} The superagent promise object.
   */
  listPackages(options) {
    let opts = Object.assign({}, this.requestOptions, options);
    return this.setHeaders(listPackages(request, opts));
  }

  /**
   * Delete a package.
   * @param {string} URL - URL of the package to delete. NOTE: URL is returned from showPackage and showVersionedPackage methods.
   * @return {Promise} The superagent promise object.
   */
  deletePackage(url) {
    return this.setHeaders(deletePackage(request, url));
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
    let opts = Object.assign({}, this.requestOptions, options);
    return this.setHeaders(uploadPackage(request, opts));
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
    let opts = Object.assign({}, this.requestOptions, options);
    return this.setHeaders(uploadPackageFromBrowser(request, opts));
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
    let opts = Object.assign({}, this.requestOptions, options);
    return this.setHeaders(showPackage(request, opts));
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
    let opts = Object.assign({}, this.requestOptions, options);
    return this.setHeaders(showVersionedPackage(request, opts));
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

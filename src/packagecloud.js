import request from 'superagent';
import searchPackages from './modules/searchPackages';
import createRepository from './modules/createRepository';
import showRepository from './modules/showRepository';
import getCurrentUserInfo from './modules/getCurrentUserInfo';
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

  _setHeaders(request) {
    return request
      .auth(this.token, '')
      .set({ 'X-packagecloud-JS-Client': VERSION });
  }

  /** Create a repository.
   * @memberof! packagecloud#
   * @param {Object} options - Repository options.
   * @param {string} options.name - The repository name.
   * @param {boolean} options.privacy - Set the public or private status.
   * @return {Promise} The superagent promise object.
   */
  createRepository(options) {
    let opts = Object.assign({}, this.requestOptions, options);
    return this._setHeaders(createRepository(request, opts));
  }

  /** Show repository information.
   * @memberof! packagecloud#
   * @param {Object} options - Repository options.
   * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
   * @return {Promise} The superagent promise object.
   */
  showRepository(options) {
    let opts  = Object.assign({}, this.requestOptions, options);
    return this._setHeaders(showRepository(request, opts));
  }

  /** Get the authenticated user's information
   * @memberof! packagecloud#
   * @return {Promise} The superagent promise object.
   */
  getCurrentUserInfo() {
    return this._setHeaders(getCurrentUserInfo(request, this.requestOptions))
  }

  /** Get a list of repositories for the authenticated user.
   * @memberof! packagecloud#
   * @return {Promise} The superagent promise object.
   */
  getRepositories() {
    return this._setHeaders(getRepositories(request, this.requestOptions))
  }

  /** Get a list of supported distributions on packagecloud.
   * @memberof! packagecloud#
   * @return {Promise} The superagent promise object.
   */
  getDistributions() {
    return this._setHeaders(getDistributions(request, this.requestOptions));
  }

  /** Get a list of packages from a repository.
   * @memberof! packagecloud#
   * @param {Object} options - Repository options.
   * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
   * @return {Promise} The superagent promise object.
   */
  listPackages(options) {
    let opts = Object.assign({}, this.requestOptions, options);
    return this._setHeaders(listPackages(request, opts));
  }

  /** Search for packages in a repository.
   * @memberof! packagecloud#
   * @param {Object} options - Search options.
   * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
   * @param {string} options.filename - The query string to search for package filename.
   * @param {string} options.type - The type of package to search, supports: all, debs, gems, rpms, python, dscs, java.
   * @param {string} options.dist - Overrides options.type. The name of the distribution the package is intended for. (i.e., ubuntu, el/6)
   * @param {string} options.perPage - The number of packages to return from the results set, default is 30.
   * @return {Promise} The superagent promise object.
   */
  searchPackages(options) {
    let opts = Object.assign({}, this.requestOptions, options);
    return this._setHeaders(searchPackages(request, opts));
  }

  /** Delete a package.
   * @memberof! packagecloud#
   * @param {string} options.url - URL of the package to delete. NOTE: The URL for a package can be found in the
   * showPackage, listPackages and showVersionedPackage methods.
   * @param {string} options.scope - &lt;Optional&gt; Scope for Node packages.
   * @return {Promise} The superagent promise object.
   */
  deletePackage(url) {
    return this._setHeaders(deletePackage(request, url));
  }

  /** Upload a package.
   * @memberof! packagecloud#
   * @param {Object} options - Repository options.
   * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
   * @param {string} options.file - The file to be uploaded, must be a Buffer or ./path/to/file.
   * @param {string} options.filename - The filename of the package.
   * @return {Promise} The superagent promise object.
   */
  uploadPackage(options) {
    let opts = Object.assign({}, this.requestOptions, options);
    return this._setHeaders(uploadPackage(request, opts));
  }

  /** Upload a package from the browser.
   * @memberof! packagecloud#
   * @param {Object} options - Repository options.
   * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
   * @param {string} options.file - The file to be uploaded, must be a File object.
   * @param {string} options.filename - The filename of the package.
   * @return {Promise} The superagent promise object.
   */
  uploadPackageFromBrowser(options) {
    let opts = Object.assign({}, this.requestOptions, options);
    return this._setHeaders(uploadPackageFromBrowser(request, opts));
  }

  /** Get package information for Debian and RPM packages.
   * @memberof! packagecloud#
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
    return this._setHeaders(showPackage(request, opts));
  }

  /** Get package information for RubyGem, Python, and Java packages.
   * @memberof! packagecloud#
   * @param {Object} options - Repository options.
   * @param {string} options.repo - The fully-qualified repository name, i.e., 'username/reponame'.
   * @param {string} options.type - The type of package, supported types: gem, python, java.
   * @param {string} options.name - The name of the package.
   * @param {string} options.version - The version number of the package.
   * @return {Promise} The superagent promise object.
   */
  showVersionedPackage(options) {
    let opts = Object.assign({}, this.requestOptions, options);
    return this._setHeaders(showVersionedPackage(request, opts));
  }

  /** Get package information for RubyGem packages.
   * @memberof! packagecloud#
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

  /** Get package information for Python packages.
   * @memberof! packagecloud#
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

  /** Get package information for Java packages.
   * @memberof! packagecloud#
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

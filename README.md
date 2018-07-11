[![Build status](https://badge.buildkite.com/9791e408006343258cbdf3e383b6e6f5f662256438604923ae.svg)](https://buildkite.com/packagecloud/packagecloud-dot-js)

## packagecloud.js

JavaScript library for communicating with the [packagecloud.io](https://packagecloud.io) API.

* [Email](mailto:support@packagecloud.io)


## Implemented API Endpoints

* [Create Repository](https://packagecloud.io/docs/api#resource_repositories_method_create)
* [Delete Package](https://packagecloud.io/docs/api#resource_packages_method_destroy)
* [Get Distributions](https://packagecloud.io/docs/api#resource_distributions_method_index)
* [Get Repositories](https://packagecloud.io/docs/api#resource_repositories_method_index)
* [Get Repository](https://packagecloud.io/docs/api#resource_repositories_method_show)
* [List Debian and RPM Packages](https://packagecloud.io/docs/api#resource_packages_method_show)
* [List RubyGem, Python, and Java Packages](https://packagecloud.io/docs/api#resource_packages_method_gem_show)
* [Upload Package](https://packagecloud.io/docs/api#resource_packages_method_create)
* [Promote Package](https://packagecloud.io/docs/api#resource_packages_method_promote)

## Installation

  ```bash
npm install packagecloud
  ```
  or
  ```bash
yarn add packagecloud
  ```

## Creating a Client
In the browser:
```javascript
// i.e., Rails with a sprockets manifest
//= require packagecloud/dist/packagecloud.browser.js
...
// main.js
var pc = new PackageCloud('your_api_token', 'https://packagecloud.io');
```
Or in a NodeJS environment:
```javascript
import PackageCloud from "packagecloud";
const pc = new PackageCloud('your_api_token', 'https://packagecloud.io');
```

## Result objects

Every client API method call returns a ```Promise``` object, which is "thenable".
For example, the following code will fetch a list of distributions and return a
promise object that allows us to define what happens on success, or failure.

```javascript
var success = function(data) {
  console.log("success!", data);
}
var error = function(err) {
  console.log("error!", error);
}
pc.getDistribution().then(success, error)
```

## Copyright

Copyright (c) 2018 Computology, LLC

See LICENSE file for details.

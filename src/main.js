import PackageCloud from "./packagecloud";
if(new Function("try {return this===window;}catch(e){ return false;}")()) {
  window.PackageCloud = PackageCloud;  
} else {
  module.exports = PackageCloud;  
}

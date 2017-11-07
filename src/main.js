import packagecloud from "./packagecloud";
if(new Function("try {return this===window;}catch(e){ return false;}")()) {
  window.packagecloud = packagecloud;
} else {
  module.exports = packagecloud;
}

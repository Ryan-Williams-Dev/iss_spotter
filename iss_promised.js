const request = require('request-promise-native');
const { paramsHaveRequestBody } = require('request/lib/helpers');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(IPobj) {
  const IP = JSON.parse(IPobj).ip;
  const url = `https://freegeoip.app/json/${IP}`;
  return request(url);
};

const fetchISSFlyOverTimes = function(coordsObj) {
  const { latitude, longitude } = JSON.parse(coordsObj);
  const url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};
module.exports = {
  nextISSTimesForMyLocation
};
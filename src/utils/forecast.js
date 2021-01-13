const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=21f46e0bf973b813c85aa50068488cb8&query=" +
    encodeURIComponent(longitude) +
    "," +
    encodeURIComponent(latitude) +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to conenct to weather  service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees out"
      );
    }
  });
};

module.exports = forecast;

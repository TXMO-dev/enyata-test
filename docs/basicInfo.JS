module.exports = {
    openapi: "3.1", // present supported openapi version
    info: {
      title: "Enyata Test Incident API's", // short title.
      description: "An Incipent reporting system API test", //  desc.
      version: "1.0.0", // version number
      contact: {
        name: "Timothy Asigbey", // your name
        email: "asigbeytimothy@gmail.com", // your email
        url: "https://linkedin.com/in/asigbeytimothy", // your website
      },
    },
  };

  module.exports = {
    definition: {
      openapi: "3.1",
      info: {
        title: "Enyata Test Incident API's", // short title.
        description: "An Incipent reporting system API test", //  desc.
      version: "1.0.0", // version number
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
            name: "Timothy Asigbey", // your name
            email: "asigbeytimothy@gmail.com", // your email
            url: "https://linkedin.com/in/asigbeytimothy", // your website
          },
      },
      servers: [
        {
          url: "http://localhost:8081",
        },
      ],
    },
    apis: ["./../routes/client.routes","./../routes/reports.routes","./../routes/weather.routes"],
  };
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "Node.js API with Swagger",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./users.js","./product.js"]; 

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger JSON oluşturuldu.");
});

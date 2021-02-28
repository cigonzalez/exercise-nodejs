const fs = require("fs");
const http = require("http");
const axios = require("axios");

const URLSuppliers =
  "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
const URLCustomers =
  "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";

async function getData(URL) {
  const response = await axios.get(URL);
  return response.data;
}

const getFileContent = (callback) => {
  fs.readFile("index.html", (err, data) => {
    if (err) throw err;
    callback(data.toString());
  });
};

http
  .createServer((req, res) => {
    if (req.url === "/api/proveedores") {
      getData(URLSuppliers).then((suppliers) => {
        let suppliersTable =
          '<h1 class="text-center">Suppliers list</h1> \n \
            <table class="table table-striped"> \n \
                <thead> \n \
                    <tr> \n \
                    <th scope="col">ID</th> \n \
                    <th scope="col">Company name</th> \n \
                    <th scope="col">Contact</th> \n \
                    </tr> \n \
                </thead> \n \
            <tbody> \n';
        for (let s of suppliers) {
          suppliersTable += `<tr> \n \
                    <td>${s.idproveedor}</td> \n \
                    <td>${s.nombrecompania}</td> \n \
                    <td>${s.nombrecontacto}</td> \n \
                </tr>\n `;
        }
        suppliersTable += "</tbody> \n \
            </table>";
        getFileContent((data) =>
          res.end(data.replace("{{replace}}", suppliersTable))
        );
      });
    } else if (req.url === "/api/clientes") {
      getData(URLCustomers).then((customers) => {
        let customersTable =
          '<h1 class="text-center">Customers list</h1> \n \
            <table class="table table-striped"> \n \
                <thead> \n \
                    <tr> \n \
                    <th scope="col">ID</th> \n \
                    <th scope="col">Company name</th> \n \
                    <th scope="col">Contact</th> \n \
                    </tr> \n \
                </thead> \n \
            <tbody> \n';
        for (let c of customers) {
          customersTable += `<tr> \n \
                    <td>${c.idCliente}</td> \n \
                    <td>${c.NombreCompania}</td> \n \
                    <td>${c.NombreContacto}</td> \n \
                </tr>\n `;
        }
        customersTable += "</tbody> \n \
            </table>";
        getFileContent((data) =>
          res.end(data.replace("{{replace}}", customersTable))
        );
      });
    }
  })
  .listen(8081);

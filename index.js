const fs = require("fs");
const http = require("http")
const axios = require("axios")

// let fileContent = "";

const getFileContent = (callback) => {
    fs.readFile("index.html", (err, data) => {
        if (err) throw err;
        //fileContent = data.toString();
        callback(data.toString());
    })
    
}

// getFileContent(console.log);

// fs.writeFile("prueba.js", "contenido del archivo", (err) => {
//     if (err) throw err;
//     console.log("Archivo creado correctamente")
// })

const URLSuppliers = "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json"
const URLClients = "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json"

http.createServer((req, res) => {
    // const obj = [{name: "ana"}, {name: "maria"}]
    // getFileContent((data) => res.end(data))
    if (req.url === "/api/proveedores") {
        axios.get(URLSuppliers).then(function (response) {
            res.end(response)
            console.log("Suppliers")
        })
    } else if (req.url === "/api/clientes") {
        axios.get(URLClients).then(function (response) {
            res.end(response)
            console.log("Clients")
        })
    }
}).listen(8000)

// req.url




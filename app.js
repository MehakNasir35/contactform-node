//app.js
const http = require("http");
var fs = require("fs");
const PORT = 5000;



const server = http.createServer(async (req, res) => {
    //read file data
    var data = fs.readFileSync('data.json');
    //convert to json format
    var jsonData = JSON.parse(data);

    const headers = {
        "access-control-allow-origin": "*",
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': '*',
    }
    // options API
    if (req.method === "OPTIONS") {
        res.writeHead(204, headers);
        res.end();
        return;
    }

    // GET api (fetch users)
    else if (req.url === "/users" && req.method === "GET") {

        //read data from file
        fs.readFile('data.json', function (err, data) {

            if (err) {
                return console.error(err);
            } else {
                //send data to response
                res.writeHead(200, headers);
                res.end(data)
            }

        });
    }

    // POST api (Add users)
    else if (req.url === "/user" && req.method === "POST") {

        //get the data from request , change to string and then to json
        req.on('data', chunk => {
            //push body data to json array
            jsonData.push(JSON.parse(chunk.toString()));
        });

        //when request ends, call the listener 
        req.on('end', () => {
            //data type must be of string type or buffer 
            var newData = JSON.stringify(jsonData);
            // Append data to file
            fs.writeFile('data.json', newData, 'utf8', function (err) {
                if (err) throw err;
                // If no error
                res.writeHead(200, headers);
                res.end(newData)
            });
        })

    }

    //  DELETE api (delete user by id)
    else if (req.url.match(/user\/([0-9]+)/) && req.method === "DELETE") {

        const id = req.url.split("/")[2];

        //push body data to json array
        var result = jsonData.filter(jsonData => jsonData.id != id);
        var newData = JSON.stringify(result);

        fs.writeFile('data.json', newData, 'utf8', function (err) {
            if (err) throw err;
            // If no error
            res.writeHead(200, headers);
            res.end(newData)
        });

    }

    // GET api (GET user by id)
    else if (req.url.match(/user\/([0-9]+)/) && req.method === "GET") {
        const id = req.url.split("/")[2];

        var result = jsonData.find(jsonData => jsonData.id == id);

        res.writeHead(200, headers);
        res.end(JSON.stringify(result)
        )
    }

    //  PATCH api (update user by id)
    else if (req.url == "/user" && req.method === "PUT") {
        var updateUser
        var user
        //get the data from request , change to string and then to json
        req.on('data', chunk => {
            updateUser = JSON.parse(chunk.toString())
            user = jsonData.find(jsonData => jsonData.id == updateUser.id)
        });

        req.on('end', () => {
         
            //gte index of user and replace it with new user
           jsonData[jsonData.indexOf(user)] = updateUser

            var newData = JSON.stringify(jsonData);

            fs.writeFile('data.json', newData, 'utf8', function (err) {
                if (err) throw err;
                // If no error
                res.writeHead(200, headers);
                res.end(newData)
            });

        })


    }

    // No route present
    else {
        res.writeHead(405, headers);
        res.end(`${req.method} is not allowed for the request.`);
    }

});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});

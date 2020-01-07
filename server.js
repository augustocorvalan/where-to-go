// content of index.js
const http = require('http')
const url = require('url');
const fs = require('fs');
const port = 3000


const endpoints = {
	// TODO: fill out dictionary of endpoints
}

/* Set up server logic */
const requestHandler = (request, response) => {
	console.log(`Requested URL ${request.url}`);

	// get path name
	const pathName = __dirname + url.parse(request.url).pathname;
	const isFile = fs.lstatSync(pathName).isFile();

	// if it's a file return that
	if (isFile) {
		serveFile(response, pathName);
	// if it's in our endpoint dictionary, call the endpoint
	} else if (endpoints[pathName]) {
		endpoints[pathName](request, response);
	// if it's none of the above just 404
	} else {
		respond404(response);

	}

}

/* Bootstrap server */
const server = http.createServer(requestHandler)

server.listen(port, (err) => {
	if (err) {
		return console.log('something bad happened', err)
	}

	console.log(`server is listening on ${port}`)
});


/* Helpers */

function respond404 (response) {
	response.writeHead(404, {'Content-type':'text/plan'});
	response.write('Page Was Not Found');
	response.end();
} 

function serveFile(response, pathName) {
	// try to serve requested file if it exists, error otherwise
	fs.readFile(pathName, function(err, data){
		if (err) {
			// if page doesn't exist then just 404
			respond404(response);
		} else {
			// if page does exist send it over!
			response.writeHead(200, {'Content-type':'text/html'});
			response.write(data);
			response.end( );
		}
	});
}
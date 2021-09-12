const util = require('util');
const exec = util.promisify(require('child_process').exec);
const http = require('http');
const path = require('path');
const readline = require('readline');

const { getReqData } = require("./utils");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question("Enter project path:", async input => {
	const pathArr = input.split('/')
	const dirPathJoined = path.join('/', ...pathArr)

	rl.close()

	const HOSTNAME = '127.0.0.1';
	const PORT = 7095;

	const server = http.createServer(async (req, res) => {
		res.statusCode = 200
		res.setHeader('Content-Type', 'text/plain')
		res.end('Hello World')

		if (req.url !== '/update-portal-app') {
			return
		}

		const reqData = await getReqData(req)

		console.log(reqData)

		// const execCommand = async (dirPathJoined, command) => {
		// 	const { error, stderr, stdout } = await exec(command, { cwd: dirPathJoined });
		
		// 	if (error) {
		// 		console.log(`error: ${error.message}`);
		// 		return;
		// 	}
		
		// 	if (stderr) {
		// 		console.log(`stderr: ${stderr}`);
		// 		return;
		// 	}
		
		// 	console.log(`stdout: ${stdout}`);
		// }
		
		// await execCommand(dirPathJoined, 'ls')
		// await execCommand(dirPathJoined, 'docker-compose down')
		// await execCommand(dirPathJoined, 'git fetch origin')
		// await execCommand(dirPathJoined, 'git pull origin master')
		// await execCommand(dirPathJoined, 'docker-compose down')
		// await execCommand(dirPathJoined, 'docker rmi portal_server portal_client')
		// await execCommand(dirPathJoined, 'docker-compose up')
	});

	server.listen(PORT, HOSTNAME, () => {
		console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
	});
})
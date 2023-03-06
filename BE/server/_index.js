const http = require('http');
const SERVER_REQ = require('./req');
const SERVER_RES = require('./res');
const SERVER_CONTROLLER = require('./controller');

module.exports = () => {
    const SERVER = http.createServer(async (_req, _res) => {
        try {
            const req = await SERVER_REQ(_req);
            const res = SERVER_RES(_res);
            if (req.method == "OPTIONS") {
                res.json();
                return;
            }
            try {
                SERVER_CONTROLLER(req, res);
            } catch (error) {
                res.error(400, "Bad request");
            }
        } catch (error) {
            console.log(error);
        }
    });
    SERVER.listen(8001, '0.0.0.0');
}
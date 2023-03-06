
const device = require("./device");
const search = require("./search");

const GET = ({ res }) => {
    res.json("Hello world");
}

module.exports = {
    "/": { GET: GET },
    "/device":device,
    "/search":search
}


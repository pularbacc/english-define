
const GET = ({
    res
}) => {
    res.json({
        name:"nguyen",
        age:30
    });
}

const POST = ({
    req,
    res
}) => {
    const data = req.data;
    if (data.light != undefined) {
        deviceState.light = data.light;
    }
    if (data.fan != undefined) {
        deviceState.fan = data.fan;
    }
    res.json(deviceState);
}

module.exports = {
    GET: GET,
    POST: POST
}
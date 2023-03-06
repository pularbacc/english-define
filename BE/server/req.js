const urlModule = require('url');

module.exports = async (req) => {
    const { method, url } = req;
    const _parseUrl = urlModule.parse(url, true);
    const dataReq = async () => {
        try {
            const buffers = [];
            for await (const chunk of req) {
                buffers.push(chunk);
            }
            if (_parseUrl.pathname == '/record') {
                const data = Buffer.concat(buffers);
                return data;
            } else {
                const data = Buffer.concat(buffers).toString();
                return JSON.parse(data);
            }
        } catch (error) { }
    }

    return {
        method: method,
        path: _parseUrl.pathname,
        query: _parseUrl.query,
        data: await dataReq()
    }
}
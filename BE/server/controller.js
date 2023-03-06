const process = require('../process/_index')

module.exports = (req, res) => {
    process[req.path][req.method]({ req, res  })
}
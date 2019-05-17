const _get = require('./get');
const _update = require('./update');
const _create = require('./create');
const _delete = require('./delete');
const _restart = require('./restart');

module.exports = {
    get: _get,
    update: _update,
    create: _create,
    delete: _delete,
    restart: _restart,
};

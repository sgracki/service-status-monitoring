/* eslint-disable max-len */
const { respond, run } = require('../../utils');
const Services = require('../../lib/services');
const Monitors = require('../../lib/monitors');

// eslint-disable-next-line object-curly-newline
const reduceServiceKeys = ({ website, title, interval, httpOptions, expect, port }) => ({ website, title, interval, httpOptions, expect, port });

const getServices = async (req, res) => {
    const [error, data] = await run(Services.get());

    respond({ res, error, data });
};

const createService = async (req, res) => {
    const [error, data] = await run(Services.create(reduceServiceKeys(req.body)));

    respond({ res, error, data });
};

const updateService = async (req, res) => {
    const { serviceId } = req.params;
    const [error, data] = await run(Services.update(serviceId, reduceServiceKeys(req.body)));

    respond({ res, error, data });
};

const deleteService = async (req, res) => {
    const { serviceId } = req.params;
    const [error, data] = await run(Services.delete(serviceId));

    respond({ res, error, data });
};

const stopServiceMonitor = async (req, res) => {
    const { serviceId } = req.params;
    const { success, error } = await Monitors.stop(serviceId);

    res.json({ success, error });
};

module.exports = {
    getServices,
    createService,
    updateService,
    deleteService,
    stopServiceMonitor,
};

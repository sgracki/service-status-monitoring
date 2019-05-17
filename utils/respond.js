const HttpStatus = require('http-status-codes');

module.exports = ({
    res,
    error,
    data,
    status = 'OK',
}) => res.status(HttpStatus[status]).json({
    success: !error,
    ...(!error) && { data },
});

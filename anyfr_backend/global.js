let requestInfo = {};

const setRequestInfo = (req) => {
    requestInfo.url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
};

const getRequestInfo = () => requestInfo;

module.exports = { setRequestInfo, getRequestInfo };

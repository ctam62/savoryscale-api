const handleError = (res, message) => {
    return res.status(500).json({ error: message });
};

const handleNotFound = (res, message) => {
    return res.status(404).json({ message: message });
};

const handleBadRequest = (res, message) => {
    return res.status(400).json({ error: message });
};

const handleUserBadRequest = (res, message) => {
    return res.status(400).send(message);
};

const handleUnauthorized = (res, message) => {
    return res.status(401).send(message);
};

module.exports = {
    handleError,
    handleNotFound,
    handleBadRequest,
    handleUserBadRequest,
    handleUnauthorized
};
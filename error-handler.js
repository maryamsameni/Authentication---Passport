function notFound(req, res, next) {
    res.send({ statusCode: 404, message: 'notFound page' })
}

function errorHandler(error, req, res, next) {
    const status = error?.status ?? error?.statusCode ?? 500
    res.send({ statusCode: status, message: error?.message ?? 'internalserver' })
}

module.exports = { notFound, errorHandler }
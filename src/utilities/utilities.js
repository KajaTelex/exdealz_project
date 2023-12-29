const successResponse = (status,message,response={}) => {
    return {
        status,
        message,
        response
    }
}

const failureResponse = (status,message,response={}) => {
    return {
        status,
        message,
        response
    }
}

module.exports = {successResponse,failureResponse}
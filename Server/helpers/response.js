

function success(response, statusCode, data){
    return response.json({
        status: true,
        statusCode: statusCode,
        data: data
    })
}

function error(response, statusCode, message){
    return response.json({
        status: false,
        error: {
            message : message,
            statusCode: statusCode
        }
    })
}

module.exports = {success, error};
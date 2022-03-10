const { request } = require('express');
const jwt = require('jsonwebtoken');
const { STRINGS } = require('../utils/Strings');
const { getErrorModel, getTokenKey } = require('../utils/Utils');

const auth = async (req, res, next) => {
    console.log(req.headers)
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
    ) {
        let errorModel = getErrorModel();
        errorModel.message = STRINGS.PLEASE_SEND_TOKEN
        res.send(errorModel)
    } else {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const verified = jwt.verify(token, getTokenKey());
            console.log("decoded data")
            var decodedToken=jwt.decode(token);
            console.log(decodedToken.email);
            req.body.emailId=decodedToken.email;
            next();

        }
        catch (exception) {
            console.log(exception)
            let errorModel = getErrorModel();
            errorModel.message = STRINGS.PLEASE_SEND_VALID_TOKEN;
            res.send(errorModel)
        }
    }


//next();
}
exports.auth = auth;

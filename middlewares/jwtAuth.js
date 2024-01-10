const { expressjwt: jwt, expressjwt } = require('express-jwt')
const jsonwebtoken = require('jsonwebtoken')
const errorResponse = require('../utils/errorResponse')


const { secret, API_URL } = process.env
function jwtAuth() {

    return expressjwt({
        secret,
        algorithms: ['HS256'],
        getToken: function setUserId(req) {

            if (req.headers.authorization) {
                if (req.headers.authorization.split(' ')[0] === 'Bearer') {
                    const token = req.headers.authorization.split(' ')[1]
                    let payload = jsonwebtoken.decode(token)
                    req.userId = payload.userId
                    req.userName = payload.userName
                    return token
                }
                else {
                    const token = req.headers.authorization
                    let payload = jsonwebtoken.decode(token)
                    req.userId = payload.userId
                    return token
                }
            }
            return null
        }

    }).unless({
        path: [`${API_URL}/users/logIn`,
        `${API_URL}/users/signUp`]
    })
}



module.exports = jwtAuth
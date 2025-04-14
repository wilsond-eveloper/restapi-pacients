import jwt from 'jsonwebtoken'
import {SECRET_TOKEN} from '../config.js'

export const authRequired = (req, res, next) => {
    const {token} = req.cookies

    if(!token) {
        return res.status(401).json('Not token, authorization denied')
    }

    jwt.verify(token, SECRET_TOKEN, (err, user) => {
        if(err) return res.status(403).json("Invalid token")
        req.user = user
        next()
    } )

    
}
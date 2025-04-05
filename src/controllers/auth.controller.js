import Staff from '../models/staff.js'
import bcrypt from 'bcrypt'
import { createAccessToken } from '../libs/jwt.js'

export const register = async (req, res) => {


    const {email, password, username} = req.body
    try {

        const pwdhash = await bcrypt.hash(password, 10)

        const newUser = new Staff({
            email,
            username,
            password: pwdhash 
        })
    
        const userSaved = await newUser.save()
        
        const token = await createAccessToken({id: userSaved._id})
        res.cookie('token', token)

        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        })

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const login = (req, res) => res.send('Login')
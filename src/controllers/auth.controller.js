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

export const login = async (req, res) => {

    const { username, password } = req.body;

    try {
        const userFound = await Staff.findOne({ username })
        if (!userFound) {
            return res.status(400).json({ error: 'Username required' })
        }

        // Verificar contraseña
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }
        
        // Crear y firmar el token JWT
        const token = await createAccessToken({ id: userFound._id })

        res.cookie("token", token)
        return res.json({
            message: 'Login exitoso',
            success: true,
            userFound
        })
    } 
    catch (error) {
        return res.status(500).json({message: error.message})
    }
    res.json(`The login was complete`)
}

export const logout = async (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    return res.json('Profile')
}
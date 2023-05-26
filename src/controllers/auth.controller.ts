import { Request, Response } from 'express'
import { User } from "../entity/User"
import * as jwt from 'jsonwebtoken'
import { secret } from '../config'


export const generateToken = async (req: Request, res: Response) => {
    
    try {
        const {phone, password} = req.body
        const user = new User()
        
        user.password = req.body.password
        user.phone = req.body.phone

        user.password = await user.setPassword(password)

        const token = jwt.sign({id: user.id}, secret, {
            expiresIn: 60*60*24 
        } )

        return res.json({
            token_type : 'bearer', 
            token
        })
       
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }
    
}

export const loginUser = async (req: Request, res: Response) => {

    const {phone, password} = req.body

    
    try {
        const user = await User.findOneBy({phone: phone})
        
        if(!user) {
            return res.status(404).json({message: 'User not found'})
        }

        const token = jwt.sign({id: user.id}, secret, {
            expiresIn: 60*60*24 
        } )
        
        res.status(200).json({
            'user': {
                id: user.id,
                name : user?.name,
                session_active : user?.active,
                email : user?.email,
                phone : user.phone,
                address : user.address,
                access_token: token,
                token_type : 'bearer'
            }
        })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }

    
}


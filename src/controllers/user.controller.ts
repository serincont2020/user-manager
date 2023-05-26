import { Request, Response } from 'express'
import { User } from "../entity/User"

export const createUser = async (req: Request, res: Response) => {
    const token = req.headers['x-access-token']
    if(!token) {
        return res.status(401).json({ 
            auth: false,
            message: 'No token provided'
        })
    }
    try {
        const user = new User()
        
        user.name = req.body.name
        user.phone = req.body.phone
        user.email = req.body.email
        user.password = req.body.password
        user.address = req.body.address

        user.password = await user.setPassword(user.password)

        await user.save()

        return res.status(200).json({
            name : user?.name,
            phone : user.phone,
            email : user?.email,
            password: user.password,
            address: user.address
        })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }
    
}

export const getUsers = async (req: Request, res: Response) => {

    try {
        const users = await User.find()

        return res.json(users)

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }
    
}

export const getUser = async (req: Request, res: Response) => {

    const token = req.headers['x-access-token']
    if(!token) {
        return res.status(401).json({ 
            auth: false,
            message: 'No token provided'
        })
    }
    try {
        const user = await User.findOneBy({ id: parseInt(req.params.id)})
        if (!user) return res.status(404).json({ message: "User not found" });
        
        return res.status(200).json({
            id: user.id,
            document_type_id : null,
            document_number: null,
            name : user.name,
            phone : user.phone,
            email : user.email,
            address : user.address,
            session_active : user.active
        })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        
    }
    
        
}

export const updateUser = async (req: Request, res: Response) => {
    const token = req.headers['x-access-token']
    if(!token) {
        return res.status(401).json({ 
            auth: false,
            message: 'No token provided'
        })
    }
    try {
        const user = await User.findOneBy({ id: parseInt(req.params.id)})
        if (!user) {return res.status(404).json({ message: "User not found" });}

        await User.update( { id: parseInt(req.params.id) } , req.body)

        const findUser = await User.findOneBy({ id: parseInt(req.params.id)})

        return res.status(200).json({
            name : findUser?.name,
            phone : findUser?.phone,
            email : findUser?.email,
            password : findUser?.password,
            address : findUser?.address
        })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        
    }
    
        
}

export const deleteUser = async (req: Request, res: Response) => {
    const token = req.headers['x-access-token']
    if(!token) {
        return res.status(401).json({ 
            auth: false,
            message: 'No token provided'
        })
    }

    try {
        const user = await User.findOneBy({ id: parseInt(req.params.id)})
        if (!user) return res.status(404).json({ message: "User not found" });

        await User.delete({ id: parseInt(req.params.id) })
        
        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        
    }
    
        
}
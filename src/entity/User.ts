import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    email: string

    @Column({nullable: true})
    name: string

    @Column({default: true})
    active: boolean

    @Column({nullable: true})
    phone: string

    @Column({nullable: true})
    address: string

    @Column({nullable: true})
    password: string

    isValidPassword = (password: string) => {
        return bcrypt.compareSync(password, this.password)
    }

    setPassword = async (password: string) => {
        
        return this.password = await bcrypt.hashSync(password, 12)
    }

    generateJWT = () => {
        return jwt.sign(
            {
                email: this.email
            }, 
            "SECRET",
            { expiresIn: '1h'}
        )
    }

}
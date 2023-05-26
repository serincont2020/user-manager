import { DataSource } from 'typeorm'
import { User } from './entity/User'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '',
    port: 5432,
    database: 'usermanagerdb',
    entities: [User],
    synchronize: true
})
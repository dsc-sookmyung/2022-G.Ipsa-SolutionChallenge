
import express, { Response, Request } from 'express';
import { Connection, Like } from 'typeorm';
import UserInfo from '../database/entities/UserInfo'
import Options from '../database/dbconnector';
import { createConnection, getConnectionManager } from 'typeorm';

const router = express.Router();
const connectionManager = getConnectionManager();
router.get('/emailCheck', async (req: Request, res: Response) => {
    if (!connectionManager.has('default')) {
        const connection = await createConnection(Options);
    }
    const email = req.query.email;
    const userCount = await UserInfo.findAndCount({ where: { email: email } })
    if (userCount[1] > 0) res.send('1')
    else res.send('0')
    // await connection.close();
})

router.get('/nicknameCheck', async (req: Request, res: Response) => {
    if (!connectionManager.has('default')) {
        const connection = await createConnection(Options);
    }
    const nickname = req.query.nickname;
    const userCount = await UserInfo.findAndCount({ where: { nickname: nickname } })
    if (userCount[1] > 0) res.send('1')
    else res.send('0')
    // await connection.close();
})

router.post('/signin', async (req: Request, res: Response) => {
    if (!connectionManager.has('default')) {
        const connection = await createConnection(Options);
    }
    const user = req['body'] as UserInfo;
    const newUser = UserInfo.create(user)
    await newUser.save();
    res.send(newUser)
    // await connection.close();
});

router.get('/', async (req: Request, res: Response) => {
    if (!connectionManager.has('default')) {
        const connection = await createConnection(Options);
    }
    const keyword = req.query.keyword;
    const email = req.query.email;
    const id = req.query.id;
    if (keyword) {
        const searchedUser = await UserInfo.find({ nickname: Like(`%${keyword}%`) })
        res.send(searchedUser)
    }
    else if (email) {
        const searchedUser = await UserInfo.find({ where: { email: email } })
        res.send(searchedUser)
    }
    else if (id) {
        const searchedUser = await UserInfo.find({ where: { id: id } })
        res.send(searchedUser)
    }
    else {
        const searchedUser = await UserInfo.find()
        res.send(searchedUser)
    }
    // await connection.close();
});

router.get('/', async (req: Request, res: Response) => {
    if (!connectionManager.has('default')) {
        const connection = await createConnection(Options);
    }
    const keyword = req.query.keyword;
    if (keyword) {
        const searchedUser = await UserInfo.find({ nickname: Like(`%${keyword}%`) })
        res.send(searchedUser)
    }
    else {
        const searchedUser = await UserInfo.find()
        res.send(searchedUser)
    }
    // await connection.close();
})

export {
    router as UserInfoRouter
}

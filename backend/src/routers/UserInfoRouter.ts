
import express, { Response, Request } from 'express';
import { Like } from 'typeorm';
import UserInfo from '../database/entities/UserInfo'
import Options from '../database/dbconnector';
import {createConnection} from 'typeorm';

const router = express.Router();


router.get('/emailCheck', async (req: Request, res:Response)=>{
    const email = req.query.email;
    const userCount = await UserInfo.findAndCount({where: {email: email}})
    if (userCount[1]>0) res.send('1')
    else res.send('0')
})

router.get('/nicknameCheck', async (req: Request, res:Response)=>{
    const nickname = req.query.nickname;
    const userCount = await UserInfo.findAndCount({where: {nickname: nickname}})
    if (userCount[1]>0) res.send('1')
    else res.send('0')
})

router.post('/signin', async (req: Request, res:Response)=>{
    const user = req['body'] as UserInfo;
    const newUser = UserInfo.create(user)
    await newUser.save();
    res.send(newUser)

});

// router.post('/login', async (req: Request, res:Response)=>{
//     const id = req.query.id;
//     const checkUserLogin = await UserInfo.find({where: {id:id}, select: ['loginStatus']});
//     if (!checkUserLogin){
//         UserInfo.createQueryBuilder()
//         .update(User)
//         .set({ firstName: "Timber", lastName: "Saw" })
//         .where("id = :id", { id: 1 })
//         .execute();
//     }
//     res.send(newUser)

// });

router.get('/', async (req: Request, res:Response)=>{
    const keyword = req.query.keyword;
    if (keyword){
        const searchedUser = await UserInfo.find({nickname: Like(`%${keyword}%`)})
        res.send(searchedUser)
    }
    else{
        const searchedUser = await UserInfo.find()
        res.send(searchedUser)
    }
})

export {
    router as UserInfoRouter};

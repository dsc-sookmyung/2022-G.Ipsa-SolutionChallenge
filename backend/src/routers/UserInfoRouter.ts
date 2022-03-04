
import express, { Response, Request } from 'express';
import UserInfo from '../database/entities/UserInfo'

const router = express.Router();

router.post('/signin', async (req: Request, res:Response)=>{
    const user = req['body'] as UserInfo;
    const newUser = UserInfo.create(user)
    await newUser.save();
    res.send(newUser)

});

router.get('/search', async (req: Request, res:Response)=>{
    const keyword = req.query.keyword;
    console.log(keyword)
    const searchedUser = await UserInfo.findOne({where: {nickname: keyword}})
    res.send(searchedUser)

})

export {
    router as UserInfoRouter};

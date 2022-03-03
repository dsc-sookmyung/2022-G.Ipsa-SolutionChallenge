import pool from '../dbconfig/dbconnector';

class TodosController {

    public async get(req : any, res: any) {
        try {
            const client = await pool.connect();

            const sql = "SELECT * FROM usertable";
            const { rows } = await client.query(sql);
            const todos = rows;

            client.release();

            res.send(todos);
        } catch (error) {
            res.status(400).send(error);
            console.log(error)
        }
    }
}

export default TodosController;
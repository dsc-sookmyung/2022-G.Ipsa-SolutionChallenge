import express, { Request, Response, NextFunction, Application } from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express' 
import YAML from 'yamljs'

const PORT = 8080;


const app: Application = express();
const swaggerSpec = YAML.load(path.join(__dirname, '../build/swagger.yaml'))


app.use(express.json());
app.use(express.static("public"));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });

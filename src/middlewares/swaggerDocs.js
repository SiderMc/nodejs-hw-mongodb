import fs from "node:fs"
import swaggerUI from "swagger-ui-express"
import { SWAGGER_DIR } from "../constants/index.js";
import createHttpError from "http-errors";

const swaggerDocs = ()=>{
    try {
    const swaggerText = fs.readFileSync(SWAGGER_DIR,"utf-8")
    const swaggerJson = JSON.parse(swaggerText)
    return  [...swaggerUI.serve,swaggerUI.setup(swaggerJson)]
} catch (error) {
    return (req,res,next)=>{
        next(createHttpError(500,"Can't load swagger docs"))
    }
    
}
}

export default swaggerDocs
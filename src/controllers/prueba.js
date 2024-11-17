import { db } from "../db.js"

export const prueba = async ( req, res ) =>{
    try {
        const response = await db.query("SELECT * FROM estudiante LIMIT 10");
        
        console.log(response[0]);
        
        res.status(201).json({data: response[0]});
    } catch (error) {
        res.send(error);
    }
}
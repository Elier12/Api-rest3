import jwt from "jsonwebtoken";

export const requireToken =(req,res,next) =>{
    try {
        let token = req.headers?.authorization
        if (!token) throw new Error('No existe el token en el header usa Bearer');
        token = token.split(' ')[1]
        const {uid} =jwt.verify(token,process.env.JWT_SECRET)

        req.uid=uid

        next()
    } catch (error) {
       console.log(error); 

       const TokenVerificationError ={
        ["invalid signature"]:"La Firma del JWT no es valida",
        ["expired token"]:"La Firma del JWT ha expirado",
        ["invalid token"]:"La Firma del JWT no es válida",
        ["user not found"]:"La Firma del JWT no existe",
        ["jwt expired"]:"JWT expidaro",
        ["No Bearer"] : "Utiliza formato Bearer"
       }
        return res
            .status(401)
            .send({error:TokenVerificationError[error.message]})
    


       }
       return res.status(401).json({error: error.message})
       
    }
}
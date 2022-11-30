import jwt from "jsonwebtoken";

export const generateToken = (uid) => {
  const expiresIn = 60 * 15;
  
  try {
    const token = jwt.sign({uid},process.env.JWT_SECRET,{expiresIn});
    return {token, expiresIn};
   
  } catch (error) {
    console.log(error);
 
  }
};

export const generateRefreshToken = (uid,res) => {
  const expiresIn = 60 * 60 * 24 * 30;
  try {
      const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
          expiresIn,
      });

      res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: !(process.env.MODO === "developer"),
          expires: new Date(Date.now() + expiresIn * 1000),
      });
  } catch (error) {
      console.log(error);
  }
}

export const tokenVerificationError = {
  "invalid signature":"La Firma del JWT no es valida",
  "expired token":"La Firma del JWT ha expirado",
  "invalid token":"La Firma del JWT no es válida",
  "user not found":"La Firma del JWT no existe",
  "jwt expired":"JWT expidaro",
  "No Bearer" : "Utiliza formato Bearer",
  "jwt malformed":"JWT formato no valido"
 }
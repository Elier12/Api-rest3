import { User } from "../models/user.model.js"; //llamar al modelo para query tine metodos
import { generateToken,generateRefreshToken, tokenVerificationError } from "../utils/tokenManger.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) throw { code: 11000 };

    user = new User({ email, password });

    await user.save();
    //Generar jwt tokenn
    const {token,expiresIn} = generateToken(user.id)
    generateRefreshToken(user.id,res)

    return res.status(201).json({ token, expiresIn });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: `this exist is user` });
    }
    return res.status(500).json({ error: `Error del servidor` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) return res.status(403).json({ error: `Credentiales invalid` });

    const rptPassword = await user.comparePassword(password);
    if (!rptPassword)
      return res.status(403).json({ error: `Credentiales invalid` });

    //Generar jwt tokenn
    const {token,expiresIn} = generateToken(user.id)
    generateRefreshToken(user.id,res)
    return res.json({token,expiresIn});

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: `Error del servidor` });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean()//onjeto simpel
    return res.json({ email: user.email})
  } catch (error) {
    return res.status(500).json({ error: `Error del servidor` });
  }
}

export const refreshTokens = (req,res) => {

  try {

    const {token,expiresIn} = generateToken(req.uid)
  
    return res.json({token,expiresIn});

  } catch (error) {
    console.log(error);   
    return res.status(500).json({ error: `Error del servidor` });
  }
}

export const logout = (req, res) => {
  res.clearCookie('refreshToken')
  res.json({ok:true})
}
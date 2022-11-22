import { User } from "../models/user.model.js"; //llamar al modelo para query tine metodos
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) throw { code: 11000 };

    user = new User({ email, password });

    await user.save();

    return res.status(201).json({ ok: tru });
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

    //Generar jwt token
    const token = jwt.sign({ uid : user.id }, process.env.JWT_SECRET);
    

    return res.json({token});

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: `Error del servidor` });
  }
};

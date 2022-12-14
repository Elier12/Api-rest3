import { Link } from "../models/Link.js";
import { nanoid } from "nanoid";
export const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ uid: req.uid }).lean();
    return res.json({ links });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const getLink = async(req,res)=>{
  try {
    const {id} = req.params;
    const link = await Link.findById(id);
    if(!link) return res.status(404).json({error:"No existe link"});
    if(link.uid.equals(req.id)) return res.status(401).json({error:"Code Invalid"})
    return res.json({ link });
    
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return res.status(403).json({error:"Formato incorecto"})
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
}

export const removeLink = async(req,res)=>{
  try {
    const {id} = req.params;
    const link = await Link.findById(id);
    if(!link) return res.status(404).json({error:"No existe link"});
    if(link.uid.equals(req.id)) return res.status(401).json({error:"Code Invalid"})
    
    await link.remove();
    return res.json({ link });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return res.status(403).json({error:"Formato incorecto"})
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
}

export const createLink = async (req, res) => {
  try {
    let { longLink } = req.body;
    if(longLink.startsWith("http://")){
      longLink = "http://"+longLink;
    }
    const link = new Link({ longLink, nanoLink: nanoid(6), uid: req.uid });
    const newLink = await link.save();
    return res.status(201).json({ newLink });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

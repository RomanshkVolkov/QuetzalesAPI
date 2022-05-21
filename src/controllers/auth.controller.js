import jwt from "jsonwebtoken";
import fetch from "node-fetch";
import User from "../db/models/User";
import Role from "../db/models/Role";

import config from "../../config/config";

import { redirect } from "express/lib/response";

export const signUp = async (req, res) => {
  try {
    // Getting the Request Body
    const { username, email, password, roles } = req.body;
    // Creating a new User Object
    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
    });

    // checking for roles
    if (req.body.roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    // Saving the User Object in Mongodb
    const savedUser = await newUser.save();
    console.log(savedUser)
    createUserCommerce(savedUser)

    // Create a token
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
      expiresIn: 86400, // 24 hours
    });


    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const signin = async (req, res) => {
  try {
    // Request body email can be an email or username
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );

    if (!userFound) return res.status(400).json({ message: "User Not Found" });

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
      expiresIn: 86400, // 24 hours
    });
//console.log(token)
    res.json({ token });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    console.log(req.headers);
    res.cookie('jwt', '', { maxAge: 1 });
    //res.redirect('/products');
    res.json({message: 'Ha cerrado session correctamente'})
  } catch (error) {
    console.log(error);
  }
};

async function createUserCommerce(savedUser)  {
  try {
    const url = new URL(
      "https://api.chec.io/v1/customers"
    );
  
    const token = process.env.REACT_APP_CHEC_PUBLIC_KEY
    const email = String(savedUser?.email)
    const id = JSON.stringify(savedUser?._id)
    const idSubs = String(id).substring(1, 25)
    
    let headers = {
      "X-Authorization": token,
      "Content-Type": "application/json",
      "Accept": "application/json",
    }
    let body = {
      "email": email,
      "phone": "null",
      "firstname": "null",
      "lastname": "null",
      "external_id": idSubs
    }

    console.log(body)
    await fetch(url, {
      method: "POST",
      headers: headers,
      body: body
    })
    .then(response => response.json())
    .then(json => console.log(json?.error?.errors));
  } catch (error) {
    console.log(error)
  }
}
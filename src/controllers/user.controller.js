import User from "../db/models/User";
import Role from "../db/models/Role";

export const createUser = async (req, res) => {
  const url = new URL(
    "https://api.chec.io/v1/customers"
);

let headers = {
    "X-Authorization": "{token}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "email": "leslie.lawless@example.com",
    "phone": "+1 987 654 3210",
    "firstname": "Leslie",
    "lastname": "Lawless",
    "external_id": "MY_CRM_USER_123"
}

fetch(url, {
    method: "POST",
    headers: headers,
    body: body
})
    .then(response => response.json())
    .then(json => console.log(json));
  try {
    const { username, email, password, roles } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    // creating a new User
    const user = new User({
      username,
      email,
      password,
      roles: rolesFound.map((role) => role._id),
    });

    // encrypting password
    user.password = await User.encryptPassword(user.password);

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      roles: savedUser.roles,
    });
  } catch (error) {
    console.error(error);
  }
};

//export const getUsers = async (req, res) => {};
//
//export const getUser = async (req, res) => {};

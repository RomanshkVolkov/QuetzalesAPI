import Shopping from "../db/models/Shopping";
import User from "../db/models/User";
import Product from "../db/models/Product";

export const showProducts = async (req, res) => {
    try {
        //debemos obetener el id del usuario loggeado falta el front para hacer las pruebas
        const getProducts = await Shopping.find()
    } catch (error) {
        console.log(error)
    }
}

export const AddProduct = async (req, res) => {
    try {
        const { idUser, idProduct, amount } = req.body;

        const shopping = new Shopping({
            idUser,
            idProduct,
            amount
        });

        const addProduct = await Shopping.save();

        return res.status(200).json(addProduct);

    } catch (error) {
        console.log(error)
    }
}
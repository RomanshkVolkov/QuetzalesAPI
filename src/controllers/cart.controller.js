import { create } from "handlebars";
import Cart from "../db/models/Cart";
import Product from "../db/models/Product";

const createProduct = async (dataProduct) => {
    try {
        const newProduct = new Product(dataProduct);
  
        const productSaved = await newProduct.save();
        const id = String(productSaved[0]?._id)
        return id
    } catch (error) {
        console.log(error);
        return console.log('el mismo error');
    }
  };

export const showProducts = async (req, res) => {
    try {
        //debemos obetener el id del usuario loggeado falta el front para hacer las pruebas
        const getProducts = await Cart.find()
        return res.status(200).json(getProducts)
    } catch (error) {
        console.log(error)
    }
}

export const AddProduct = async (req, res) => {
    try {
        const { name, description, price, category, amount, imgURL, idUser } = req.body;
        //const { idUser, idProduct, amount } = req.body;

        const verifyProduct = await Product.find({name}).select('name _id')
        
        
        let dataProduct = {
            name, description, price, category, amount, imgURL
        }
        const idProduct = String(verifyProduct[0]?._id)

        console.log(idProduct)
        if (verifyProduct.length < 1) {
            const id = await createProduct(dataProduct)
            if (id) {
                idProduct = id
            }
        } else {
            const upAmountProduct = await Product.findByIdAndUpdate(idProduct,  dataProduct, { new: true } )
        }

        const verifyCart = await Cart.find({ idUser })
        if (verifyCart.length > 0) {
            const cartId = String(verifyCart[0]?._id)
            const vCartP = await Cart.find({ idUser, idProduct })

            if (vCartP.length > 0) {

                await Cart.findByIdAndUpdate(cartId, { $pull: { idProduct} })

                res.status(200).json({ message: 'Producto eliminado' })

                return 
            } else {
                await Cart.findByIdAndUpdate(cartId, { $push: { idProduct } })
                
                res.status(200).json({ message: 'Producto agregado' })

                return
            }
            
        }
        
        const newCart = new Cart({
            idUser,
            idProduct
        });

        const addProduct = await newCart.save();

        return res.status(200).json(addProduct);

    } catch (error) {
        console.log(error)
    }
}
import Cart from "../db/models/Cart";
import Product from "../db/models/Product";

const createProduct = async (dataProduct) => {
    try {
        const newProduct = new Product(dataProduct);
        const productSaved = await newProduct.save();
        const id = String(productSaved?._id)

        return id

    } catch (error) {
        var id=4
        return id
    }
};

const updateCart = async (idUser, idProduct) => {
    try {
        const verifyCart = await Cart.find({ idUser })

        if (verifyCart.length > 0) {
            const cartId = String(verifyCart[0]?._id)
            const vCartP = await Cart.find({ idUser, products: idProduct })

            if (vCartP.length > 0) {

                await Cart.findByIdAndUpdate(cartId, { $pull: { products: idProduct} })
                var response=2
                return response

                 
            } else {

                await Cart.findByIdAndUpdate(cartId, { $push: { products: idProduct } })
                var response=1
                return response
                
            }
            
        }
        const newCart = new Cart({
            idUser,
            products: idProduct
        });

        const addProduct = await newCart.save();
        var response=3
        return response
    } catch (error) {
        console.log(error)
    }
}

export const showProducts = async (req, res) => {
    try {
        //debemos obetener el id del usuario loggeado falta el front para hacer las pruebas
        const query = [
            {
                path: 'products',
                select: 'name description price category amount imgURL',
                options: { sort: { 'price': 1 } }
            }
        ]
        const { idUser } = req.body
        const getProducts = await Cart.find({idUser})
        .select('')
        .populate(query)

        return res.status(200).json(getProducts)

    } catch (error) {
        return res.status(400).json({ message: 'Error de conexion intente más Tarde' })
        console.log(error)
    }
}

export const AddProduct = async (req, res) => {
    try {
        const { name, description, price, category, amount, imgURL, idUser } = req.body;
        //const { idUser, idProduct, amount } = req.body; ´podemos definir el idUser decodificando el token
        const verifyProduct = await Product.find({name}).select('name _id')
        const idProduct = String(verifyProduct[0]?._id)
        
        let dataProduct = {
            name,
            description,   
            price,
            category,
            amount,
            imgURL
        }


        if (verifyProduct.length < 1) {
            
            const id = await createProduct(dataProduct)

            if (id.length < 10) {

                return res.status(400).json({ message: 'Se ha producido un error intentalo de nuevo mas tarde...' })

            } else {
                var response = await updateCart(idUser, id)
            }

console.log('no continua: '+response)

            switch (response) {
                case 1:
                    return res.status(202).json({ message: 'Producto agregado' })
                    break;
                case 2:
                    return res.status(200).json({ message: 'Producto eliminado' })
                    break;
                case 3:
                    return res.status(202).json({ message: 'Se ha creado su carrito de compras' })
                    break;
                default:
                    return res.status(400).json({ message: 'Se ha producido un error intentalo de nuevo mas tarde...' })
                    break;
            }
            return

        } else {
            const upAmountProduct = await Product.findByIdAndUpdate(idProduct,  dataProduct, { new: true } )
        }
        var response = await updateCart(idUser, idProduct)

        switch (response) {
            case 1:
                return res.status(200).json({ message: 'Producto agregado' })
                break;
            case 2:
                return res.status(200).json({ message: 'Producto eliminado' })
                break;
            case 3:
                return res.status(202).json({ message: 'Se ha creado su carrito de compras' })
                break;
            default:
                return
                break;
        }
        
        return
        
    } catch (error) {
        return res.status(400)
        console.log(error)
    }
}
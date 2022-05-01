import { redirect } from "express/lib/response";
import Product from "../db/models/Product";

export const findProducts = async (req, res) => {
   console.log('se murio xd'); 
   const { search } = req.params;
try {
    if (search) {
        
        const products = await Product.find({name:{ $regex: '.*'+ search +'.*', $options: "i"} })
        .select('name category price imgURL');

    return res.json(products)
    //const products = Product.find          
    } else {
        res.redirect('/products');
    }
} catch (error) {
    console.log(error);
    return res.status(500).json(error)
}
};
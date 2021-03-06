import Product from "../db/models/Product";

export const createProduct = async (req, res) => {
  const { name, category, price, amount, imgURL } = req.body;

  try {
    const newProduct = new Product({
      name,
      category,
      price,
      amount,
      imgURL,
    });

    const productSaved = await newProduct.save();

    res.status(201).json(productSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getProductById = async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId)
  .select('name category price amount imgURL');
  res.status(200).json(product);
};

export const getProducts = async (req, res) => {
  const products = await Product.find().select('name category price amount imgURL');
  return res.json(products);
};

export const updateProductById = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {
      new: true,
    }
  );
  res.status(204).json(updatedProduct);
};

export const deleteProductById = async (req, res) => {
  const { productId } = req.params;

  await Product.findByIdAndDelete(productId);

  // code 200 is ok too
  res.status(204).json();
};

const { prisma } = require("../db/config")

const createProduct = async(req, res) => {
    try {
        let { name, stock, price } = req.body;
        price = parseFloat(price);
        if(!name || !stock || !price) return res.status(400).json({"error": "All fields required"});
        const newProduct = await prisma.product.create({
            data: {
                name,
                stock,
                price
            }
        });

        return res.status(201).json(newProduct);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: "Internal Server Error"})
    }
};

const getProducts = async(req, res) => {
    try {
        const allProducts = await prisma.product.findMany();
        return res.status(200).json(allProducts);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: "Internal Sevrer Error"})
    }
};

const getById = async(req, res) => {
    try {
        let {id} = req.params;
        id = parseInt(id);
        if(!id) return res.status(400).json({error: "Id field is required"})

        const exists = await prisma.product.findUnique({where: {id}});
        if(!exists) return res.status(404).json({error: "Product not found"});

        return res.status(200).json(exists);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: "Internal Server Error"});
    }
    
};

const fullUpdate = async(req, res) => {
    const id = parseInt(req.params.id, 10);
;
    let {name, stock, price} = req.body;
    price = parseFloat(price);

    if(!id) return res.status(400).json({error: "Id field is required"})
    if(!name || !stock || !price) return res.status(400).json({error: "All fields are required"})

    const exists = await prisma.product.findUnique({where: {id}});
    if(!exists) return res.status(404).json({error: "Product not found"})

    const updatedProduct = await prisma.product.update({
        where: {id},
        data: {
            name,
            stock,
            price
        }
    });

    return res.status(200).json(updatedProduct);
};

const partialUpdate = async(req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
;
        const updatedFields = req.body;

        if(!id) return res.status(400).json({error: "Id field is required"});
        if(!updatedFields) return res.status(404).json({error: "Update fields not found"});

        const updatedProduct = await prisma.product.update({
            where: {id},
            data: updatedFields
        });

        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: "Internal Server Error"});
    }
    
};

const deleteById = async(req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
;
        if(!id){
            return res.status(400).json({error: "Id field is required"});
        }

        await prisma.product.delete({where: {id}});
        return res.status(200).json({"message":"Product is deleted"});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: "Internal Server Error"})
    }
};


module.exports = {createProduct, getProducts, getById, fullUpdate, partialUpdate, deleteById};
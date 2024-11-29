const express = require('express');
const { createProduct, getProducts, getById, fullUpdate, partialUpdate, deleteById } = require('../controllers/oneForAll');
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();

router.post('/create', authMiddleware ,createProduct);
router.get('/get', authMiddleware , getProducts);
router.get('/getById/:id', authMiddleware , getById);
router.put('/put/:id', authMiddleware , fullUpdate);
router.patch('/patch/:id', authMiddleware , partialUpdate);
router.delete('/delete/:id', authMiddleware , deleteById);


module.exports = router;

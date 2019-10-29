const express = require('express');
const path = require('path');
const ProductService = require('../services/index');
const receipt = '../assets/receipt.pdf';

const platziStore = (app) => {
  const router = express.Router();
  app.use('/api/', router);

  const productService = new ProductService();

  router.get('/', (req, res) => {
    res.send(`API v2`);
  });

  router.get('/receipts', (req, res, next) => {
    let file = path.join(__dirname, receipt);
    res.sendFile(file);
  });

  /* router.get('/products', async (req, res, next) => {
    const storeProducts = await productService.getProducts()
    res.status(200).json({
      data: storeProducts,
      message: 'products listed'
    });
  }); */

  router.get('/products', async (req, res, next) => {
    try {
      const storeProducts = await productService.getProducts();
      res.status(200).json({
        data: storeProducts,
        message: 'products listed'
      });
    } catch (error) {
      next(error)
    }
  });

  router.get('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    try {
      const storeProducts = await productService.getProduct(productId);
      res.status(200).json({
        data: storeProducts,
        message: 'products retrive'
      });
    } catch (error) {
      next(error)
    }
  });
  
  router.get('*', (req, res) => {
    res.status(404).send('Error 404');
  });

  router.post('/products', async (req, res, next) => {
    const { body: product } = req;
    try {
      const createProductId = await productService.createProduct({ product });
      res.status(201).json({
        data: createProductId,
        message: 'products created'
      });
    } catch (error) {
      next(error)
    }
  });
}

module.exports = platziStore;
const { Product } = require('./dbconnection');

function ProductController(app) {
    /**
 * @param {string} ProductName
 * @param {number} StockQuantity
 * @param {number} Price
 */
  app.post('/add-product', async (req, res) => {
    try {
      const { ProductName, StockQuantity, Price , Image } = req.body;

      if (!ProductName || !StockQuantity || !Price) {
        return res.status(400).json({ error: "Eksik parametre!" });
      }

      const newproduct = await Product.create({ ProductName, StockQuantity, Price  ,request : JSON.stringify(req.body) , Image : JSON.stringify(Image)});
      res.status(201).json(newproduct);
    } catch (error) {
      res.status(500).json({ error: "Bir hata oluştu!", details: error.message });
    }
  });

  app.get('/get-product/:id', async (req, res) => {
    try {
        const { id } = req.params;  

        // Ürünü ID ile bulmak
        const getproduct = await Product.findOne({ where: { id: id } });

        if (!getproduct) {
            return res.status(404).json({ error: "Ürün bulunamadı!" });
        }

        res.status(200).json(getproduct);
    } catch (error) {
        res.status(500).json({ error: "Bir hata oluştu!", details: error.message });
    }
});

  app.get('/list-product', async (req, res) => {
    try {

      const getproduct = await Product.findAll()
      res.status(200).json(getproduct);
    } catch (error) {
      res.status(500).json({ error: "Bir hata oluştu!", details: error.message });
    }
  });

  app.put('/update-product', async (req, res) => {
    try {
      const { id, ProductName, StockQuantity, Price , Image } = req.body;

      const getproduct = await Product.findOne({ where: { id:id } })
      getproduct.ProductName = ProductName;
      getproduct.StockQuantity = StockQuantity;
      getproduct.Price = Price;
      getproduct.Image = Image;
      getproduct.save();
      res.status(200).json(getproduct);
    } catch (error) {
      res.status(500).json({ error: "Bir hata oluştu!", details: error.message });
    }
  });

  app.post('/rem-product', async (req, res) => {
    try {
        console.log("İstek Gövdesi:", req.body);

        const { id } = req.body;

        const getproduct = await Product.findOne({ where: { id:id } });
        await getproduct.destroy();
        res.status(200).json({ message: "Ürün başarıyla silindi!", id });
    } catch (error) {
        res.status(500).json({ error: "Bir hata oluştu!", details: error.message });
    }
});

}

module.exports = ProductController;

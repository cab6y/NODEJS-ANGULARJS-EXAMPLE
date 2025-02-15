const { User } = require('../dbconnection'); 

function UserController(app) {
  app.post('/add-user', async (req, res) => {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ error: "Eksik parametre!" });
      }

      const newUser = await User.create({ username, email, password });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Bir hata oluştu!", details: error.message });
    }
  });


  app.get('/get-user', async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Bir hata oluştu!", details: error.message });
    }
  });

 
  app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const finduser = await User.findOne({ where: { username, password } });

      if (finduser) {
        req.session.username = username;
        req.session.id = finduser.id;
        res.status(200).json(finduser);
      } else {
        res.status(200).json(false);
      }
    } catch (error) {
      res.status(500).json({ error: "Bir hata oluştu!", details: error.message });
    }
  });

  app.post('/logout', async (req, res) => {
    try {
      req.session.destroy(() => {
        res.status(200).json({ message: "Çıkış yapıldı" });
      });
    } catch (error) {
      res.status(500).json({ error: "Bir hata oluştu!", details: error.message });
    }
  });
}

module.exports = UserController;

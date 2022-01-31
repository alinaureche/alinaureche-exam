"use strict"

const express = require('express');
const res = require('express/lib/response');
const sequelize = require("./sequelize");
const bodyParser = require('body-parser');
const Spacecraft = require('./models/Spacecraft');
const Astronaut = require('./models/Astronaut');
require("./models/Astronaut");
require("./models/Spacecraft");
require/("./routes");


Spacecraft.hasMany(Astronaut);

const app = express();
app.use(bodyParser.json())

app.use(
    express.urlencoded({
      extended: true,
    })
  );



  app.use(express.json());




app.get('/sync', async (req, res) => {
    try {
      await sequelize.sync({ force: true })
      res.status(201).json({ message: 'created' })
    } catch (e) {
      console.warn(e)
      res.status(500).json({ message: 'server error' })
    }
  })

// ROUTES Spacecrafts

app.get("/Spacecrafts", async (req, res) => {
    try {
      const Spacecrafts = await Spacecraft.findAll({include:Astronaut});
      res.status(200).json(Spacecrafts);
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'Server error'})

    }
  });



  app.get('/Spacecrafts/:SpacecraftId', async (req, res) => {
    try {
      const spacecraft = await Spacecraft.findByPk(req.params.SpacecraftId)
        if (spacecraft) {
            res.status(200).json(spacecraft);
           
        }  else {
            res.status(404).json({ message: '404 - Spacecraft Not Found!' })
         }
    } catch (err) {
      console.warn(err);
      res.status(500).json({message: 'Server Error'});
    }
  });



  

  app.post("/Spacecrafts", async (req, res) => {
    try {
      await Spacecraft.create(req.body);
      res.status(201).json({ message: "Spacecraft Created!" });
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'Server error'})

    }
  });


  app.put('/Spacecrafts/:SpacecraftId', async (req, res) => {
    try {
        const spacecraft = await Spacecraft.findByPk(req.params.SpacecraftId)
        if (spacecraft){
            await spacecraft.update(req.body, { fields: ['name', 'maximumSpeed', 'mass'] })
            res.status(202).json({ message: 'accepted' })
        } else {
            res.status(404).json({ message: 'not found'})
        } 
    
    } catch (err){
            console.warn(err)
            res.status(500).json({ message: 'Server error'});
        }
    });
    


    app.delete('/Spacecrafts/:SpacecraftId', async (req, res) => {
        try {
            const spacecraft = await Spacecraft.findByPk(req.params.SpacecraftId)
            if (spacecraft){
                await spacecraft.destroy()
                res.status(202).json({ message: 'accepted' })
            } else {
                res.status(404).json({ message: 'not found' })
            }
        } catch (err){
            console.warn(err)
            res.status(500).json({ message: 'Server error'})
        }
    })
    


// ROUTES Astronauts

app.get('/Spacecrafts/:SpacecraftId/Astronauts', async (req, res) => {
    try {
        const spacecraft = await Spacecraft.findByPk(req.params.SpacecraftId)
        if (spacecraft){
            const astronauts = await spacecraft.getAstronauts();
            res.status(200).json(astronauts);
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err){
        console.warn(err)
        res.status(500).json({ message: 'Server error'});
    }
});


app.get('/Spacecrafts/:SpacecraftId/Astronauts/:AstronautId', async (req, res) => {
    try {
        const spacecraft = await Spacecraft.findByPk(req.params.SpacecraftId)
        const astronaut = await Astronaut.findByPk(req.params.AstronautId)
        if (spacecraft !== null && astronaut !== null) {
            if (spacecraft.id === astronaut.SpacecraftId){       // check syntax 
                res.status(200).json(astronaut)
            } else {
                res.status(401).json ({ message: 'This astronaut is in another spacecraft'})
            }
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err){
        console.warn(err)
        res.status(500).json({ message: 'Server error'})
    }
});


app.post('/Spacecrafts/:SpacecraftId/Astronauts', async (req, res) => {
    try {
        const spacecraft = await Spacecraft.findByPk(req.params.SpacecraftId)
        if (spacecraft){
            const astronaut = req.body
            astronaut.Spacecraft = spacecraft.id
            console.warn(astronaut)     
            await Astronaut.create(astronaut)
            res.status(200).json({ message: 'created' })
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err){
        console.warn(err)
        res.status(500).json({ message: 'Server error'})
    }
})



app.put('/Spacecrafts/:SpacecraftId/Astronauts/:AstronautId', async (req, res) => {
    try {
        const spacecraft = await Spacecraft.findByPk(req.params.SpacecraftId)
        const astronaut = await Astronaut.findByPk(req.params.AstronautId)
        if (spacecraft !== null && astronaut !== null){
            if (spacecraft.id === astronaut.SpacecraftId){  
                astronaut.name = req.body.name
                book.role = req.body.role
                astronaut.save()
                res.status(202).json({ message: 'accepted' })
            } else {
                res.status(401).json({ message: 'This astronaut does not belong to this spacecraft' })
            }
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err){
        console.warn(err)
        res.status(500).json({ message: 'Server error'})
    }
})



app.delete('/Spacecrafts/:SpacecraftId/Astronauts/:AstronautId', async (req, res) => {
    try {
        const spacecraft = await SpacecraftId.findByPk(req.params.SpacecraftId)
        const astronaut = await Astronaut.findByPk(req.params.AstronautId)
        if (spacecraft !== null && astronaut !== null){
            if (spacecraft.id === astronaut.SpacecraftId){           // check vself id
                await astronaut.destroy()
                res.status(202).json({ message: 'accepted' })
            } else {
                res.status(401).json({ message: 'This astronaut does not belong to this spacecraft' })
            }
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err){
        console.warn(err)
        res.status(500).json({ message: 'Server error'})
    }
})



app.listen(5000, async () => {
    console.log("Server started on http://localhost:5000");

    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully!")
    } catch (error) {
        console.error("Unable to connect to the database: ", error);
    }
});
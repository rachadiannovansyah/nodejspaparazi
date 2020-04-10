const db = require('../models');
const DotaHeroes = db.dotaheroes;
const Op = db.Sequelize.Op;

// Create ant Save a new Heroes
exports.create = (req, res) => {
    // validate request
    if(!req.body.name){
        res.status(400).send({
            message: 'Name is required'
        });
        return;
    }

    // Create new hero
    const newHeroes = {
        name: req.body.name,
        ability: req.body.ability,
        description: req.body.description,
        released: req.body.released ? req.body.released : false
    };

    // Save hero
    DotaHeroes.create(newHeroes)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating new hero."
            });
        });
};

// Get all data from database
exports.findAll = (req, res) => {
    const ability = req.query.ability;
    var condition = ability ? { ability: { [Op.like]: `%${ability}%` } } :null;

    DotaHeroes.findAll({ where:condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occored while retriving heroes"
            });
        });
};

// Find by id heroes
exports.findOne = (req, res) => {
    const id = req.params.id;

    DotaHeroes.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `Cant find the heroes with id=` + id
            });
        });
};

// Update data heroes by id
exports.update = (req, res) => {
    const id = req.params.id;

    DotaHeroes.update(req.body, {
        where: { id: id}
    })
    .then(num=> {
        if(num == 1){
            res.send({
                message: "Heroes updated!"
            });
        }else{
            res.send({
                message: `Cannot update heroes with id=${id}. Maybe heroes was not found or empty`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating heroes with id=" + id
        });
    });
};

// Find hero released
exports.findAllReleased = (req, res) => {
    DotaHeroes.findAll({ where: { released: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving heroes."
        });
      });
  };

// Delete heroes by id
exports.delete = (req, res) => {
    const id = req.params.id;

    DotaHeroes.destroy({
        where: { id: id}
    })
    .then(num => {
        if(num == 1){
            res.send({
                message: "Heroes was deleted successfully!"
            });
        }else{
            res.send({
                message: `Cannot delete heroes with id=${id}. Maybe heroes not found or empty`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete heroes with id=" + id
        });
    });
};

// Delete all heroes
exports.deleteAll = (req, res) => {
    DotaHeroes.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({
            message: `${nums} heroes were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occures while removing all heroes"
        });
    });
};
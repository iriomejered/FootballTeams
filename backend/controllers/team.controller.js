const db = require("../models");
const Team = db.football_teams;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    const team = {
        name: req.body.name,
        player_amount: req.body.player_amount,
        league: req.body.league,
        trophies: req.body.trophies,
    };

    Team.create(team)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the team."
            });
        });
};

exports.findAll = (req, res) => {
    Team.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retreiving teams."
            });
        });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Team.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1 || (Array.isArray(num) && num[0] == 1)) {
        res.send({ message: "Team was updated successfully" });
      } else {
        res.send({
          message:
            `Cannot update team with id=${id}. Maybe team was not found or req.body is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating team with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Team.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Team was deleted successfully" });
      } else {
        res.send({
          message: `Cannot delete team with id=${id}. Maybe team was not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete team with id=" + id,
      });
    });
};
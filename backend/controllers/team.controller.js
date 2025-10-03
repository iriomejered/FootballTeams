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

exports.findOne = (req, res) => {

};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};
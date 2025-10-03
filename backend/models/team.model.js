module.exports = (sequelize, Sequelize) => {
    const Team = sequelize.define("team", {
        name: {
            type: Sequelize.STRING
        },
        player_amount: {
            type: Sequelize.STRING
        },
        league: {
            type: Sequelize.STRING
        },
        trophies: {
            type: Sequelize.STRING
        }
    });

    return Team;
}
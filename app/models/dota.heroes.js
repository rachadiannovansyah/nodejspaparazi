module.exports = (sequelize, Sequelize) => {
    const DotaHeroes = sequelize.define('dotaheroes', {
        name: {
            type: Sequelize.STRING
        },
        ability: {
            type: Sequelize.STRING
        },
        description:{
            type: Sequelize.STRING
        },
        released: {
            type: Sequelize.BOOLEAN
        }
    });

    return DotaHeroes;
};
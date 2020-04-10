module.exports = app => {
    const heroes = require("../controllers/dotaHeroesController");

    var router = require("express").Router();

    // Create new heroes routes
    router.post("/", heroes.create);

    // Find all heroes
    router.get("/", heroes.findAll);

    // Find heroes by id
    router.get("/:id", heroes.findOne);

    // Update heroes by id
    router.put("/:id", heroes.update);

    // Find heroes released
    router.get("/released", heroes.findAllReleased);

    // Delete heroes by id
    router.delete("/:id", heroes.delete);

    // Delete all heroes
    router.delete("/", heroes.deleteAll);

    app.use("/api/dotaheroes/", router);
};
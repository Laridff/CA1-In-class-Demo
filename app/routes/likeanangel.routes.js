module.exports = app => {
    
    const likeanangel = require("../controllers/LikeanAngel.controller");

    let router = require("express").Router();

    //create a new entree
    router.post("/", likeanangel.create);

    //retrieve all in treatments_list
    router.get("/", likeanangel.findAll);

    //retrieve one treatment by id
    router.get("/:id", likeanangel.findOne);

    //update a treatment item by id
    router.put("/:id", likeanangel.update);

    //delete treatment item by id
    router.delete("/:id", likeanangel.delete);

    //delete all treatment in the list
    router.delete("/", likeangel.deleteAll);

    app.use('/api/likeanangel', router);
}
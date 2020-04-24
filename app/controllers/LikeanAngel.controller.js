const db = require("../models");
const Likeanangel = db.likeanangel;

// Create and Save a new treatments
exports.create = (req, res) => {
    //request validation
    if (!req.body.title) {
        res.status(400).send({ message: "Content cannot be empty." });
        return;
    }

    //create a new treatments
    const likeanangel = new Likeanangel({
        section: req.body.section,
        item: req.body.item,
        price: req.body.price,
        published: req.body.published ? req.body.published : false
    });

    //save treatments to the DB
    likeanangel
        .save(likeanangel)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "An error has occurred while inserting the book into the list."
            });
        });
};

// Retrieve all treatments from the database using 'item' as condiditon from the Req.
exports.findAll = (req, res) => {
    const item = req.query.title;
    let condition = item ? { item: { $regex: new RegExp(item), $options: "i" } } : {};

    Likeanangel.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error has occured while retrieving tutorials."
            });
        });
};

// Find a single treatment with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Likeanangel.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found treatment with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving treatment with ref. id= " + id});
            });
};

// Update a Item by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    Likeanangel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
       .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update item with id=${id}. Maybe treatment could not be found.`
            });
          } else res.send({ message: "treatment was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating tratment item with id=" + id
            });
        });
  
};

// Delete a specified treatment with _id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Likeanangel.findByIdAndRemove(id)
        .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete Treatment item with id=${id}. Maybe Treatment item could not be found!`
            });
        } else {
            res.send({
                message: "Treatment item was deleted successfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Treatment item with id=" + id
        });
    });

};

// Delete all treatment from the database.
exports.deleteAll = (req, res) => {
    Likeanangel.deleteMany({})
    .then(data => {
    res.send({
        message: `${data.deletedCount} treatments were successfully deleted!`
    });
})
.catch(err => {
    res.status(500).send({
        message:
            err.message || "Some error occurred while removing all tre. Please try again."
  });
});
};


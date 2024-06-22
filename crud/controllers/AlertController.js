const Alert = require('../models/AlertModel');
const index = (req, res) => {
    Alert.find().then(alerts => {
        res.json(alerts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving alerts'
        });
    });
};
const show = (req, res) => {
    const id = req.params.id;
    Alert.findById(id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Alert with id ${id} not found`
            });
        } else {
            res.json(data);
        }
    }).catch(err => {
        res.status(500).send({
            message: `Error retrieving alert with id ${id}`
        });
    });
};
const create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content cannot be empty'
        });
        return;
    }
    const alert = new Alert({
        name: req.body.name,
        description: req.body.description,
        url: req.body.url,
        status: req.body.status
    });
    alert.save(alert).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the Alert'
        });
    });
};
const update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Data to update cannot be empty'
        });
    }
    const id = req.params.id;
    Alert.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update Alert with id ${id}. Maybe Alert was not found`
            });
        } else {
            res.json(data);
        }
    }).catch(err => {
        res.status(500).send({
            message: `Error updating Alert with id ${id}`
        });
    });
};
const destroy = (req, res) => {
    const id = req.params.id;
    Alert.findByIdAndDelete(id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete Alert with id ${id}. Maybe Alert was not found`
            });
        } else {
            res.send({
                message: 'Alert was deleted successfully'
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `Could not delete Alert with id ${id}`
        });
    });
};
module.exports = {
    index,
    show,
    create,
    update,
    destroy
};

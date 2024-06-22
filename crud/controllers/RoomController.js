const Room = require('../models/RoomModel'); // Ensure to adjust path as per your folder structure

const index = (req, res) => {
    Room.find()
        .then(rooms => {
            res.json(rooms);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving rooms'
            });
        });
};

const show = (req, res) => {
    const id = req.params.id;
    Room.findById(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Room with id ${id} not found`
                });
            } else {
                res.json(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving room with id ${id}`
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

    const room = new Room({
        name: req.body.name,
        description: req.body.description,
        // Add other required fields as per your Room model
    });

    room.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Room'
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
    Room.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Room with id ${id}. Maybe Room was not found`
                });
            } else {
                res.json(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating Room with id ${id}`
            });
        });
};

const destroy = (req, res) => {
    const id = req.params.id;
    Room.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Room with id ${id}. Maybe Room was not found`
                });
            } else {
                res.send({
                    message: 'Room was deleted successfully'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete Room with id ${id}`
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

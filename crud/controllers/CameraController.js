const Camera = require('../models/CameraModel.js');
const index = (req, res) => {
    Camera.find().then(cameras => {
        res.json(cameras);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving cameras'
        });
    });
};
const show = (req, res) => {
    const id = req.params.id;
    Camera.findById(id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Camera with id ${id} not found`
            });
        } else {
            res.json(data);
        }
    }).catch(err => {
        res.status(500).send({
            message: `Error retrieving camera with id ${id}`
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
    const camera = new Camera({
        name: req.body.name,
        description: req.body.description,
        url: req.body.url,
        status: req.body.status
    });
    camera.save(camera).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the Camera'
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
    Camera.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update Camera with id ${id}. Maybe Camera was not found`
            });
        } else {
            res.json(data);
        }
    }).catch(err => {
        res.status(500).send({
            message: `Error updating Camera with id ${id}`
        });
    });
};
const destroy = (req, res) => {
    const id = req.params.id;
    Camera.findByIdAndRemove(id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete Camera with id ${id}. Maybe Camera was not found`
            });
        } else {
            res.send({
                message: 'Camera was deleted successfully'
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `Could not delete Camera with id ${id}`
        });
    });

//     // Dummy function to simulate scanning cameras
// const scanForCameras = () => {
//     return [
//       { id: 1, name: 'Camera 1', ip: '192.168.0.101', model: 'Model X' },
//       { id: 2, name: 'Camera 2', ip: '192.168.0.102', model: 'Model Y' },
//     ];
//   };
  
//   // Controller function to handle scanning cameras
//   const getCameras = (req, res) => {
//     try {
//       const cameras = scanForCameras();
//       res.json(cameras);
//     } catch (error) {
//       console.error('Error scanning for cameras:', error);
//       res.status(500).json({ message: 'Error scanning for cameras' });
//     }
//   };
  
 
};
module.exports = {
    index,
    show,
    create,
    update,
    destroy,
    // getCameras
    
};
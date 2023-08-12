let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let recipe = require('../models/recipe-schema');


router.route('/create').post((req, res, next) => {
    recipe.create(req.body)
        
    .then((result) => {res.json(res)})
    .catch((error) => { return next(error)})
    
});
// router.route('/read').get((req, res, next) => {
//     recipe.find(req.body)
        
//     .then((result) => {res.json(res)})
//     .catch((error) => { return next(error)})
    
// });
router.route('/').get(( res, next) => {
   
    recipe.find()
        
    .then((result) => {res.json(res)})
    .catch((error) => { return error})
});
router.route('/edit/:id').get((req, res) => {
    recipe.findById(req.params.id, (error, data) => {
        if (error) {
            // eslint-disable-next-line no-undef
            return next(error)
        } else {
            res.json(data)
        }
    })
})

router.route('/update/:id').put((req, res, next) => {
    recipe.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            console.log(error)
            return next(error)
        } else {
            res.json(data)
            console.log('User updated successfully !')
        }
    })
})
router.route('/delete/:id').delete((req, res, next) => {
    recipe.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})
module.exports = router;
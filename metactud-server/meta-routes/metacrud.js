var metaRouter = require('express').Router();
var controller = require('../meta-controller/metacontrollers');

//GET ALL ITEMS BY FILE NAME
metaRouter.get('/:entity', (req, res) => {
    controller.getAll(req.params.entity, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send((data));
        }
    }
    );
})

//GET ONE ITEM BY ID
metaRouter.get('/:entity/:id', (req, res) => {
    controller.getOne(req.params.entity, req.params.id, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    }
    );
});

//CREATE NEW ITEM
metaRouter.post('/:entity', (req, res) => {
    controller.create(req.params.entity, req.body, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    }
    );
});

//UPDATE ITEM BY ID
metaRouter.put('/:entity/:id',  (req, res) => {
    try{
        var response = controller.update(req.params.entity, req.params.id, req.body);    
        console.log(response);
        res.status(200).send(response);
    }catch(e){
        res.status(500).send(e);
    }
});

metaRouter.delete('/:entity/:id', (req, res)=>{
    controller.deleter(req.params.entity, req.params.id, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    }
    );
})

module.exports = metaRouter;
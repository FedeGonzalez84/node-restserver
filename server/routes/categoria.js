const express = require('express');
const app = express();

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let Categoria = require('../models/categoria');


//===================================
// Mostrar todas las categorias
//===================================
app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({})
        //Ordena por descripcion
        .sort('descripcion')
        //Busca los objects ID que tenga el documento y los llena con el valor correspondiente
        .populate('usuario', 'nombre email')
        //Ejecuta el find
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                categorias
            });

        });
});
//===================================
// Mostrar una categoria por ID
//===================================
app.get('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    Categoria.findById(id, (err, categoria) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!categoria) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe!'
                }
            });
        };
        res.json({
            ok: true,
            categoria
        });

    });

});

//===================================
// Crear una categoria
//===================================
app.post('/categoria', verificaToken, (req, res) => {
    //Regresa la nueva categoria
    let body = req.body;
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });
    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            categoria: categoriaDB
        });


    });
});

//===================================
// Actualizar una categoria
//===================================
app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;
    let descCategoria = {
        descripcion: body.descripcion
    };

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});


//===================================
// Borrar fisicamente una categoria
//===================================
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    //Solo un administrador puede borrar una categoria
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no existe!'
                }
            });
        };
        res.json({
            ok: true,
            message: 'Categoria borrada'
        })
    });
});

module.exports = app;
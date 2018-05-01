const jwt = require('jsonwebtoken');

/**
 * Verificar token
 */
let verificaToken = (req, res, next) => {

    //Para obtener lo que se manda en el header
    let token = req.get('token');
    //Verificando que el token sea el correcto
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};
/**
 * Verificar AdminRole
 */
let verificaAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;
    let role = usuario.role;

    if (role === 'ADMIN_ROLE') {
        next();
    } else {

        return res.status(401).json({
            ok: false,
            err: {
                message: 'El usuario no es administrador',
            }
        });
    }
}


module.exports = {
    verificaToken,
    verificaAdmin_Role
}
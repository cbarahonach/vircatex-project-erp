import jsonwebtoken from 'jsonwebtoken';
import httpStatus from 'http-status-codes';

export default {
    CheckJWT(req, res, next) {
        if (req.headers.hasOwnProperty('authorization') &&
            req.headers.authorization.includes('Bearer')) {

            const token = req.headers.authorization.replace('Bearer ', '');
            try {
                let decoded = jsonwebtoken.verify(token, process.env.JWT_TOKEN);
                req.jwt = decoded;

                next();
            } catch (err) {
                return res.status(httpStatus.UNAUTHORIZED).json({
                    type: 'unauthorized',
                    message: 'Sesión expirada, vuelva a iniciar sesión.',
                    details: err
                });
            }
        } else {
            return res.status(httpStatus.UNAUTHORIZED).json({
                type: 'unauthorized',
                message: 'Solicitud invalida.'
            });
        }
    }
}
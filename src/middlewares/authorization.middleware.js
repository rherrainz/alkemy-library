import { decode } from '../utils/token.util.js'
import { ROLE } from '../constants/role.constants.js'

export const isAuthenticated = async(req, res, next) => {
    const bearerToken = req.headers.authorization
    if(!bearerToken) throw new Error('Unauthorized acces, you did not send a token')

    try 
    {
        const {id, email, role, isActive} = await decode(bearerToken)

        //ROL DEL USUARIO DEL PAYLOAD DEL TOKEN
        if(role == ROLE.SUPADMIN || role == ROLE.ADMIN || role == ROLE.USER)
        {
            const user = {
                id,
                email,
                role,
                isActive
            }

            req.user = user;

            next();
        }
        else
        {
            next(new Error('Token is invalid'));
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

export const isAdmin = async (req, res, next) => {
    const bearerToken = req.headers.authorization
    if(!bearerToken) throw new Error('Unauthorized acces, you did not send a token')

    try 
    {
        const {id, email, role, isActive} = await decode(bearerToken)

        //ROL DEL USUARIO DEL PAYLOAD DEL TOKEN
        if(role == ROLE.ADMIN)
        {
            const user = {
                id,
                email,
                role,
                isActive
            }

            req.user = user;

            next();
        }
        else
        {
            next(new Error('Unauthorized access. This resource is reserved for users with superadmin or admin privileges.'));
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

export const isSupAdmin = async (req, res, next) => {
    const bearerToken = req.headers.authorization
    if(!bearerToken) throw new Error('Unauthorized acces, you did not send a token')

    try 
    {
        const {id, email, role, isActive} = await decode(bearerToken)

        //ROL DEL USUARIO DEL PAYLOAD DEL TOKEN
        if(role == ROLE.SUPADMIN)
        {
            const user = {
                id,
                email,
                role,
                isActive
            }

            req.user = user;

            next();
        }
        else
        {
            next(new Error('Unauthorized access. This resource is reserved for users with superadmin privileges.'));
        }
    } catch (error) {
        throw new Error(error.message)
    }
}
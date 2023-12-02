import { RoleRepository } from "../repositories/role.repository.js"
import { decode } from "../utils/token.util.js"

const isAuthenticated = async (req, res, next) => {
    const bearerToken = req.headers.authorization
    if (!bearerToken) throw new Error("Unauthorized access, you did not send a token.")
    try {
        const { id, email, roleId, isActive } = await decode(bearerToken)

        const role = await RoleRepository.getById(roleId)
        if (!role) throw new Error("Role not found")

        if (role.role !== "superadmin" && role.role !== "admin" && role.role !== "user") {
            throw new Error("Not authenticated");
        }
        const user = {
            id,
            email,
            role: role.role,
            isActive
        }
        req.user = user
        next()
    } catch (error) {
        throw (error)
    }
}

const isSuperAdmin = async (req, res, next) => {
    const bearerToken = req.headers.authorization
    if (!bearerToken) throw new Error("Unauthorized access, you did not send a token.")
    try {
        const { id, email, roleId, isActive } = await decode(bearerToken)

        const role = await RoleRepository.getById(roleId)
        if (!role) throw new Error("Role not found")

        if (role.role !== "superadmin") {
            throw new Error("Unauthorized access. This resource is reserved for users with superadmin privileges."); // Ver si cambiamos el mensaje
        }
        const user = {
            id,
            email,
            role: role.role,
            isActive
        }
        req.user = user
        next()
    } catch (error) {
        throw (error)
    }
}

const isAdmin = async (req, res, next) => {
    const bearerToken = req.headers.authorization
    if (!bearerToken) throw new Error("Unauthorized access, you did not send a token.")
    try {
        const { id, email, roleId, isActive } = await decode(bearerToken)

        const role = await RoleRepository.getById(roleId)
        if (!role) throw new Error("Role not found")

        if (role.role !== "superadmin" && role.role !== "admin") {
            throw new Error("Unauthorized access. This resource is reserved for users with superadmin or admin privileges."); // Ver si cambiamos el mensaje
        }
        const user = {
            id,
            email,
            role: role.role,
            isActive
        }
        req.user = user
        next()
    } catch (error) {
        throw (error)
    }
}

export const UserMiddleware = {
    isAuthenticated,
    isSuperAdmin,
    isAdmin
}
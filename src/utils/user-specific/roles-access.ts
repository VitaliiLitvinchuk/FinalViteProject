import roles from "./roles";

export default {
    guest: [roles.GUEST],
    admin: [roles.GUEST, roles.USER, roles.ADMIN],
    user: [roles.GUEST, roles.USER]
}
import { lazy } from "react";
import roles from "../../utils/user-specific/roles";

export const crudsAmount = 9;

export const names: string[] = [
    'Assignments',
    'Statuses',
    'Courses',
    'Groups',
    'UsersGroups',
    'UserGroupRoles',
    'UserRoles',
    'UsesrAssignments',
    'Users'
];

export const keys: string[] = [
    'Assignment',
    'Status',
    'Course',
    'Group',
    'User Group',
    'User Group Role',
    'User Role',
    'User Assignment',
    'User',
];

export const paths = names.map(name => name.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`).replace(/^-/, ''));

if (names.length !== keys.length || keys.length !== crudsAmount)
    throw new Error("names.length, keys.length, crudsAmount must be equal");

export interface Crud {
    name: string;
    component: React.LazyExoticComponent<React.ComponentType>;
    accessLevel: typeof roles[keyof typeof roles];
}

const getAccessLevel = async (path: string): Promise<typeof roles[keyof typeof roles]> => {
    try {
        const module = await import(`./${path}/constants`);

        const accessLevel = module.accessLevel;

        return accessLevel;
    } catch {
        return roles.ADMIN;
    }
};

export const cruds: Crud[] = await Promise.all(
    keys.map(async (key, index) => ({
        name: key,
        component: lazy(() => import(`./${paths[index]}/index.tsx`)),
        accessLevel: await getAccessLevel(paths[index]),
    }))
);

import React from "react";
import HomePage from "./components/home-page";
import roles from "./utils/user-specific/roles";

const rootPath = "";

export interface IRouteEndpoint {
    path: string,
    component: React.ElementType | null,
    accessLevel: typeof roles[keyof typeof roles],
    name: string,
    nested: IRouteEndpoint[] | null
}

const rootRoute: IRouteEndpoint = {
    path: rootPath,
    component: HomePage,
    accessLevel: roles.GUEST,
    name: "Just",
    nested: null
}

export const routes: IRouteEndpoint[] = [
    rootRoute,
];

export default rootPath; 
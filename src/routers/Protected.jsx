import { Children, isValidElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { PAGE_ACCESS } from "../permission/PageAccess";

export const Protected = ({ children }) =>{
    const { user, isAuthenticated } = useAuth();

    const location  = useLocation();

    const element = Children.only(children);
    if (!isValidElement(element)) {
        console.error('Protected expects only one React element as its child');
        return null;
    }

    if(!isAuthenticated || !user || !user.attributes.role){
        return <Navigate to="/sign/in" state={{ from: location }} />;
    }

    const pageName = element.type.name; 
    const isAllowed = PAGE_ACCESS[pageName]?.roles?.includes(user.attributes.role.attributes.role);

    if (!isAllowed) {
        return <Navigate to="/unauthorized" state={{ from: location }} />;
    }
    
    return element;
}


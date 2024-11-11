import { useEffect, useRef, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import axios, { CancelTokenSource } from "axios";
import React from "react";
import { IUserGroupRole } from "../types";
import UserGroupRoleWorkerModal from ".";

const CreateUserGroupRoleModal = React.memo(() => {
    const [userGroupRole, setUserGroupRole] = useState<IUserGroupRole>({ id: "", name: "" });
    const [show, setShow] = useState(false);
    const createCancelTokenRef = useRef<CancelTokenSource | null>(null);

    const { addUserGroupRole } = useActions('userGroupRoles');

    useEffect(() => {
        setUserGroupRole({ id: "", name: "" });
    }, []);

    useEffect(() => {
        return () => {
            createCancelTokenRef.current?.cancel("Create user group role canceled");
        };
    }, []);

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = () => setShow(true);

    const handleSubmit = (status: IUserGroupRole) => {
        createCancelTokenRef.current = axios.CancelToken.source();

        addUserGroupRole(status, createCancelTokenRef.current?.token);
    }

    return (
        <>
            <div
                className="btn btn-success px-3 py-2"
                onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </div>
            <UserGroupRoleWorkerModal show={show} userGroupRole={userGroupRole} title='Create user group role' handleClose={handleClose} handleSubmit={handleSubmit} />
        </>
    );
});

export default CreateUserGroupRoleModal;
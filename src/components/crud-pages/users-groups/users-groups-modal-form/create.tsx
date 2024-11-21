import { useEffect, useRef, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import axios, { CancelTokenSource } from "axios";
import React from "react";
import { ICreateUserGroup, IUpdateUserGroup, IUserGroup } from "../types";
import UserGroupWorkerModal from ".";

const CreateUserGroupModal = React.memo(() => {
    const [userGroup] = useState<IUserGroup>({ userId: "", groupId: "", userGroupRoleId: "", joinedAt: "" });
    const [show, setShow] = useState(false);
    const createCancelTokenRef = useRef<CancelTokenSource | null>(null);

    const { addUserGroup, updateUserGroup } = useActions('usersGroups');

    useEffect(() => {
        return () => {
            createCancelTokenRef.current?.cancel("Create user group canceled");
        };
    }, []);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleSubmit = async (userGroup: IUserGroup) => {
        createCancelTokenRef.current = axios.CancelToken.source();

        await addUserGroup(userGroup as unknown as ICreateUserGroup, createCancelTokenRef.current?.token);
        updateUserGroup(userGroup as unknown as IUpdateUserGroup, createCancelTokenRef.current?.token);
    }

    return (
        <>
            <div
                className="btn btn-success px-3 py-2"
                onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </div>
            <UserGroupWorkerModal show={show} userGroup={userGroup} title='Create user group' handleClose={handleClose} handleSubmit={handleSubmit} />
        </>
    )
});

export default CreateUserGroupModal;
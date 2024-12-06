import { useEffect, useRef, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import axios, { CancelTokenSource } from "axios";
import React from "react";
import GroupWorkerModal from ".";
import { ICreateGroup, IGroup } from "../types";

const CreateGroupModal = React.memo(() => {
    const [group] = useState<IGroup>({ id: "", name: "", description: "", createdAt: "" });
    const [show, setShow] = useState(false);
    const createCancelTokenRef = useRef<CancelTokenSource | null>(null);

    const { addGroup } = useActions('groups');

    useEffect(() => {
        return () => {
            createCancelTokenRef.current?.cancel("Create group canceled");
        };
    }, []);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleSubmit = (group: IGroup) => {
        createCancelTokenRef.current = axios.CancelToken.source();

        addGroup(group as unknown as ICreateGroup, createCancelTokenRef.current?.token);
    }

    return (
        <>
            <div
                className="btn btn-success px-3 py-2"
                onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </div>
            <GroupWorkerModal show={show} group={group} title='Create group' handleClose={handleClose} handleSubmit={handleSubmit} />
        </>
    )
});

export default CreateGroupModal;
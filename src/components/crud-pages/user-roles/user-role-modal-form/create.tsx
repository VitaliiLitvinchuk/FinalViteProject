import { useEffect, useRef, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import axios, { CancelTokenSource } from "axios";
import { IUserRole } from "../types";
import UserRoleWorkerModal from ".";

const CreateUserRoleModal = () => {
    const [status, setStatus] = useState<IUserRole>({ id: "", name: "" });
    const [show, setShow] = useState(false);
    const createCancelTokenRef = useRef<CancelTokenSource | null>(null);

    const { addUserRole } = useActions('userRoles');

    useEffect(() => {
        setStatus({ id: "", name: "" });
    }, []);

    useEffect(() => {
        return () => {
            createCancelTokenRef.current?.cancel("Create status canceled");
        };
    }, []);

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = () => setShow(true);

    const handleSubmit = (status: IUserRole) => {
        createCancelTokenRef.current = axios.CancelToken.source();

        addUserRole(status, createCancelTokenRef.current?.token);
    }

    return (
        <>
            <div
                className="btn btn-success px-3 py-2"
                onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </div>
            <UserRoleWorkerModal show={show} status={status} title='Create user role' handleClose={handleClose} handleSubmit={handleSubmit} />
        </>
    )
}

export default CreateUserRoleModal;
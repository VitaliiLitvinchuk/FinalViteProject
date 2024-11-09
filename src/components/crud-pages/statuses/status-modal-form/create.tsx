import { useEffect, useRef, useState } from "react";
import { IStatus } from "../types";
import StatusWorkerModal from "../status-modal-form";
import { useActions } from "../../../../hooks/useActions";
import axios, { CancelTokenSource } from "axios";

const CreateButton = () => {
    const [status, setStatus] = useState<IStatus>({ id: "", name: "" });
    const [show, setShow] = useState(false);
    const createCancelTokenRef = useRef<CancelTokenSource | null>(null);

    const { addStatus } = useActions('statuses');

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

    const handleSubmit = (status: IStatus) => {
        createCancelTokenRef.current = axios.CancelToken.source();

        addStatus(status, createCancelTokenRef.current?.token);
    }

    return (
        <>
            <div
                className="btn btn-success px-3 py-2"
                onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </div>
            <StatusWorkerModal show={show} status={status} title='Create status' handleClose={handleClose} handleSubmit={handleSubmit} />
        </>
    )
}

export default CreateButton;
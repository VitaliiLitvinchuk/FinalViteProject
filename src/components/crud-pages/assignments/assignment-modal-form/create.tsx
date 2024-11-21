import React, { useEffect, useRef, useState } from "react";
import { IAssignment, ICreateAssignment } from "../types";
import axios, { CancelTokenSource } from "axios";
import { useActions } from "../../../../hooks/useActions";
import AssignmentWorkerModal from ".";

const CreateAssignmentModal = React.memo(() => {
    const [assignment] = useState<IAssignment>({ id: "", title: "", description: "", dueDate: "", maxScore: 0, createdAt: "", courseId: "" });
    const [show, setShow] = useState(false);
    const createCancelTokenRef = useRef<CancelTokenSource | null>(null);

    const { addAssignment } = useActions('assignments');

    useEffect(() => {
        return () => {
            createCancelTokenRef.current?.cancel("Create course canceled");
        };
    }, []);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleSubmit = (assignment: IAssignment) => {
        createCancelTokenRef.current = axios.CancelToken.source();

        addAssignment(assignment as unknown as ICreateAssignment, createCancelTokenRef.current?.token);
    }

    return (
        <>
            <div
                className="btn btn-success px-3 py-2"
                onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </div>
            <AssignmentWorkerModal show={show} assignment={assignment} title='Create assignment' handleClose={handleClose} handleSubmit={handleSubmit} />
        </>
    )
});

export default CreateAssignmentModal;
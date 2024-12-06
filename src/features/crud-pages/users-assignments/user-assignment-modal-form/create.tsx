import React, { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { IFieldSpecifics, IModalFormError, IValidation } from "../../../../components/modal-form/types";
import { useActions } from '../../../../hooks/useActions';
import axios, { CancelTokenSource } from "axios";
import { ICreateUserAssignment } from "../types";
import ModalForm from "../../../../components/modal-form";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

interface IErrorType extends IModalFormError {
    userId: string
    assignmentId: string
}

const fields = ['userId', 'assignmentId'] as const;

const validation = {
    userId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" }
    ] as IValidation[],
    assignmentId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" }
    ] as IValidation[],
}

const specifics = [
    { title: "User", type: "select", options: [] },
    { title: "Assignment", type: "select", options: [] },
] as IFieldSpecifics[];

const CreateModal = React.memo(() => {
    const [userId, setUserId] = useState<string>("");
    const [assignmentId, setAssignmentId] = useState<string>("");
    const [error, setError] = useState<IErrorType>({ userId: "", assignmentId: "" });

    const [show, setShow] = useState(false);
    const createCancelTokenRef = useRef<CancelTokenSource | null>(null);

    const { addUserAssignment } = useActions('usersAssignments');

    const { getUsers } = useActions('users');
    const { getAssignments } = useActions('assignments');

    const { users } = useTypedSelector(state => state.usersReducer);
    const { assignments } = useTypedSelector(state => state.assignmentsReducer);

    const setter = useMemo(() => {
        return [setUserId, setAssignmentId];
    }, []);

    const getter = useMemo(() => {
        return [userId, assignmentId];
    }, [assignmentId, userId]);

    useEffect(() => {
        return () => {
            createCancelTokenRef.current?.cancel("Create user assignment canceled");
        };
    }, []);

    useEffect(() => {
        if (!users.length) {
            getUsers(createCancelTokenRef.current?.token);
        }
        if (!assignments.length) {
            getAssignments(createCancelTokenRef.current?.token);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (users.length) {
            const options = users.map(user => ({ value: user.id, label: `${user.firstName} ${user.lastName}` }));
            specifics[0].options = options;
        }
        if (assignments.length) {
            const options = assignments.map(assignment => ({ value: assignment.id, label: assignment.title }));
            specifics[1].options = options;
        }
    }, [users, assignments]);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleSubmit = (userAssignment: ICreateUserAssignment) => {
        createCancelTokenRef.current = axios.CancelToken.source();

        addUserAssignment(userAssignment, createCancelTokenRef.current?.token);
    }

    return (
        <>
            <div
                className="btn btn-success px-3 py-2"
                onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </div>
            <ModalForm
                show={show}
                title={"Create user"}
                getter={getter}
                setter={setter as Dispatch<SetStateAction<string | File | null>>[]}
                error={error}
                validation={validation}
                specifics={specifics}
                fields={fields}
                handleClose={handleClose}
                setError={setError as Dispatch<SetStateAction<IModalFormError>>}
                handleSubmit={(e) => {
                    handleSubmit({ ...e as unknown as ICreateUserAssignment });
                }}
            />
        </>
    );
});

export default CreateModal;
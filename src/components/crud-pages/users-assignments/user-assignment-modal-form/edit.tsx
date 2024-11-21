import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { IFieldSpecifics, IModalFormError, IValidation } from "../../../features/modal-form/types";
import { IUserAssignment } from "../types";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import ModalForm from "../../../features/modal-form";

interface IErrorType extends IModalFormError {
    statusId: string,
    submittedAt: string
    score: string
}

const fields = ['statusId', 'submittedAt', 'score'] as const;

const validation = {
    statusId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" }
    ] as IValidation[],
    submittedAt: [] as IValidation[],
    score: [] as IValidation[]
}

const specifics = [
    { title: "Status", type: "select", options: [] },
    { title: "Submitted at", type: "date" },
    { title: "Score", type: "number" },
] as IFieldSpecifics[];

interface IEditModalProps {
    show: boolean
    userAssignment: IUserAssignment
    handleClose: () => void
    handleSubmit: (userAssignment: IUserAssignment) => void
}

const EditModal = React.memo(({ show, userAssignment, handleClose, handleSubmit }: IEditModalProps) => {
    const [statusId, setStatusId] = useState<string>(userAssignment.statusId);
    const [submittedAt, setSubmittedAt] = useState<string>(userAssignment.submittedAt ? userAssignment.submittedAt : "");
    const [score, setScore] = useState<string>(userAssignment.score ? userAssignment.score.toString() : "");
    const [error, setError] = useState<IErrorType>({ statusId: "", submittedAt: "", score: "" });

    const { getStatuses } = useActions('statuses');

    const { statuses } = useTypedSelector(state => state.statusesReducer);

    const setter = useMemo(() => {
        return [setStatusId, setSubmittedAt, setScore];
    }, []);

    const getter = useMemo(() => {
        return [statusId, submittedAt, score];
    }, [score, statusId, submittedAt]);

    useEffect(() => {
        if (!specifics[0].options?.length) {
            getStatuses();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (statuses.length) {
            specifics[0].options = statuses.map(status => ({ value: status.id, label: status.name }));
        }
    }, [statuses]);

    return (
        <>
            {
                specifics[0].options?.length &&
                <ModalForm
                    show={show}
                    title={"Edit user assignment"}
                    getter={getter}
                    setter={setter as Dispatch<SetStateAction<string | File | null>>[]}
                    error={error}
                    validation={validation}
                    specifics={specifics}
                    fields={fields}
                    handleClose={handleClose}
                    setError={setError as Dispatch<SetStateAction<IModalFormError>>}
                    handleSubmit={(e) => {
                        handleSubmit({ ...userAssignment, ...e as unknown as IUserAssignment });
                    }}
                />
            }
        </>
    );
});

export default EditModal;
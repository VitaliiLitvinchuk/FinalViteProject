import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { IStatus } from "../types";
import { IFieldSpecifics, IModalFormError, IValidation } from "../../../features/modal-form/types";
import ModalForm from "../../../features/modal-form";

interface IStatusWorkerModalProps {
    show: boolean
    status: IStatus
    title: string
    handleClose: () => void
    handleSubmit: (phone: IStatus) => void
}

interface IErrorType extends IModalFormError {
    name: string
}

const fields = ['name'] as const;

const validation = {
    name: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
        { func: (value: string) => value?.trim().length < 256, message: "The {validationFor} is too long" },
    ] as IValidation[],
}

const specifics = [
    { title: "Title", type: "text" },
] as IFieldSpecifics[];

const StatusWorkerModal = ({ show, status, title, handleClose, handleSubmit }: IStatusWorkerModalProps) => {
    const [name, setName] = useState<string>(status.name);
    const [error, setError] = useState<IErrorType>({ name: "" });

    const setter = useMemo(() => {
        return [setName];
    }, []);

    const getter = useMemo(() => {
        return [name];
    }, [name]);

    return (
        <ModalForm
            show={show}
            title={title}
            getter={getter}
            setter={setter as Dispatch<SetStateAction<string | File | null>>[]}
            error={error}
            validation={validation}
            specifics={specifics}
            fields={fields}
            handleClose={handleClose}
            setError={setError as Dispatch<SetStateAction<IModalFormError>>}
            handleSubmit={(e) => {
                handleSubmit({ ...status, ...e as unknown as IStatus });
            }}
        />
    )
};

export default StatusWorkerModal;

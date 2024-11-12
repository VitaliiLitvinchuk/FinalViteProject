import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { IFieldSpecifics, IModalFormError, IValidation } from "../../../features/modal-form/types";
import ModalForm from "../../../features/modal-form";
import React from "react";
import { IGroup } from "../types";

interface IGroupWorkerModalProps {
    show: boolean
    group: IGroup
    title: string
    handleClose: () => void
    handleSubmit: (group: IGroup) => void
}

interface IErrorType extends IModalFormError {
    name: string
    description: string
}

const fields = ['name', 'description'] as const;

const validation = {
    name: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
        { func: (value: string) => value?.trim().length < 256, message: "The {validationFor} is too long" },
    ] as IValidation[],
    description: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
}

const specifics = [
    { title: "Title", type: "text" },
    { title: "Description", type: "text" },
] as IFieldSpecifics[];

const GroupWorkerModal = React.memo(({ show, group, title, handleClose, handleSubmit }: IGroupWorkerModalProps) => {
    const [name, setName] = useState<string>(group.name);
    const [description, setDescription] = useState<string>(group.description);
    const [error, setError] = useState<IErrorType>({ name: "", description: "" });

    const setter = useMemo(() => {
        return [setName, setDescription];
    }, []);

    const getter = useMemo(() => {
        return [name, description];
    }, [name, description]);

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
                handleSubmit({ ...group, ...e as unknown as IGroup });
            }}
        />
    )
});

export default GroupWorkerModal;

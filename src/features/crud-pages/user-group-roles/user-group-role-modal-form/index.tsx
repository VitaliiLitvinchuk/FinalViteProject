import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { IFieldSpecifics, IModalFormError, IValidation } from "../../../../components/modal-form/types";
import ModalForm from "../../../../components/modal-form";
import React from "react";
import { IUserGroupRole } from "../types";

interface IUserGroupRoleWorkerModalProps {
    show: boolean
    userGroupRole: IUserGroupRole
    title: string
    handleClose: () => void
    handleSubmit: (userGroupRole: IUserGroupRole) => void
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

const UserGroupRoleWorkerModal = React.memo(({ show, userGroupRole, title, handleClose, handleSubmit }: IUserGroupRoleWorkerModalProps) => {
    const [name, setName] = useState<string>(userGroupRole.name);
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
                handleSubmit({ ...userGroupRole, ...e as unknown as IUserGroupRole });
            }}
        />
    );
});

export default UserGroupRoleWorkerModal;

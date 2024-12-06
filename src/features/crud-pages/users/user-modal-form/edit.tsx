import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { IUser } from "../types";
import { IFieldSpecifics, IModalFormError, IValidation } from '../../../../components/modal-form/types';
import { useActions } from "../../../../hooks/useActions";
import ModalForm from "../../../../components/modal-form";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

interface IErrorType extends IModalFormError {
    firstName: string
    lastName: string
    avatarUrl: string

    userRoleId: string
}

const fields = ["firstName", "lastName", "avatarUrl", "userRoleId"] as const;

const validation = {
    firstName: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],

    lastName: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],

    avatarUrl: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],

    userRoleId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
}

const specifics = [
    { title: "First name", type: "text" },
    { title: "Last name", type: "text" },
    { title: "Avatar URL", type: "text" },
    { title: "Role", type: "select", options: [] },
] as IFieldSpecifics[];

interface IEditModalProps {
    show: boolean
    user: IUser
    handleClose: () => void
    handleSubmit: (user: IUser) => void
}

const EditModal = React.memo(({ show, user, handleClose, handleSubmit }: IEditModalProps) => {
    const [firstName, setFirstName] = useState<string>(user.firstName);
    const [lastName, setLastName] = useState<string>(user.lastName);
    const [avatarUrl, setAvatarUrl] = useState<string>(user.avatarUrl);
    const [userRoleId, setUserRoleId] = useState<string>(user.userRoleId);
    const [error, setError] = useState<IErrorType>({ firstName: "", lastName: "", avatarUrl: "", userRoleId: "" });

    const { getUserRoles } = useActions('userRoles');
    const { userRoles } = useTypedSelector(state => state.userRolesReducer);

    const setter = useMemo(() => {
        return [setFirstName, setLastName, setAvatarUrl, setUserRoleId];
    }, []);

    const getter = useMemo(() => {
        return [firstName, lastName, avatarUrl, userRoleId];
    }, [firstName, lastName, avatarUrl, userRoleId]);

    useEffect(() => {
        if (!specifics[3].options?.length) {
            getUserRoles();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (userRoles?.length) {
            const options = userRoles.map((role) => ({
                value: role.id,
                label: role.name,
            }));

            specifics[3].options = options as [{ value: string, label: string }];
        }
    }, [userRoles])

    return (
        <>
            {
                specifics[3].options?.length &&
                <ModalForm
                    show={show}
                    title={"Edit user"}
                    getter={getter}
                    setter={setter as Dispatch<SetStateAction<string | File | null>>[]}
                    error={error}
                    validation={validation}
                    specifics={specifics}
                    fields={fields}
                    handleClose={handleClose}
                    setError={setError as Dispatch<SetStateAction<IModalFormError>>}
                    handleSubmit={(e) => {
                        handleSubmit({ ...user, ...e as unknown as IUser });
                    }}
                />
            }
        </>
    );
});

export default EditModal;
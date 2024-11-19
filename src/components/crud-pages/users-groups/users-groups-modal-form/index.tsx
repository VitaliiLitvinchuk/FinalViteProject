import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { IFieldSpecifics, IModalFormError, IValidation, IModalFormOption } from '../../../features/modal-form/types';
import ModalForm from "../../../features/modal-form";
import React from "react";
import { IUserGroup } from "../types";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import axios from "axios";

interface IUserGroupWorkerModalProps {
    show: boolean
    userGroup: IUserGroup
    title: string
    handleClose: () => void
    handleSubmit: (userGroup: IUserGroup) => void
}

interface IErrorType extends IModalFormError {
    userId: string
    groupId: string
    userGroupRoleId: string
}

const fields = ['userId', 'groupId', 'userGroupRoleId'] as const;

const validation = {
    userId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],

    groupId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],

    userGroupRoleId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
}

const specifics = [
    { title: "User", type: "select", options: [] },
    { title: "Group", type: "select", options: [] },
    { title: "Role", type: "select", options: [] },
] as IFieldSpecifics[];

const UserGroupWorkerModal = React.memo(({ show, userGroup, title, handleClose, handleSubmit }: IUserGroupWorkerModalProps) => {
    const [userId, setUserId] = useState<string>(userGroup.userId);
    const [groupId, setGroupId] = useState<string>(userGroup.groupId);
    const [userGroupRoleId, setUserGroupRoleId] = useState<string>(userGroup.userGroupRoleId);
    const [error, setError] = useState<IErrorType>({ userId: "", groupId: "", userGroupRoleId: "" });

    const { getUsers } = useActions("users");
    const { getGroups } = useActions("groups");
    const { getUserGroupRoles } = useActions("userGroupRoles");

    const { users } = useTypedSelector(state => state.usersReducer);
    const { groups } = useTypedSelector(state => state.groupsReducer);
    const { userGroupRoles } = useTypedSelector(state => state.userGroupRolesReducer);

    useEffect(() => {
        const source = axios.CancelToken.source();

        if (!specifics[0].options?.length) {
            getUsers(source.token);
        }

        if (!specifics[1].options?.length) {
            getGroups(source.token);
        }

        if (!specifics[2].options?.length) {
            getUserGroupRoles(source.token);
        }

        return () => {
            source.cancel("Gets for users, groups and user group roles canceled");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        specifics[0].options = users.map(user => { return { value: user.id, label: user.firstName + " " + user.lastName } as IModalFormOption; });
    }, [users]);

    useEffect(() => {
        specifics[1].options = groups.map(group => { return { value: group.id, label: group.name } as IModalFormOption; });
    }, [groups]);

    useEffect(() => {
        specifics[2].options = userGroupRoles.map(role => { return { value: role.id, label: role.name } as IModalFormOption; });
    }, [userGroupRoles]);

    const setter = useMemo(() => {
        return [setUserId, setGroupId, setUserGroupRoleId];
    }, []);

    const getter = useMemo(() => {
        return [userId, groupId, userGroupRoleId];
    }, [userId, groupId, userGroupRoleId]);

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
                handleSubmit({ ...userGroup, ...e as unknown as IUserGroup });
            }}
        />
    )
});

export default UserGroupWorkerModal;

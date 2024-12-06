import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { IFieldSpecifics, IModalFormError, IModalFormOption, IValidation } from "../../../../components/modal-form/types";
import ModalForm from "../../../../components/modal-form";
import React from "react";
import { ICourse } from "../types";
import { useActions } from "../../../../hooks/useActions";
import axios from "axios";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

interface ICourseWorkerModalProps {
    show: boolean
    course: ICourse
    title: string
    handleClose: () => void
    handleSubmit: (courses: ICourse) => void
}

interface IErrorType extends IModalFormError {
    name: string
    description: string
    userId: string
    groupId: string
}

const fields = ['name', 'description', 'userId', 'groupId'] as const;

const validation = {
    name: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
    description: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
}

const specifics = [
    { title: "Title", type: "text" },
    { title: "Description", type: "text" },
    { title: "User", type: "select", options: [] },
    { title: "Group", type: "select", options: [] },
] as IFieldSpecifics[];

const CourseWorkerModal = React.memo(({ show, course, title, handleClose, handleSubmit }: ICourseWorkerModalProps) => {
    const [name, setName] = useState<string>(course.name);
    const [description, setDescription] = useState<string>(course.description);
    const [userId, setUserId] = useState<string>(course.userId);
    const [groupId, setGroupId] = useState<string>(course.groupId);
    const [error, setError] = useState<IErrorType>({ name: "", description: "", userId: "", groupId: "" });

    const { getUsers } = useActions('users');
    const { getGroups } = useActions('groups');

    const { users } = useTypedSelector(state => state.usersReducer);
    const { groups } = useTypedSelector(state => state.groupsReducer);

    useEffect(() => {
        const source = axios.CancelToken.source();

        if (!specifics[2].options?.length) {
            getUsers(source.token);
        }

        if (!specifics[3].options?.length) {
            getGroups(source.token);
        }

        return () => {
            source.cancel("Get users and groups canceled");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        specifics[2].options = users.map(user => { return { value: user.id, label: user.firstName + " " + user.lastName } as IModalFormOption; });
    }, [users]);

    useEffect(() => {
        specifics[3].options = groups.map(group => { return { value: group.id, label: group.name } as IModalFormOption; });
    }, [groups]);

    const setter = useMemo(() => {
        return [setName, setDescription, setUserId, setGroupId];
    }, []);

    const getter = useMemo(() => {
        return [name, description, userId, groupId];
    }, [name, description, userId, groupId]);

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
                handleSubmit({ ...course, ...e as unknown as ICourse });
            }}
        />
    )
});

export default CourseWorkerModal;

import React, { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { ICreateUser } from "../types";
import { IFieldSpecifics, IModalFormError, IValidation } from '../../../features/modal-form/types';
import { useActions } from "../../../../hooks/useActions";
import axios, { CancelTokenSource } from "axios";
import ModalForm from "../../../features/modal-form";

interface IErrorType extends IModalFormError {
    firstName: string
    lastName: string
    email: string
    googleId: string
    avatarUrl: string
}

const fields = ["firstName", "lastName", "email", "googleId", "avatarUrl"] as const;

const validation = {
    firstName: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],

    lastName: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],

    email: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],

    googleId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],

    avatarUrl: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
}

const specifics = [
    { title: "First name", type: "text" },
    { title: "Last name", type: "text" },
    { title: "Email", type: "text" },
    { title: "Google ID", type: "text" },
    { title: "Avatar URL", type: "text" },
] as IFieldSpecifics[];

const CreateModal = React.memo(() => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [googleId, setGoogleId] = useState<string>("");
    const [avatarUrl, setAvatarUrl] = useState<string>("");
    const [error, setError] = useState<IErrorType>({ firstName: "", lastName: "", email: "", googleId: "", avatarUrl: "" });

    const [show, setShow] = useState(false);
    const createCancelTokenRef = useRef<CancelTokenSource | null>(null);

    const { addUser } = useActions('users');

    const setter = useMemo(() => {
        return [setFirstName, setLastName, setEmail, setGoogleId, setAvatarUrl];
    }, []);

    const getter = useMemo(() => {
        return [firstName, lastName, email, googleId, avatarUrl];
    }, [firstName, lastName, email, googleId, avatarUrl]);

    useEffect(() => {
        return () => {
            createCancelTokenRef.current?.cancel("Create group canceled");
        };
    }, []);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleSubmit = (user: ICreateUser) => {
        createCancelTokenRef.current = axios.CancelToken.source();

        addUser(user, createCancelTokenRef.current?.token);
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
                    handleSubmit({ ...e as unknown as ICreateUser });
                }}
            />
        </>
    );
});

export default CreateModal;
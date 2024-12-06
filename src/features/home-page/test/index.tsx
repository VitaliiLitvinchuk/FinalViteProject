import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { IFieldSpecifics, IModalFormError, IValidation } from "../../../components/modal-form/types";
import ModalForm from "../../../components/modal-form";
export interface IPhoneNumber {
    id: number,
    firstName: string,
    lastName: string,
    phone: string,
    gender: string
    profilePicture: File | null
}
interface IPhoneWorkerModalProps {
    show: boolean
    phone: IPhoneNumber
    title: string
    handleClose: () => void
    handleSubmit: (phone: IPhoneNumber) => void
}

interface IErrorType extends IModalFormError {
    firstName: string
    lastName: string
    phone: string
    gender: string
    profilePicture: string
}

const fields = ['firstName', 'lastName', 'phone', 'gender', 'profilePicture'] as const;

const validation = {
    firstName: [{ func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" }] as IValidation[],
    lastName: [{ func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" }] as IValidation[],
    phone: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
        { func: (value: string) => /^\+380\d{9}$/.test(value), message: "The phone number should be in format +380XXXXXXXXX" },
    ] as IValidation[],
    gender: [{ func: (value: string) => value === "male" || value === "female", message: "Select either Male or Female" }] as IValidation[],
    profilePicture: [{ func: (value: File | null) => value !== null, message: "The {validationFor} is required" }] as IValidation[]
}

const specifics = [
    { title: "First Name", type: "text" },
    { title: "Last Name", type: "text" },
    { title: "Phone", type: "text" },
    { title: "Gender", type: "select", options: [{ value: "male", label: "Male" }, { value: "female", label: "Female" }] },
    { title: "Profile Picture", type: "file" }
] as IFieldSpecifics[];

const PhoneWorkerModal = ({ show, phone, title, handleClose, handleSubmit }: IPhoneWorkerModalProps) => {
    const [newFirstName, setNewFirstName] = useState<string>("");
    const [newLastName, setNewLastName] = useState<string>("");
    const [newPhone, setNewPhone] = useState<string>("");
    const [newGender, setNewGender] = useState<string>("");
    const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);
    const [error, setError] = useState<IErrorType>({ firstName: "", lastName: "", phone: "", gender: "", profilePicture: "" });

    const setter = useMemo(() => {
        return [setNewFirstName, setNewLastName, setNewPhone, setNewGender, setNewProfilePicture];
    }, []);

    const getter = useMemo(() => {
        return [newFirstName, newLastName, newPhone, newGender, newProfilePicture];
    }, [newFirstName, newLastName, newPhone, newGender, newProfilePicture]);

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
                console.log("Form data:", e);
                handleSubmit({ ...phone, ...e as unknown as IPhoneNumber });
            }}
        />
    )
};

export default PhoneWorkerModal;

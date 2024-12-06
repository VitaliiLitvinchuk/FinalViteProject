import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"
import ModalForm from "../../../../components/modal-form"
import { IFieldSpecifics, IModalFormError, IModalFormOption, IValidation } from "../../../../components/modal-form/types"
import { IAssignment } from "../types"
import React from "react"
import axios from "axios"
import { useActions } from "../../../../hooks/useActions"
import { useTypedSelector } from "../../../../hooks/useTypedSelector"

interface ICourseWorkerModalProps {
    show: boolean
    assignment: IAssignment
    title: string
    handleClose: () => void
    handleSubmit: (assignment: IAssignment) => void
}

interface IErrorType extends IModalFormError {
    title: string,
    description: string,
    dueDate: string,
    maxScore: string,
    courseId: string
}

const fields = ['title', 'description', 'dueDate', 'maxScore', 'courseId'] as const;

const validation = {
    title: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
    description: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
    dueDate: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
    maxScore: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
    courseId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
}

const specifics = [
    { title: "Title", type: "text" },
    { title: "Description", type: "text" },
    { title: "Due date", type: "date" },
    { title: "Max score", type: "number" },
    { title: "Course", type: "select", options: [] },
] as IFieldSpecifics[];

const AssignmentWorkerModal = React.memo(({ show, assignment, title, handleClose, handleSubmit }: ICourseWorkerModalProps) => {
    const [assignmentTitle, setAssignmentTitle] = useState<string>(assignment.title);
    const [description, setDescription] = useState<string>(assignment.description);
    const [dueDate, setDueDate] = useState<string>(assignment.dueDate);
    const [maxScore, setMaxScore] = useState<string>(assignment.maxScore.toString());
    const [courseId, setCourseId] = useState<string>(assignment.courseId);
    const [error, setError] = useState<IErrorType>({ title: "", description: "", dueDate: "", maxScore: "", courseId: "" });

    const { getCourses } = useActions('courses');

    const { courses } = useTypedSelector(state => state.coursesReducer);

    useEffect(() => {
        const source = axios.CancelToken.source();

        if (!specifics[4].options?.length) {
            getCourses(source.token);
        }

        return () => {
            source.cancel();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        specifics[4].options = courses.map(course => { return { value: course.id, label: course.name } as IModalFormOption; });
    }, [courses])

    const setter = useMemo(() => {
        return [setAssignmentTitle, setDescription, setDueDate, setMaxScore, setCourseId];
    }, []);

    const getter = useMemo(() => {
        return [assignmentTitle, description, dueDate, maxScore, courseId];
    }, [assignmentTitle, description, dueDate, maxScore, courseId]);

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
                handleSubmit({ ...assignment, ...e as unknown as IAssignment });
            }}
        />
    )
});

export default AssignmentWorkerModal;

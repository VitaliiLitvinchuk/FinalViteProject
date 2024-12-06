import React, { useEffect, useRef, useState } from "react";
import { ICourse, ICreateCourse } from "../types";
import axios, { CancelTokenSource } from "axios";
import { useActions } from "../../../../hooks/useActions";
import CourseWorkerModal from ".";

const CreateCourseModal = React.memo(() => {
    const [course] = useState<ICourse>({ name: "", description: "", userId: "", groupId: "", createdAt: "", id: "" });
    const [show, setShow] = useState(false);
    const createCancelTokenRef = useRef<CancelTokenSource | null>(null);

    const { addCourse } = useActions('courses');

    useEffect(() => {
        return () => {
            createCancelTokenRef.current?.cancel("Create course canceled");
        };
    }, []);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleSubmit = (course: ICourse) => {
        createCancelTokenRef.current = axios.CancelToken.source();

        addCourse(course as unknown as ICreateCourse, createCancelTokenRef.current?.token);
    }

    return (
        <>
            <div
                className="btn btn-success px-3 py-2"
                onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </div>
            <CourseWorkerModal show={show} course={course} title='Create course' handleClose={handleClose} handleSubmit={handleSubmit} />
        </>
    )
});

export default CreateCourseModal;
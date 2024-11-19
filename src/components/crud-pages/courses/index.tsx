import React, { useCallback, useEffect, useState } from "react";
import { ICourse, IUpdateCourse, IUpdateGroupForCourse, IUpdateUserForCourse } from "./types";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import axios from "axios";
import CreateCourseModal from "./course-modal-form/create";
import { Col, Container, Row, Table } from "react-bootstrap";
import moment from "moment";
import CourseWorkerModal from "./course-modal-form";

const Courses = React.memo(() => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<ICourse | null>(null);

    const { getCourses, deleteCourse, updateCourse, updateUserForCourse, updateGroupForCourse } = useActions('courses');
    const { courses } = useTypedSelector(state => state.coursesReducer);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getCourses(source.token);

        return () => {
            source.cancel("Get courses canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback((id: string) => {
        deleteCourse(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = useCallback(async (course: ICourse) => {
        setSelected(null);

        await updateCourse(course as unknown as IUpdateCourse);
        await updateGroupForCourse(course as unknown as IUpdateGroupForCourse);
        updateUserForCourse(course as unknown as IUpdateUserForCourse);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickEdit = useCallback((course: ICourse) => {
        setSelected(course);
        setShow(true);
    }, []);

    return (
        <>
            <h1>Courses</h1>
            <div className="d-flex justify-content-end me-5 my-2">
                <CreateCourseModal />
            </div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className="px-4" style={{ width: "20%" }}>Id</th>
                        <th className="px-4" style={{ width: "10%" }}>Name</th>
                        <th className="px-4" style={{ width: "10%" }}>Description</th>
                        <th className="px-4" style={{ width: "10%" }}>User</th>
                        <th className="px-4" style={{ width: "10%" }}>Group</th>
                        <th className="px-4" style={{ width: "20%" }}>Created</th>
                        <th className="text-center" style={{ width: "20%" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <tr key={course.id}>
                            <td className="text-start"><span className="mx-2">{course.id}</span></td>
                            <td className="text-start"><span className="mx-2">{course.name}</span></td>
                            <td className="text-start"><span className="mx-2">{course.description}</span></td>
                            <td className="text-start"><span className="mx-2">{course.user?.email}</span></td>
                            <td className="text-start"><span className="mx-2">{course.group?.name}</span></td>
                            <td className="text-start"><span className="mx-2">{moment(course.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span></td>
                            <td>
                                <Container fluid>
                                    <Row>
                                        <Col>
                                            <button className="btn btn-outline-warning w-100" onClick={() => onClickEdit(course)}>Edit</button>
                                        </Col>
                                        <Col>
                                            <button className="btn btn-outline-danger w-100" onClick={() => handleDelete(course.id)}>Delete</button>
                                        </Col>
                                    </Row>
                                </Container>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {
                selected && show &&
                <CourseWorkerModal show={show} course={selected} title="Edit course" handleClose={() => setShow(false)} handleSubmit={handleEdit} />
            }
        </>
    )
});

export default Courses;
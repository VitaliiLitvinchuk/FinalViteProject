import React, { useCallback, useEffect, useState } from "react";
import { IAssignment, IUpdateAssignment, IUpdateCourseForAssignment } from "./types";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import axios from "axios";
import { Col, Container, Row, Table } from "react-bootstrap";
import AssignmentWorkerModal from "./assignment-modal-form";
import CreateAssignmentModal from "./assignment-modal-form/create";
import moment from "moment";

const Assignments = React.memo(() => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<IAssignment | null>(null);

    const { getAssignments, updateAssignment, deleteAssignment, updateCourseForAssignment } = useActions('assignments');
    const { assignments } = useTypedSelector(state => state.assignmentsReducer);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getAssignments(source.token);

        return () => {
            source.cancel("Get courses canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback((id: string) => {
        deleteAssignment(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = useCallback(async (assignment: IAssignment) => {
        setSelected(null);

        await updateAssignment(assignment as unknown as IUpdateAssignment);
        updateCourseForAssignment(assignment as unknown as IUpdateCourseForAssignment);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickEdit = useCallback((assignment: IAssignment) => {
        setSelected(assignment);
        setShow(true);
    }, []);

    return (
        <>
            <h1>Assignments</h1>
            <div className="d-flex justify-content-end me-5 my-2">
                <CreateAssignmentModal />
            </div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className="px-4" style={{ width: "10%" }}>Id</th>
                        <th className="px-4" style={{ width: "10%" }}>Title</th>
                        <th className="px-4" style={{ width: "20%" }}>Description</th>
                        <th className="px-4" style={{ width: "10%" }}>Due Date</th>
                        <th className="px-4" style={{ width: "10%" }}>Max Score</th>
                        <th className="px-4" style={{ width: "10%" }}>Course</th>
                        <th className="px-4" style={{ width: "10%" }}>Created</th>
                        <th className="text-center" style={{ width: "20%" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {assignments.map(assignment => (
                        <tr key={assignment.id}>
                            <td className="text-start"><span className="mx-2">{assignment.id}</span></td>
                            <td className="text-start"><span className="mx-2">{assignment.title}</span></td>
                            <td className="text-start"><span className="mx-2">{assignment.description}</span></td>
                            <td className="text-start"><span className="mx-2">{moment(assignment.dueDate).format('YYYY-MM-DD')}</span></td>
                            <td className="text-start"><span className="mx-2">{assignment.maxScore}</span></td>
                            <td className="text-start"><span className="mx-2">{assignment.course?.name}</span></td>
                            <td className="text-start"><span className="mx-2">{moment(assignment.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span></td>
                            <td>
                                <Container fluid>
                                    <Row>
                                        <Col>
                                            <button className="btn btn-outline-warning w-100" onClick={() => onClickEdit(assignment)}>Edit</button>
                                        </Col>
                                        <Col>
                                            <button className="btn btn-outline-danger w-100" onClick={() => handleDelete(assignment.id)}>Delete</button>
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
                <AssignmentWorkerModal show={show} assignment={selected} title="Edit assignment" handleClose={() => setShow(false)} handleSubmit={handleEdit} />
            }
        </>
    )
});

export default Assignments;
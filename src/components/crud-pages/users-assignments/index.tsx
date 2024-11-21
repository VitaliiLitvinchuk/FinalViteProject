import React, { useCallback, useEffect, useState } from "react";
import { IUpdateUserAssignment, IUserAssignment } from "./types";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import axios from "axios";
import CreateModal from "./user-assignment-modal-form/create";
import EditModal from "./user-assignment-modal-form/edit";
import { Col, Container, Row, Table } from "react-bootstrap";
import moment from "moment";

const UsersAssignments = React.memo(() => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<IUserAssignment | null>(null);

    const { getUsersAssignments, updateUserAssignment, deleteUserAssignment } = useActions('usersAssignments');
    const { usersAssignments } = useTypedSelector(state => state.usersAssignmentsReducer);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getUsersAssignments(source.token);

        return () => {
            source.cancel("Get users assignments canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback((userId: string, assignmentId: string) => {
        deleteUserAssignment(userId, assignmentId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = useCallback((userAssignment: IUserAssignment) => {
        setSelected(null);
        updateUserAssignment(userAssignment as unknown as IUpdateUserAssignment);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickEdit = useCallback((userAssignment: IUserAssignment) => {
        setSelected(userAssignment);
        setShow(true);
    }, []);

    return (
        <>
            <h1>Users Assignments</h1>
            <div className="d-flex justify-content-end me-5 my-2">
                <CreateModal />
            </div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className="px-4" style={{ width: "20%" }}>User</th>
                        <th className="px-4" style={{ width: "20%" }}>Assignment</th>
                        <th className="px-4" style={{ width: "10%" }}>Status</th>
                        <th className="px-4" style={{ width: "10%" }}>Score</th>
                        <th className="px-4" style={{ width: "20%" }}>Submit Date</th>
                        <th className="text-center" style={{ width: "20%" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {usersAssignments.map(userAssignment => (
                        <tr key={`${userAssignment.userId}-${userAssignment.assignmentId}`}>
                            <td className="text-start"><span className="mx-2">{userAssignment.user?.firstName} {userAssignment.user?.lastName}</span></td>
                            <td className="text-start"><span className="mx-2">{userAssignment.assignment?.title}</span></td>
                            <td className="text-start"><span className="mx-2">{userAssignment.status?.name}</span></td>
                            <td className="text-start"><span className="mx-2">{Number.isInteger(userAssignment.score) ? userAssignment.score : "-"}</span></td>
                            <td className="text-start"><span className="mx-2">{userAssignment.submittedAt ? moment(userAssignment.submittedAt).format('YYYY-MM-DD') : "-"}</span></td>
                            <td>
                                <Container fluid>
                                    <Row>
                                        <Col>
                                            <button className="btn btn-outline-warning w-100" onClick={() => onClickEdit(userAssignment)}>Edit</button>
                                        </Col>
                                        <Col>
                                            <button className="btn btn-outline-danger w-100" onClick={() => handleDelete(userAssignment.userId, userAssignment.assignmentId)}>Delete</button>
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
                <EditModal show={show} userAssignment={selected} handleClose={() => setShow(false)} handleSubmit={handleEdit} />
            }
        </>
    )
});

export default UsersAssignments;
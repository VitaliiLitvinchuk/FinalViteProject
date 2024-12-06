import React, { useCallback, useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import axios from "axios";
import { IUserRole } from "./types";
import CreateUserRoleModal from "./user-role-modal-form/create";
import { Col, Container, Row, Table } from "react-bootstrap";
import UserRoleWorkerModal from "./user-role-modal-form";

const UserRoles = React.memo(() => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<IUserRole | null>(null);

    const { getUserRoles, updateUserRole, deleteUserRole } = useActions('userRoles');
    const { userRoles } = useTypedSelector(state => state.userRolesReducer);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getUserRoles(source.token);

        return () => {
            source.cancel("Get user roles canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback((id: string) => {
        deleteUserRole(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = useCallback((role: IUserRole) => {
        setSelected(null);
        updateUserRole(role);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickEdit = useCallback((role: IUserRole) => {
        setSelected(role);
        setShow(true);
    }, []);

    return (
        <>
            <h1>User Roles</h1>
            <div className="d-flex justify-content-end me-5 my-2">
                <CreateUserRoleModal />
            </div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className="px-4" style={{ width: "40%" }}>Id</th>
                        <th className="px-4" style={{ width: "30%" }}>Role</th>
                        <th className="text-center" style={{ width: "30%" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userRoles.map(userRole => (
                        <tr key={userRole.id}>
                            <td className="text-start"><span className="mx-2">{userRole.id}</span></td>
                            <td className="text-start"><span className="mx-2">{userRole.name}</span></td>
                            <td>
                                <Container fluid>
                                    <Row>
                                        <Col>
                                            <button className="btn btn-outline-warning w-100" onClick={() => onClickEdit(userRole)}>Edit</button>
                                        </Col>
                                        <Col>
                                            <button className="btn btn-outline-danger w-100" onClick={() => handleDelete(userRole.id)}>Delete</button>
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
                <UserRoleWorkerModal show={show} status={selected} title="Edit user role" handleClose={() => setShow(false)} handleSubmit={handleEdit} />
            }
        </>
    );
});

export default UserRoles;
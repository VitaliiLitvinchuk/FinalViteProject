import React, { useCallback, useEffect, useState } from "react";
import { IUserGroupRole } from "./types";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import axios from "axios";
import CreateUserGroupRoleModal from "./user-group-role-modal-form/create";
import { Col, Container, Row, Table } from "react-bootstrap";
import UserGroupRoleWorkerModal from "./user-group-role-modal-form";

const UserGroupRoles = React.memo(() => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<IUserGroupRole | null>(null);

    const { getUserGroupRoles, updateUserGroupRole, deleteUserGroupRole } = useActions('userGroupRoles');
    const { userGroupRoles } = useTypedSelector(state => state.userGroupRolesReducer);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getUserGroupRoles(source.token);

        return () => {
            source.cancel("Get user group roles canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback((id: string) => {
        deleteUserGroupRole(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = useCallback((role: IUserGroupRole) => {
        setSelected(null);
        updateUserGroupRole(role);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickEdit = useCallback((role: IUserGroupRole) => {
        setSelected(role);
        setShow(true);
    }, []);

    return (
        <>
            <h1>User Group Roles</h1>
            <div className="d-flex justify-content-end me-5 my-2">
                <CreateUserGroupRoleModal />
            </div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className="px-4" style={{ width: "40%" }}>Id</th>
                        <th className="px-4" style={{ width: "30%" }}>Name</th>
                        <th className="text-center" style={{ width: "30%" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userGroupRoles.map(userGroupRole => (
                        <tr key={userGroupRole.id}>
                            <td className="text-start"><span className="mx-2">{userGroupRole.id}</span></td>
                            <td className="text-start"><span className="mx-2">{userGroupRole.name}</span></td>
                            <td>
                                <Container fluid>
                                    <Row>
                                        <Col>
                                            <button className="btn btn-outline-warning w-100" onClick={() => onClickEdit(userGroupRole)}>Edit</button>
                                        </Col>
                                        <Col>
                                            <button className="btn btn-outline-danger w-100" onClick={() => handleDelete(userGroupRole.id)}>Delete</button>
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
                <UserGroupRoleWorkerModal show={show} userGroupRole={selected} title="Edit user group role" handleClose={() => setShow(false)} handleSubmit={handleEdit} />
            }
        </>
    );
});

export default UserGroupRoles;
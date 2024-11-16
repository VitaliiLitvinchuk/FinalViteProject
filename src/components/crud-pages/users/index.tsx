import React, { useCallback, useEffect, useState } from "react";
import { IUpdateUser, IUser } from "./types";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import axios from "axios";
import EditModal from "./user-modal-form/edit";
import { Col, Container, Row, Table } from "react-bootstrap";
import CreateModal from "./user-modal-form/create";

const Users = React.memo(() => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<IUser | null>(null);

    const { getUsers, deleteUser, updateUser, updateRoleForUser } = useActions('users');
    const { users } = useTypedSelector(state => state.usersReducer);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getUsers(source.token);

        return () => {
            source.cancel("Get users canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback((id: string) => {
        deleteUser(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = useCallback((user: IUser) => {
        setSelected(null);
        updateUser(user as unknown as IUpdateUser);

        if (user.userRoleId !== users.find(u => u.id === user.id)?.userRoleId) {
            updateRoleForUser({ id: user.id, userRoleId: user.userRoleId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickEdit = useCallback((user: IUser) => {
        setSelected(user);
        setShow(true);
    }, []);

    return (
        <>
            <h1>Users</h1>
            <div className="d-flex justify-content-end me-5 my-2">
                <CreateModal />
            </div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className="px-4" style={{ width: "20%" }}>Id</th>
                        <th className="px-4" style={{ width: "10%" }}>First name</th>
                        <th className="px-4" style={{ width: "10%" }}>Last name</th>
                        <th className="px-4" style={{ width: "10%" }}>Email</th>
                        <th className="px-4" style={{ width: "10%" }}>Google Id</th>
                        <th className="px-4" style={{ width: "10%" }}>Role</th>
                        <th className="px-4" style={{ width: "10%" }}>Avatar</th>
                        <th className="text-center" style={{ width: "20%" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="text-start"><span className="mx-2">{user.id}</span></td>
                            <td className="text-start"><span className="mx-2">{user.firstName}</span></td>
                            <td className="text-start"><span className="mx-2">{user.lastName}</span></td>
                            <td className="text-start"><span className="mx-2">{user.email}</span></td>
                            <td className="text-start"><span className="mx-2">{user.googleId}</span></td>
                            <td className="text-start"><span className="mx-2">{user.userRole.name}</span></td>
                            <td className="text-start"><span className="mx-2">{user.avatarUrl}</span></td>
                            <td>
                                <Container fluid>
                                    <Row>
                                        <Col>
                                            <button className="btn btn-outline-warning w-100" onClick={() => onClickEdit(user)}>Edit</button>
                                        </Col>
                                        <Col>
                                            <button className="btn btn-outline-danger w-100" onClick={() => handleDelete(user.id)}>Delete</button>
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
                <EditModal show={show} user={selected} handleClose={() => setShow(false)} handleSubmit={handleEdit} />
            }
        </>
    )
});

export default Users;
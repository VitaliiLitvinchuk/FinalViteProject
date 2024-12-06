import { useCallback, useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import React from "react";
import moment from "moment";
import { IUpdateUserGroup, IUserGroup } from "./types";
import CreateUserGroupModal from "./users-groups-modal-form/create";
import UserGroupWorkerModal from "./users-groups-modal-form";

const UsersGroups = React.memo(() => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<IUserGroup | null>(null);

    const { getUsersGroups, updateUserGroup, deleteUserGroup } = useActions('usersGroups');
    const { usersGroups } = useTypedSelector(state => state.usersGroupsReducer);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getUsersGroups(source.token);

        return () => {
            source.cancel("Get usersgroups canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback((userId: string, groupId: string) => {
        deleteUserGroup(userId, groupId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = useCallback((userGroup: IUserGroup) => {
        setSelected(null);
        updateUserGroup(userGroup as unknown as IUpdateUserGroup);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickEdit = useCallback((userGroup: IUserGroup) => {
        setSelected(userGroup);
        setShow(true);
    }, []);

    return (
        <>
            <h1>Users Groups</h1>
            <div className="d-flex justify-content-end me-5 my-2">
                <CreateUserGroupModal />
            </div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className="px-4" style={{ width: "20%" }}>User</th>
                        <th className="px-4" style={{ width: "20%" }}>Group</th>
                        <th className="px-4" style={{ width: "20%" }}>Role</th>
                        <th className="px-4" style={{ width: "20%" }}>Joined</th>
                        <th className="text-center" style={{ width: "20%" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {usersGroups.map(userGroup => (
                        <tr key={userGroup.userId + userGroup.groupId}>
                            {
                                userGroup.user && userGroup.group && userGroup.userGroupRole ?
                                    <>
                                        <td>{userGroup.user.firstName} {userGroup.user.lastName}</td>
                                        <td>{userGroup.group.name}</td>
                                        <td>{userGroup.userGroupRole.name}</td>
                                        <td>{moment(userGroup.joinedAt).format('DD/MM/YYYY')}</td>
                                        <td>
                                            <Container fluid>
                                                <Row>
                                                    <Col>
                                                        <button className="btn btn-outline-warning w-100" onClick={() => onClickEdit(userGroup)}>Edit</button>
                                                    </Col>
                                                    <Col>
                                                        <button className="btn btn-outline-danger w-100" onClick={() => handleDelete(userGroup.userId, userGroup.groupId)}>Delete</button>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </td>
                                    </> :
                                    <td colSpan={5}>
                                        Error user or group or role
                                    </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </Table>
            {
                selected && show &&
                <UserGroupWorkerModal show={show} userGroup={selected} title="Edit user group" handleClose={() => setShow(false)} handleSubmit={handleEdit} />
            }
        </>
    )
});

export default UsersGroups;
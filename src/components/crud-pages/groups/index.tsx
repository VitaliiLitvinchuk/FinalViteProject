import { useCallback, useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import React from "react";
import { IGroup, IUpdateGroup } from "./types";
import CreateGroupModal from "./group-modal-form/create";
import GroupWorkerModal from "./group-modal-form";
import moment from "moment";

const Statuses = React.memo(() => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<IGroup | null>(null);

    const { getGroups, updateGroup, deleteGroup } = useActions('groups');
    const { groups } = useTypedSelector(state => state.groupsReducer);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getGroups(source.token);

        return () => {
            source.cancel("Get groups canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback((id: string) => {
        deleteGroup(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = useCallback((group: IGroup) => {
        setSelected(null);
        updateGroup(group as unknown as IUpdateGroup);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickEdit = useCallback((group: IGroup) => {
        setSelected(group);
        setShow(true);
    }, []);

    return (
        <>
            <h1>Groups</h1>
            <div className="d-flex justify-content-end me-5 my-2">
                <CreateGroupModal />
            </div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className="px-4" style={{ width: "20%" }}>Id</th>
                        <th className="px-4" style={{ width: "20%" }}>Name</th>
                        <th className="px-4" style={{ width: "20%" }}>Description</th>
                        <th className="px-4" style={{ width: "20%" }}>Created</th>
                        <th className="text-center" style={{ width: "20%" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map(group => (
                        <tr key={group.id}>
                            <td className="text-start"><span className="mx-2">{group.id}</span></td>
                            <td className="text-start"><span className="mx-2">{group.name}</span></td>
                            <td className="text-start"><span className="mx-2">{group.description}</span></td>
                            <td className="text-start"><span className="mx-2">{moment(group.createAt).format('YYYY-MM-DD HH:mm:ss')}</span></td>
                            <td>
                                <Container fluid>
                                    <Row>
                                        <Col>
                                            <button className="btn btn-outline-warning w-100" onClick={() => onClickEdit(group)}>Edit</button>
                                        </Col>
                                        <Col>
                                            <button className="btn btn-outline-danger w-100" onClick={() => handleDelete(group.id)}>Delete</button>
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
                <GroupWorkerModal show={show} group={selected} title="Edit group" handleClose={() => setShow(false)} handleSubmit={handleEdit} />
            }
        </>
    )
});

export default Statuses;
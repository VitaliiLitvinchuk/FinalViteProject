import { useCallback, useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import CreateStatusModal from "./status-modal-form/create";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import { IStatus } from './types';
import StatusWorkerModal from "./status-modal-form";
import React from "react";

const Statuses = React.memo(() => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<IStatus | null>(null);

    const { getStatuses, updateStatus, deleteStatus } = useActions('statuses');
    const { statuses } = useTypedSelector(state => state.statusesReducer);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getStatuses(source.token);

        return () => {
            source.cancel("Get statuses canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback((id: string) => {
        deleteStatus(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = useCallback((status: IStatus) => {
        setSelected(null);
        updateStatus(status);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickEdit = useCallback((status: IStatus) => {
        setSelected(status);
        setShow(true);
    }, []);

    return (
        <>
            <h1>Statuses</h1>
            <div className="d-flex justify-content-end me-5 my-2">
                <CreateStatusModal />
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
                    {statuses.map(status => (
                        <tr key={status.id}>
                            <td className="text-start"><span className="mx-2">{status.id}</span></td>
                            <td className="text-start"><span className="mx-2">{status.name}</span></td>
                            <td>
                                <Container fluid>
                                    <Row>
                                        <Col>
                                            <button className="btn btn-outline-warning w-100" onClick={() => onClickEdit(status)}>Edit</button>
                                        </Col>
                                        <Col>
                                            <button className="btn btn-outline-danger w-100" onClick={() => handleDelete(status.id)}>Delete</button>
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
                <StatusWorkerModal show={show} status={selected} title="Edit status" handleClose={() => setShow(false)} handleSubmit={handleEdit} />
            }
        </>
    )
});

export default Statuses;
import { useEffect, useState } from "react";
import PhoneWorkerModal, { IPhoneNumber } from ".";

const CreateModal = () => {
    const [phone, setPhone] = useState<IPhoneNumber>({ id: 1, firstName: "", lastName: "", phone: "", gender: "male", profilePicture: null });
    const [show, setShow] = useState(false);

    useEffect(() => {
        setPhone({ id: 1, firstName: "", lastName: "", phone: "", gender: "male", profilePicture: null });
    }, []);

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = () => setShow(true);

    return (
        <>
            <div
                className="btn btn-success px-3 py-2"
                style={{
                    position: 'fixed',
                    top: '17%',
                    left: '25px',
                    color: 'white',
                    cursor: 'pointer',
                    borderRadius: '5px',
                }}
                onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </div>
            <PhoneWorkerModal show={show} phone={phone} title='Create phone' handleClose={handleClose} handleSubmit={setPhone} />
        </>
    )
}

export default CreateModal;
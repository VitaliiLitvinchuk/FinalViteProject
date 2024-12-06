import { useActions } from "../../../hooks/useActions";

const ErrorLogin = () => {
    const { closeInformationMessenger } = useActions('informationMessenger');

    const onClickClose = () => {
        closeInformationMessenger();
    }

    return (
        <>
            <div className="fs-6 p-3 fw-bold" style={{ cursor: 'pointer' }} onClick={onClickClose}>
                Invalid username or password
            </div>
        </>
    )
}

export default ErrorLogin;
import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import './index.css';

const InformationMessenger = () => {
    const [message, setMessage] = useState<React.ReactNode | null>(null);

    const { showInformationMessenger, informationMessengerFileName, backgroundColor } = useTypedSelector(state => state.informationMessengerReducer);

    useEffect(() => {
        if (informationMessengerFileName) {
            const fetchMessage = async () => {
                const module = await import(`./messages/${informationMessengerFileName}.tsx`);
                setMessage(module.default());
            };
            fetchMessage();
        }

        return () => {
            setMessage(null);
        }
    }, [informationMessengerFileName]);

    return (
        <>
            {showInformationMessenger && (
                <div className="info-panel" style={{ backgroundColor }}>
                    {message}
                </div>
            )}
        </>
    );
};

export default InformationMessenger;

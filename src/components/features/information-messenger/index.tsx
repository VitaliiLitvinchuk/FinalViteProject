import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import './index.css';

const InformationMessenger = () => {
    const [message, setMessage] = useState<React.ReactNode | null>(null);

    const { showInformationMessanger, informationMessangerFileName: informationMessengerNodeName } = useTypedSelector(state => state.featuresReducer);

    useEffect(() => {
        if (informationMessengerNodeName) {
            const fetchMessage = async () => {
                const module = await import(`./messages/${informationMessengerNodeName}.tsx`);
                setMessage(module.default());
            };
            fetchMessage();
        }

        return () => {
            setMessage(null);
        }
    }, [informationMessengerNodeName]);

    return (
        <>
            {showInformationMessanger && (
                <div className="info-panel">
                    {message}
                </div>
            )}
        </>
    );
};

export default InformationMessenger;

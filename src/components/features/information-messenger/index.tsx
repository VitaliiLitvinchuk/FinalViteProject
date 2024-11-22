import React, { useState, useEffect, Suspense } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import "./index.css";

const InformationMessenger = () => {
    const [DynamicComponent, setDynamicComponent] = useState<React.LazyExoticComponent<React.ComponentType> | null>(null);

    const { showInformationMessenger, informationMessengerFileName, backgroundColor } = useTypedSelector(state => state.informationMessengerReducer);

    useEffect(() => {
        if (informationMessengerFileName) {
            const fetchComponent = async () => {
                const module = await import(`./messages/${informationMessengerFileName}.tsx`);
                setDynamicComponent(() => React.lazy(() => Promise.resolve({ default: module.default })));
            };
            fetchComponent();
        }

        return () => {
            setDynamicComponent(null);
        };
    }, [informationMessengerFileName]);

    return (
        <>
            {showInformationMessenger && DynamicComponent && (
                <div className="info-panel" style={{ backgroundColor }}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <DynamicComponent />
                    </Suspense>
                </div>
            )}
        </>
    );
};

export default InformationMessenger;

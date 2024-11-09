import { Suspense } from "react";
import { cruds } from "./constants";
import Loader from "../loader";

// eslint-disable-next-line react-refresh/only-export-components
const CrudLoader = ({ name }: { name: string }) => {
    return (
        <div className="position-absolute top-50 start-50 translate-middle">
            <div>
                <Loader visible={true} />
            </div>
            <div>Crud '{name}' is loading...</div>
        </div>
    );
}

const crudsCompleted: { [key: string]: () => JSX.Element } = cruds.reduce((acc, crud) => {
    acc[crud.name] = () => (
        <Suspense fallback={<CrudLoader name={crud.name} />}>
            <crud.component />
        </Suspense>
    );
    return acc;
}, {} as { [key: string]: () => JSX.Element });

export default crudsCompleted;
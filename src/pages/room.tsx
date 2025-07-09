import { Navigate, useParams } from 'react-router-dom';

type RoomParams = {
    room: string;
};

export function Room() {
    const param = useParams<RoomParams>();

    if (!param.room) {
        return <Navigate replace to="/" />;
    }

    return <div>room details</div>;
}

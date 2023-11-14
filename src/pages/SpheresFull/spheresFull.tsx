import { 
    useContext,
    useEffect
} from "react";
import { SpheresFull } from "./spherasFull/spherasFull";
import { ContextApi } from "../../contexts";
import { useExtractChildren } from "../../hooks/useExtractChildren";

export function SpheresFullWideth(): JSX.Element {
    const {
        getSpheresByUser,
        spheresResp,
        user
    } = useContext(ContextApi);

    useEffect(() => {
        const userId: string | any = user?._id;
        getSpheresByUser(userId);
    }, []);
    
    const children = useExtractChildren(spheresResp);

    return (
        <div>
            <SpheresFull 
                children={children ?? []}
            />
        </div>
    );
}
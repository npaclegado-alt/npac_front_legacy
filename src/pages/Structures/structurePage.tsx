import { 
    useState,
    useEffect,
    useContext
} from "react";

import { HeaderReports } from "../../components/structure/headerReports/headerReports";
import { ModalReports } from "../../components/structure/modalListReports/modalReports";
import { GridButtom } from "../../components/structure/gridBottom/gridBottom";
import { ContextApi } from "../../contexts";
import { useExtractChildren } from "../../hooks/useExtractChildren";

export function StructurePage(): JSX.Element {
    const {
        getSpheresByUser,
        spheresResp,
        user
    } = useContext(ContextApi);
    const [showModal, setShowModal] = useState(false);
    const [depth, setDepth] = useState(0);

    const onChangeModal = (depth?: number) => {
        setDepth(depth || 0);
        setShowModal(!showModal);
    }

    const reportsMock = [
        {
            id: '#102030AZ',
            name: 'João',
            email: 'joao@email.com',
            phone: 11999999999
        },
        {
            id: '#102030AZ',
            name: 'Maria',
            email: 'maria@email.com',
            phone: 11999999999
        },
        {
            id: '#102030AZ',
            name: 'José',
            email: 'jose@email.com',
            phone: 11999999999
        },
        {
            id: '#102030AZ',
            name: 'João da Silva',
            email: 'joaosilva@email.com',
            phone: 11999999999
        },
        {
            id: '#102030AZ',
            name: 'Maria da Silva',
            email: 'mariasilva@email.com',
            phone: 11999999999
        },
    ]

    useEffect(() => {
        const userId: string | any = user?._id;
        getSpheresByUser(userId);
    }, []);

    const spheres = useExtractChildren(spheresResp?.rootNode);

    return (
        <div style={{
            width: '100%',
            height: '100%',
        }}>
            <HeaderReports 
                onChangeModal={onChangeModal}
                reports={spheres}
            />
            <ModalReports 
                changeModal={onChangeModal}
                showModal={showModal}
                reports={spheres}
                depth={depth}
            />
            <GridButtom 
                othersReports={spheresResp?.totalSellsByProduct}
            />
        </div>
    )
}
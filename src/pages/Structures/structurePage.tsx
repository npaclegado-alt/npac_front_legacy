import { HeaderReports } from "../../components/structure/headerReports/headerReports";
import { ModalReports } from "../../components/structure/modalListReports/modalReports";

export function StructurePage(): JSX.Element {
    return (
        <div style={{
            width: '100%',
        }}>
            <HeaderReports />
            <ModalReports />
        </div>
    )
}
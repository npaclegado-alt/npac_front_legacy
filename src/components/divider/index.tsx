import styles from './stylesDivider.module.scss';

interface DividerProps {
    horizontal?: boolean;
}

export function Divider({
    horizontal = true,
}: DividerProps): JSX.Element {
    return (
        <div className={horizontal ? styles.dividerHorizontal : styles.dividerVertical}>
        </div>
    );
}
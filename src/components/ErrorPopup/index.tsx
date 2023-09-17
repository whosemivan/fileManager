import styles from './styles.module.scss';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useEffect } from 'react';

type ErrorPopupType = {
    errorTitle: string;
    setPopupOpen: (arg: boolean) => void;
};

const ErrorPopup = ({ errorTitle, setPopupOpen }: ErrorPopupType) => {
    const handleEscapeKey = (evt: any) => {
        if (evt.keyCode === 27) {
            setPopupOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleEscapeKey);

        return () => {
            window.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    return (
        <div className={styles.popup}>
            <button onClick={() => {
                setPopupOpen(false);
            }} className={styles.closeBtn}>
                <span className='visually-hidden'></span>
                <CloseRoundedIcon className={styles.icon} />
            </button>

            <h4 className={styles.errorTitle}>{errorTitle}</h4>
        </div>
    );
};

export default ErrorPopup;
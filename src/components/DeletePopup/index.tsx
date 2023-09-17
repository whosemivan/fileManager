import styles from './styles.module.scss';
import { useEffect } from 'react';

type DeletePopupType = {
    deleteFilePath: string;
    isFolder: boolean;
    setPopupOpen: (arg: boolean) => void;
    handleDelete: (arg: string) => void;
    id: string
};

const DeletePopup = ({ deleteFilePath, isFolder, setPopupOpen, handleDelete, id }: DeletePopupType) => {
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
            <div className={styles.info}>
                <h4 className={styles.path}>{deleteFilePath}</h4>
                <p className={styles.text}>Are you sure you want to delete this {isFolder ? 'Folder' : 'Sequence'}?</p>
            </div>

            <div className={styles.btnWrapper}>
                <button onClick={() => {
                    setPopupOpen(false);
                }} className={styles.btn} type='button'>No, cancel</button>
                <button onClick={() => {
                    handleDelete(id);
                    setPopupOpen(false);
                }} className={styles.btn} type='button'>Yes, delete</button>
            </div>
        </div>
    );
};

export default DeletePopup;
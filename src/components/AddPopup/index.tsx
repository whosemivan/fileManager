import styles from './styles.module.scss';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FolderIcon from '@mui/icons-material/Folder';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { useEffect } from 'react';

type AddPopupType = {
    parentFolder: string;
    isFolder: boolean;
    setName: (arg: string) => void;
    addFile: () => void;
    addFolder: () => void;
    elementName: string;
    setPopupOpen: (arg: boolean) => void;
};

const AddPopup = ({ parentFolder, isFolder, setName, addFile, addFolder, elementName, setPopupOpen }: AddPopupType) => {


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

    const handleEnterKey = (evt: any) => {
        if (evt.key === 'Enter') {
            evt.preventDefault();
            elementName !== '' && isFolder ? addFolder() : addFile();
        }
    };

    return (
        <>
            <div className={styles.popup}>
                <div className={styles.wrapper}>

                    <button onClick={() => {
                        setPopupOpen(false);
                    }} className={styles.closeBtn}>
                        <span className='visually-hidden'></span>
                        <CloseRoundedIcon className={styles.icon} />
                    </button>
                    <div className={styles.panel}>
                        <div className={styles.parentFolder}>
                            <FolderIcon className={styles.icon} />
                            <span>{parentFolder}</span>
                        </div>
                        <span className={styles.newElement}>
                            {
                                isFolder ? 'New Folder' : 'New Sequence'
                            }
                        </span>
                    </div>

                    <div className={styles.inputBlock}>
                        {
                            isFolder ? <FolderIcon className={styles.icon} /> : <MovieOutlinedIcon className={styles.icon} />
                        }
                        <input className={styles.input} onChange={(evt) => setName(evt.target.value)} type="text" placeholder={`Enter ${isFolder ? 'folder' : 'sequence'} name`} onKeyDown={handleEnterKey} />
                    </div>

                    <button onClick={() => {
                        if (elementName !== '') {
                            isFolder ? addFolder() : addFile();
                        }
                    }} type='button' className={styles.btn}>
                        <AddBoxRoundedIcon className={styles.icon} />
                        <span>{isFolder ? 'Add folder' : 'Add Sequence'}</span>
                    </button>
                </div>
            </div>
            <div onClick={() => setPopupOpen(false)} className={styles.overflow}></div>
        </>
    );
};

export default AddPopup;
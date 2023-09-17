import { useState, useEffect, useContext } from 'react';
import { File, ContextFileProp } from '../../types/types';
import styles from './styles.module.scss';
import { v4 as uuidv4 } from 'uuid';
import FolderIcon from '@mui/icons-material/Folder';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddPopup from '../AddPopup';
import DeletePopup from '../DeletePopup';
import ErrorPopup from '../ErrorPopup';
import { Ctx } from "../../App";

type FileComponentProps = {
    name: string;
    children?: File[];
    isFolder: boolean;
    id: string;
};

const FileComponent = ({ name, children, isFolder, id }: FileComponentProps) => {
    // открыта папка или нет
    const [isOpen, setIsOpen] = useState(false);
    // открыт ли попап для выбора что добавить: папку или файл
    const [isBtnAddingPopupOpen, setBtnAddingPopupOpen] = useState(false);
    // открыт ли попап для указания имени
    const [isAddNamePopupOpen, setAddNamePopupOpen] = useState(false);
    // Имя новой папки/файла
    const [elementName, setElementName] = useState('');
    // Добавляем/удаляем папку или файл
    const [isAddFolder, setAddFolder] = useState(false);
    const [isDeleteFolder, setDeleteFolder] = useState(false);
    // открыт ли попап для удаления
    const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
    // путь к файлу, что передается в попап для удаления элементы
    const [pathToFile, setPathToFile] = useState('');
    // открыт ли попап, предупреждающий об ошибке
    const [isErrorPopupOpen, setErrorPopupOpen] = useState(false);

    const { files, setFiles, actualPath, setActualPath } = useContext(Ctx) as ContextFileProp;

    const toggleFolder = () => {
        if (isFolder) {
            setIsOpen(!isOpen);
        }
    };

    useEffect(() => {
        actualPath === name && setIsOpen(true)
    }, [])

    const addFile = () => {
        const newFile = {
            id: uuidv4(),
            name: elementName,
            isFolder: false,
        };

        console.log(children);
        if (children?.some(obj => obj.name === newFile.name)) {
            setErrorPopupOpen(true);
            setAddNamePopupOpen(false);
        } else {
            children && children.push(newFile);
            setFiles([...files]);

            setBtnAddingPopupOpen(false);
            setAddNamePopupOpen(false);
        }
    };

    const addFolder = () => {
        const newFolder = {
            id: uuidv4(),
            name: elementName,
            isFolder: true,
            children: [],
        };

        if (children?.some(obj => obj.name === newFolder.name)) {
            setErrorPopupOpen(true);
            setAddNamePopupOpen(false);
        } else {
            children && children.push(newFolder);
            setFiles([...files]);

            setBtnAddingPopupOpen(false);
            setAddNamePopupOpen(false);
        }
    };

    const deleteElementById = (
        idToDelete: string,
        array: File[]
    ): File[] => {
        let updatedData: File[] = [];

        for (const item of array) {
            if (item.id === idToDelete) {
                continue;
            }

            const updatedChildren =
                item.children && deleteElementById(idToDelete, item.children);

            if (updatedChildren) {
                item.children = updatedChildren;
            }

            updatedData.push(item);
        }

        return updatedData;
    };

    const handleDelete = (idToDelete: string) => {
        const updatedData = deleteElementById(idToDelete, files);
        setFiles(updatedData);
    };

    const findPathById = (data: File[], idToFind: string, currentPath: string = ''): string | null => {
        for (const item of data) {
            const newPath = currentPath === '' ? item.name : `${currentPath}/${item.name}`;

            if (item.id === idToFind) {
                return newPath;
            }

            if (item.children) {
                const result = findPathById(item.children, idToFind, newPath);
                if (result) {
                    return result;
                }
            }
        }

        return null;
    }

    const setFileClassName = (isFolder: boolean) => {
        if (isFolder) {
            if (actualPath === name) {
                return [styles.fileContent, styles.folder, styles.fileActive].join(' ');
            } else {
                return [styles.fileContent, styles.folder].join(' ');

            }
        } else {
            if (actualPath === name) {
                return [styles.fileContent, styles.fileActive].join(' ');
            } else {
                return styles.fileContent;
            }
        }
    };

    return (
        <div className={styles.file}>
            <div onClick={() => {
                isFolder && toggleFolder();
                setActualPath(name);
            }} className={setFileClassName(isFolder)}>
                {isFolder ? <FolderIcon className={styles.icon} /> : <MovieOutlinedIcon className={styles.icon} />} {name}
                {isFolder && actualPath === name && (
                    <div className={styles.btnWrapper}>
                        <button onClick={(evt) => {
                            evt.stopPropagation();
                            setBtnAddingPopupOpen(!isBtnAddingPopupOpen);
                        }} className={styles.btn}>
                            <span className='visually-hidden'>Add</span>
                            <AddBoxRoundedIcon className={styles.icon} />
                        </button>
                        <button className={styles.btn} onClick={(evt) => {
                            evt.stopPropagation();
                            setDeletePopupOpen(true);
                            const pathToFile1 = findPathById(files, id, '')!;
                            setPathToFile(pathToFile1);
                            setDeleteFolder(true);
                        }}>
                            <span className='visually-hidden'>Delete folder</span>
                            <DeleteRoundedIcon className={styles.icon} />
                        </button>

                        {
                            isBtnAddingPopupOpen && (
                                <div className={styles.addBtnWrapper}>
                                    <button className={styles.btn} onClick={(evt) => {
                                        evt.stopPropagation();
                                        setAddFolder(true);
                                        setAddNamePopupOpen(true);
                                        setBtnAddingPopupOpen(false);
                                    }}>
                                        <FolderIcon className={styles.icon} /> <span>Add folder</span>
                                    </button>
                                    <button className={styles.btn} onClick={(evt) => {
                                        evt.stopPropagation();
                                        setAddFolder(false);
                                        setAddNamePopupOpen(true);
                                        setBtnAddingPopupOpen(false);
                                    }}>
                                        <MovieOutlinedIcon className={styles.icon} /> <span>Add Sequence</span>
                                    </button>
                                </div>
                            )
                        }
                    </div>
                )}

                {
                    !isFolder && actualPath === name && (
                        <div className={styles.btnWrapper}>
                            <button className={styles.btn} onClick={() => {
                                setDeletePopupOpen(true);
                                const pathToFile1 = findPathById(files, id, '')!;
                                setPathToFile(pathToFile1);
                                setDeleteFolder(false);
                            }}>
                                <span className='visually-hidden'>Delete folder</span>
                                <DeleteRoundedIcon className={styles.icon} />
                            </button>
                        </div>
                    )
                }
            </div>
            {children && isOpen && (
                <div className={styles.subFolder}>
                    {children.map((item) => (
                        <div key={item.name}>
                            {item.isFolder && item.children ? (
                                // folder
                                <FileComponent name={item.name} children={item.children} isFolder={item.isFolder} id={item.id} />
                            ) : (
                                // file
                                <FileComponent name={item.name} isFolder={item.isFolder} id={item.id} />
                            )}
                        </div>
                    ))}
                </div>
            )}

            {
                isAddNamePopupOpen && <AddPopup parentFolder={name} isFolder={isAddFolder} setName={setElementName} addFile={addFile} addFolder={addFolder} elementName={elementName} setPopupOpen={setAddNamePopupOpen} />
            }
            {
                isDeletePopupOpen && <DeletePopup deleteFilePath={pathToFile} isFolder={isDeleteFolder} setPopupOpen={setDeletePopupOpen} handleDelete={handleDelete} id={id} />
            }
            {
                isErrorPopupOpen && <ErrorPopup errorTitle='Такое название уже существует!' setPopupOpen={setErrorPopupOpen} />
            }
        </div>
    );
};

export default FileComponent;
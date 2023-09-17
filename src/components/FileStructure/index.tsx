import FileComponent from '../FileComponent/index';
import { ContextFileProp } from '../../types/types';
import styles from './styles.module.scss';
import { useContext, useState } from 'react';
import { Ctx } from "../../App";
import AddPopup from '../AddPopup';
import { v4 as uuidv4 } from 'uuid';

const FileStructure = () => {
  const { files, setFiles, setActualPath } = useContext(Ctx) as ContextFileProp;
  const [isAddNamePopupOpen, setAddNamePopupOpen] = useState(false);
  const [elementName, setElementName] = useState('');

  const addFolder = () => {
    const newFolder = {
      id: uuidv4(),
      name: elementName,
      isFolder: true,
      children: [],
    };

    setFiles([newFolder]);
    setAddNamePopupOpen(false);
    setActualPath(newFolder.name);

  };

  return (
    <div className={styles.files}>
      {
        files.length === 0 && (
          <>
            <button className={styles.btn} onClick={() => {
              setAddNamePopupOpen(true);
            }} type='button'>Add folder</button>
          </>
        )
      }
      {files.map((item) => (
        <FileComponent key={item.name} name={item.name} children={item.children} isFolder={item.isFolder} id={item.id} />
      ))}
      {
        isAddNamePopupOpen && <AddPopup parentFolder={'/'} setName={setElementName} isFolder={true} addFolder={addFolder} elementName={elementName} setPopupOpen={setAddNamePopupOpen} />
      }
    </div>
  );
};

export default FileStructure;
import FileComponent from '../FileComponent/index';
import { ContextFileProp } from '../../types/types';
import styles from './styles.module.scss';
import { useContext } from 'react';
import { Ctx } from "../../App";

const FileStructure = () => {
  const { files } = useContext(Ctx) as ContextFileProp;

  return (
    <div className={styles.files}>
      {files.map((item) => (
        <FileComponent key={item.name} name={item.name} children={item.children} isFolder={item.isFolder} id={item.id} />
      ))}
    </div>
  );
};

export default FileStructure;
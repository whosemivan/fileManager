import { useState, useEffect, createContext } from 'react'
import FileStructure from './components/FileStructure'
import Screen from './components/Screen'
import styles from './styles.module.scss';
import { File, ContextFileProp } from './types/types';
import { v4 as uuidv4 } from 'uuid';

export const Ctx = createContext<ContextFileProp | null>(null);

function App() {
  const [files, setFiles] = useState<File[]>(() => {
    const savedFiles = localStorage.getItem('files');
    return savedFiles ? JSON.parse(savedFiles) : [
      {
        id: uuidv4(),
        name: 'Folder 1',
        isFolder: true,
        children: [
          {
            id: uuidv4(),
            name: 'Folder 2',
            isFolder: true,
            children: [{
              id: uuidv4(),
              name: 'File 1',
              isFolder: false
            },
            {
              id: uuidv4(),
              name: 'File 2',
              isFolder: false
            }]
          }
        ]
      },
      {
        id: uuidv4(),
        name: 'File 3',
        isFolder: false
      },
      {
        id: uuidv4(),
        name: 'Folder 3',
        isFolder: true,
        children: [
          {
            id: uuidv4(),
            name: 'Folder 4',
            isFolder: true,
            children: [{
              id: uuidv4(),
              name: 'File 4',
              isFolder: false
            },
            {
              id: uuidv4(),
              name: 'File 5',
              isFolder: false
            }]
          }
        ]
      },
    ];
  });
  const [actualPath, setActualPath] = useState('Folder 1');


  useEffect(() => {
    localStorage.setItem('files', JSON.stringify(files));
  }, [files])

  return (
    <Ctx.Provider value={{ files, setFiles, actualPath, setActualPath }}>
      <div className={styles.main}>
        <FileStructure />
        <Screen />
      </div>
    </Ctx.Provider>
  )
}

export default App

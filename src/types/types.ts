export interface File {
    id: string;
    name: string;
    isFolder: boolean;
    children?: File[];
}

export interface ContextFileProp {
    files: File[];
    setFiles: (arg: File[]) => void;
    actualPath: string;
    setActualPath: (arg: string) => void;
};
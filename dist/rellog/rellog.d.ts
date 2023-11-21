export declare class RelLog {
    ConsoleMode: boolean;
    FileMode: boolean;
    FilePath: string;
    constructor(ConsoleMode?: boolean, FileMode?: boolean, FilePath?: string);
    CreateLogProfile(): void;
    LOG(type?: string, title?: string, context?: string, consoleMode?: boolean, fileMode?: boolean, filePath?: string): void;
    private WriteFile;
    private AppendFile;
    private ReadFile;
}

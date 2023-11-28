
const fs = require('fs');

const date = new Date()

export const LOG_COLORS = {
    reset: '\x1b[0m',

    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[93m',
    blue: '\x1b[34m',
    purple: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',

    bold_black: '\u001b[1;30m',
    bold_red: '\u001b[1;31m',
    bold_green: '\u001b[1;32m',
    bold_yellow: '\u001b[1;93m',
    bold_blue: '\u001b[1;34m',
    bold_purple: '\u001b[1;35m',
    bold_cyan: '\u001b[1;36m',
    bold_white: '\u001b[1;37m',

    bg_bold_black: '\u001b[1;40m',
    bg_bold_red: '\u001b[1;41m',
    bg_bold_green: '\u001b[1;42m',
    bg_bold_yellow: '\u001b[1;43m',
    bg_bold_blue: '\u001b[1;44m',
    bg_bold_purple: '\u001b[1;45m',
    bg_bold_cyan: '\u001b[1;46m',
    bg_bold_white: '\u001b[1;47m',

};


type T_Colors = {
    titleColor?: string,
    dateColor?: string,
    contextColor?: string
}

type T_Options = {
    ConsoleMode?: boolean
    FileMode?: boolean
    HighLigthMode?: boolean
    Colors?: T_Colors
}


export class RelLog {
    Options: T_Options
    FilePath: string
    FileName: string
    constructor(FilePath: string = "./logs", FileName: string = "relnode.log", Options: T_Options = {
        FileMode: true,
        ConsoleMode: true,
        HighLigthMode: false,
        Colors: {
            titleColor: LOG_COLORS.bg_bold_yellow,
            dateColor: LOG_COLORS.green,
            contextColor: LOG_COLORS.white
        }
    }) {
        this.Options = Options
        this.FilePath = FilePath
        this.FileName = FileName


    }

    CreateLogProfile() { }

    LOG(
        context: string = "",
        type: string = "w",
        title: string = "[RelLog]",
        options?: T_Options,
        FileName?: string ,
        filePath?: string 
    ) {

        const defaultOptions: T_Options = {
            FileMode: this.Options.FileMode,
            ConsoleMode: this.Options.ConsoleMode,
            HighLigthMode: this.Options.HighLigthMode,
            Colors: {
                titleColor: this.Options.Colors?.titleColor,
                dateColor: this.Options.Colors?.dateColor,
                contextColor: this.Options.Colors?.contextColor
            }
        }
        options = { ...defaultOptions, ...options }
        options.Colors = { ...defaultOptions.Colors, ...options.Colors }


        let datenow = date.toLocaleString().replace(",", " :")

        let c_title = `${options.Colors?.titleColor}${title}${LOG_COLORS.reset}`,
            c_date = `${options.Colors?.dateColor}${datenow}${LOG_COLORS.reset}`,
            c_type = this.ReturnType(type, true),
            c_context = `${options.Colors?.contextColor}${context}${LOG_COLORS.reset}`;


        let _title = options.HighLigthMode ? c_title : title
        let _date = options.HighLigthMode ? c_date : datenow
        let _type = options.HighLigthMode ? c_type : this.ReturnType(type)
        let _context = options.HighLigthMode ? c_context : context



        let data: string = `${_title} [ ${_date} ]\n${_type} : ${_context}\n`
        let console_data: string = `${c_title} [ ${c_date} ]\n${c_type} : ${c_context}\n`


        
        let _filepath:string = `${filePath!==undefined?filePath:''}/${FileName!==undefined ?FileName:''}`// custom file
        let _Dfilepath:string= `${this.FilePath}/${this.FileName}`  // compulsory file
       
     
        if (this.CreateFolder(`${filePath!==undefined?filePath:this.FilePath}`)) { /// file existence check
            options.ConsoleMode && console.log(console_data)
            options.FileMode && this.AppendFile(data, _Dfilepath)
            options.FileMode && _filepath!=='/' && this.AppendFile(data, _filepath)

        } else {
            options.ConsoleMode && console.log(console_data)
            options.FileMode && this.AppendFile(data, _Dfilepath)
            options.FileMode && _filepath!=='/' && this.AppendFile(data, _filepath)

        }


    }

    private ReturnType(type: string, HighLigth: boolean = false) {
        switch (type) {
            case "w":
            case "W":
                return HighLigth ? `${LOG_COLORS.yellow}WARNING${LOG_COLORS.reset}` : "WARNING"
            case "E":
            case "e":
                return HighLigth ? `${LOG_COLORS.red}ERROR${LOG_COLORS.reset}` : "ERROR"
            case "I":
            case "i":
                return HighLigth ? `${LOG_COLORS.cyan}INFO${LOG_COLORS.reset}` : "INFO"
            case "D":
            case "d":
                return HighLigth ? `${LOG_COLORS.blue}DEBUG${LOG_COLORS.reset}` : "DEBUG"

            default:
                break;
        }
    }
    private WriteFile(data: string, filename: string = this.FilePath) {
        fs.writeFileSync(filename, data, "utf8");
    }

    private AppendFile(data: string, filename: string, newline: boolean = true) {
        fs.appendFileSync(filename, newline ? data + "\n" : data, "utf8");
        return true

    }

    private ReadFile(filename: string = this.FilePath) {
        fs.readFileSync(filename, "utf8");
    }

    private CreateFolder(folderPath: string = this.FilePath) {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath)
            return true
        } else {
            return false
        }

    }




}





const RL = new RelLog()
// RL.LOG("bu bir info", "i")
RL.LOG("bu bir hata", "E", "BERK")
// RL.LOG("bu bir relnode warning", "w", "[BERK]", { FileMode: false})
// RL.LOG("bu bir relnode warning", "w", "[BERK]", { FileMode: false, Colors: { titleColor: LOG_COLORS.bg_bold_green } })
// RL.LOG("bu bir relnode warning", "d", "[BERK]", { ConsoleMode: true, HighLigthMode: true, Colors: { titleColor: LOG_COLORS.bg_bold_green, dateColor: LOG_COLORS.blue } })

// RL.LOG("bu bir custom filename", "w", "[BERK]", {},"custom.log")
// RL.LOG("bu bir relnode warning", "w", "[BERK]", {},"custom.log",RL.FilePath)
// RL.LOG("bu bir relnode warning", "w", "[BERK]", {},"custom.log","./logs")

RL.LOG("bu bir hata şşşşşş ğğğğ", "E", "BERK")












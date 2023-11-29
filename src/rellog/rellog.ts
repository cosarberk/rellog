
const fs = require('fs');
var Table = require('cli-table3');
const date = new Date()


const tableChars = {
    'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
    , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
    , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
    , 'right': '║', 'right-mid': '╢', 'middle': '│'
}
    ;
//#region /// LOG_COLORS \\\
/**
* ## LOG_COLORS
*
* Ansi color codes.
* 
*/
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
//#endregion

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

//#region /// RELLOG CLASS \\\
/**
* ## RelLog
*
* Advanced Synchronous File and Console Logging System for Relteco-Relnode.
* 
* You can capture log records to the main file and simultaneously to a custom file, 
* and optionally print log outputs to the console as per your preference.
*
* It also supports on-the-fly custom logging without the need for any main configuration when needed.
*
* ---
* 
* ### Options
* 
* | OPTION              | TYPE                               | DEFAULT          | DESCRIPTION
* | :-                  | :-                                 | :-               | :-
* | **FileName**        | string                             | `relnode.log`    | Main log file name
* | **FilePath**        | string                             | `./logs`         | Main log file path
* | **Options**         | object{T_Options}                  | `DefaultOptions` | Main log options
* 
* ---
* ### Examples:
*
* ```ts
* const {RelLog,LOG_COLORS} = require("rellog")
* 
* const RL = new RelLog()
* const RL = new RelLog("./logs")
* const RL = new RelLog("./logs","custom.log")
* const RL = new RelLog("./logs","custom.log",{ConsoleMode:false,Colors:{titleColor:LOG_COLORS.bg_bold_green}})
*
*
* ```
*
*  OR
*
* ```ts
*
* import {RelLog,LOG_COLORS} = from "rellog"
* 
* const RL = new RelLog()
* const RL = new RelLog("./logs")
* const RL = new RelLog("./logs","custom.log")
* const RL = new RelLog("./logs","custom.log",{ConsoleMode:false,Colors:{titleColor:LOG_COLORS.bg_bold_green}})
*
* ```
* ---
* 
*/
export class RelLog {
    /**
    * ### Options
    * 
    * Main log options
    * 
    * ---
    * 
    * ### T_Options Type Options
    * 
    * * | OPTION           | TYPE                | DEFAULT         | DESCRIPTION
    * | :-                 | :-                  | :-              | :-
    * | **ConsoleMode**    | boolean             | `true`          | Whether the main log should be displayed on the console or not
    * | **FileMode**       | boolean             | `true`          | Whether the main log should be written to the main file or not
    * | **HighLigthMode**  | boolean             | `false`         | Whether color codes should be included when writing the main log to the file
    * | **Colors**         | object{T_Colors}    | `DefaultColors` | Color values for the main log
    * 
    * #### NOTE: When HighLightMode is true, the color of the logged messages is included in the log file. This may reduce readability for normal readers, but it ensures that the log output is well-organized and colorful when retrieved with console commands like 'cat'.
    *
    *
    * - #### Type: `object{T_Options}`
    * - #### Default: `DefaultOptions`
    * 
    * \
    * \
    * \
    * ### T_Colors Type Options
    * 
    * It retrieves the colors from the LOG_COLORS object.
    * 
    * ---
    * 
    * | OPTION          | TYPE    | DEFAULT                         | DESCRIPTION
    * | :-                | :-      | :-                            | :-
    * | **titleColor**    | string  | `LOG_COLORS.bg_bold_yellow`   | Title color of main log
    * | **dateColor**     | string  | `LOG_COLORS.green`            | Date color of main log
    * | **contextColor**  | string  | `LOG_COLORS.white`            | Context color of main log
    * 
    * 
    */
    Options: T_Options
    /**
     * ### FilePath
     * 
     * Main log file path
     * 
     * ---
     * 
     * - #### Type: `string`
     * - #### Default: `./logs`
     */
    FilePath: string
    /**
    * ### FileName
    * 
    * Main log file name
    * 
    * ---
    * 
    * - #### Type: `string`
    * - #### Default: `relnode.log`
    */
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

    //#region /// LOG \\\
    /**  
     * ### LOG()
     * 
     * It performs logging to the desired or main file while simultaneously printing log output to the console if requested.
     * 
     * ### Options
     * 
     * | OPTION              | TYPE                               | DEFAULT          | DESCRIPTION
     * | :-                  | :-                                 | :-               | :-
     * | **context**         | string                             | `""`             |  Log context
     * | **type**            | string                             | `w`              |  Log type (w/W-e/E-i/I-d/D)
     * | **title**           | string                             | `[RelLog]`       |  Log title
     * | **Options**         | object{T_Options}                  | `DefaultOptions` |  Log options
     * | **FileName**        | string                             | `relnode.log`    |  Log file name
     * | **FilePath**        | string                             | `./logs`         |  Log file path
     * 
     * ---
     */
    LOG(
        /**
         * ### context
         * 
         * Log context
         * 
         * #### Type:string
         * #### default `""`
         */
        context: string = "",
        /**
        * ### type
        * 
        * Log type
        * 
        * The value names can be in either uppercase or lowercase.
        * 
        * ### type: string
        * ### default `w`
        * 
        * | OPTION       | TYPE     | DEFAULT   | DESCRIPTION
        * | :-           | :-       | :-        | :-
        * | **w \| W**   | string   | `w`       |  WARNING
        * | **e \| E**   | string   | `e`       |  ERROR
        * | **i \| I**   | string   | `i`       |  INFO
        * | **d \| D**   | string   | `d`       |  DEBUG
        * 
        * 
        */
        type: string = "w",
        /**
         * ### title
         * 
         * Log title
         * 
         * #### Type:string
         * #### default `[RelLog]`
         */
        title: string = "[RelLog]",
        /**
         * ### Options
         * 
         * Main log options
         * 
         * ---
         * 
         * ### T_Options Type Options
         * 
         * * | OPTION           | TYPE                | DEFAULT         | DESCRIPTION
         * | :-                 | :-                  | :-              | :-
         * | **ConsoleMode**    | boolean             | `true`          | Whether the main log should be displayed on the console or not
         * | **FileMode**       | boolean             | `true`          | Whether the main log should be written to the main file or not
         * | **HighLigthMode**  | boolean             | `false`         | Whether color codes should be included when writing the main log to the file
         * | **Colors**         | object{T_Colors}    | `DefaultColors` | Color values for the main log
         * 
         * #### NOTE: When HighLightMode is true, the color of the logged messages is included in the log file. This may reduce readability for normal readers, but it ensures that the log output is well-organized and colorful when retrieved with console commands like 'cat'.
         *
         *
         * #### Type: `object{T_Options}`
         * #### Default: `DefaultOptions`
         * 
         * \
         * \
         * \
         * ### T_Colors Type Options
         * 
         * It retrieves the colors from the LOG_COLORS object.
         * 
         * ---
         * 
         * | OPTION          | TYPE    | DEFAULT                         | DESCRIPTION
         * | :-                | :-      | :-                            | :-
         * | **titleColor**    | string  | `LOG_COLORS.bg_bold_yellow`   | Title color of main log
         * | **dateColor**     | string  | `LOG_COLORS.green`            | Date color of main log
         * | **contextColor**  | string  | `LOG_COLORS.white`            | Context color of main log
         * 
         * 
         */
        options?: T_Options,
        /**
         * ### FileName
         * 
         * Log file name
         * 
         * #### Type:string
         * #### default `relnode.log`
         */
        FileName?: string,
        /**
        * ### filePath
        * 
        * Log file path
        * 
        * #### Type:string
        * #### default `./logs`
        */
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



        let _filepath: string = `${filePath !== undefined ? filePath : ''}/${FileName !== undefined ? FileName : ''}`// custom file
        let _Dfilepath: string = `${this.FilePath}/${this.FileName}`  // compulsory file


        if (this.CreateFolder(`${filePath !== undefined ? filePath : this.FilePath}`)) { /// file existence check
            options.ConsoleMode && console.log(console_data)
            options.FileMode && this.AppendFile(data, _Dfilepath)
            options.FileMode && _filepath !== '/' && this.AppendFile(data, _filepath)

        } else {
            options.ConsoleMode && console.log(console_data)
            options.FileMode && this.AppendFile(data, _Dfilepath)
            options.FileMode && _filepath !== '/' && this.AppendFile(data, _filepath)

        }


    }
    //#endregion

    //#region /// LOGTABLE \\\

    LOGTABLE(
        data: any[],
        head?: string[]
    ) {

        if (head) {
            var table = new Table({
                head: head,
                chars: tableChars
            });
            for (let t = 0; t < data.length; t++) {
                table.push(data[t]);
            }
            // console.log(table.toString());
            this.LOG("\n" + table.toString(), "i")

        } else {
            var table = new Table({ chars: tableChars });

            for (let t = 0; t < data.length; t++) {
                table.push(data[t]);
            }

            // console.log(table.toString());
            this.LOG("\n" + table.toString(), "i")
        }

    }

    //#endregion

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

//#endregion



const RL = new RelLog()


// RL.LOG("bu bir info", "i")
// RL.LOG("bu bir hata", "E", "BERK")


// RL.LOG("bu bir relnode warning", "w", "[BERK]", { FileMode: false})
// RL.LOG("bu bir relnode warning", "w", "[BERK]", { FileMode: false, Colors: { titleColor: LOG_COLORS.bg_bold_green } })
// RL.LOG("bu bir relnode warning", "d", "[BERK]", { ConsoleMode: true, HighLigthMode: true, Colors: { titleColor: LOG_COLORS.bg_bold_green, dateColor: LOG_COLORS.blue } })

// RL.LOG("bu bir custom filename", "w", "[BERK]", {},"custom.log")
// RL.LOG("bu bir relnode warning", "w", "[BERK]", {},"custom.log",RL.FilePath)
// RL.LOG("bu bir relnode warning", "w", "[BERK]", {},"custom.log","./logs")

// RL.LOG("bu bir hata şşşşşş ğğğğ", "E", "BERK") 

// RL.LOG(`denem 
// ewf efwweewfewfwefewfew 
// few 
// wefwfwefewfewe`, "E", "BERK") // pre mode `` 

const headers = ['TH 1 label', 'TH 2 label']
const headerdata = [
    [LOG_COLORS.blue + 'First value', 'Second value'],
    [LOG_COLORS.blue + 'First value', 'Second value']
]
const normaldata = [
    { 'Some key': 'Some value' },
    { 'Another key': 'Another value' }
]
RL.LOGTABLE(normaldata)
RL.LOGTABLE(headerdata, headers)











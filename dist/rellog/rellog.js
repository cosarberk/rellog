"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelLog = exports.LOG_COLORS = void 0;
var fs = require('fs');
var Table = require('cli-table3');
var date = new Date();
var tableChars = {
    'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗',
    'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝',
    'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼',
    'right': '║', 'right-mid': '╢', 'middle': '│'
};
//#region /// LOG_COLORS \\\
/**
* ## LOG_COLORS
*
* Ansi color codes.
*
*/
exports.LOG_COLORS = {
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
var RelLog = /** @class */ (function () {
    function RelLog(FilePath, FileName, Options) {
        if (FilePath === void 0) { FilePath = "./logs"; }
        if (FileName === void 0) { FileName = "relnode.log"; }
        if (Options === void 0) { Options = {
            FileMode: true,
            ConsoleMode: true,
            HighLigthMode: false,
            Colors: {
                titleColor: exports.LOG_COLORS.bg_bold_yellow,
                dateColor: exports.LOG_COLORS.green,
                contextColor: exports.LOG_COLORS.white
            }
        }; }
        this.Options = Options;
        this.FilePath = FilePath;
        this.FileName = FileName;
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
     *
     * ### Examples:
     *
     * ```ts
     * const {RelLog,LOG_COLORS} = require("rellog")
     *
     * RL.LOG("this is a info log", "i")
     * RL.LOG("this is a error log  with log title [BERK]", "E", "BERK")
     *
     *
     * RL.LOG("Log displayed only in the console.", "w", "[BERK]", { FileMode: false})
     * RL.LOG("warning log displayed only in the console and Colored log with title", "w", "[BERK]", { FileMode: false, Colors: { titleColor: LOG_COLORS.bg_bold_green } })
     * RL.LOG("Active debug log in HighLigthMode.", "d", "[BERK]", { ConsoleMode: true, HighLigthMode: true, Colors: { titleColor: LOG_COLORS.bg_bold_green, dateColor: LOG_COLORS.blue } })
     *
     * RL.LOG("log with custom file name", "w", "[BERK]", {},"custom.log")
     * RL.LOG("log with default file name and file path", "w", "[BERK]", {},"custom.log",RL.FilePath)
     * RL.LOG("log with custom file name and file path", "w", "[BERK]", {},"custom.log","./logs")
     *
     * // Write log data for the `pre mode` within `` symbols
     * RL.LOG(`bla bla
     * bla blablablabla
     * bla
     * blablablabla`, "E", "BERK")
     *
     *
     * ```
     */
    RelLog.prototype.LOG = function (
    /**
     * ### context
     *
     * Log context
     *
     * #### Type:string
     * #### default `""`
     */
    context, 
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
    type, 
    /**
     * ### title
     *
     * Log title
     *
     * #### Type:string
     * #### default `[RelLog]`
     */
    title, 
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
    options, 
    /**
     * ### FileName
     *
     * Log file name
     *
     * #### Type:string
     * #### default `relnode.log`
     */
    FileName, 
    /**
    * ### filePath
    *
    * Log file path
    *
    * #### Type:string
    * #### default `./logs`
    */
    filePath) {
        var _a, _b, _c, _d, _e, _f;
        if (context === void 0) { context = ""; }
        if (type === void 0) { type = "w"; }
        if (title === void 0) { title = "[RelLog]"; }
        var defaultOptions = {
            FileMode: this.Options.FileMode,
            ConsoleMode: this.Options.ConsoleMode,
            HighLigthMode: this.Options.HighLigthMode,
            Colors: {
                titleColor: (_a = this.Options.Colors) === null || _a === void 0 ? void 0 : _a.titleColor,
                dateColor: (_b = this.Options.Colors) === null || _b === void 0 ? void 0 : _b.dateColor,
                contextColor: (_c = this.Options.Colors) === null || _c === void 0 ? void 0 : _c.contextColor
            }
        };
        options = __assign(__assign({}, defaultOptions), options);
        options.Colors = __assign(__assign({}, defaultOptions.Colors), options.Colors);
        var datenow = date.toLocaleString().replace(",", " :");
        var c_title = "".concat((_d = options.Colors) === null || _d === void 0 ? void 0 : _d.titleColor).concat(title).concat(exports.LOG_COLORS.reset), c_date = "".concat((_e = options.Colors) === null || _e === void 0 ? void 0 : _e.dateColor).concat(datenow).concat(exports.LOG_COLORS.reset), c_type = this.ReturnType(type, true), c_context = "".concat((_f = options.Colors) === null || _f === void 0 ? void 0 : _f.contextColor).concat(context).concat(exports.LOG_COLORS.reset);
        var _title = options.HighLigthMode ? c_title : title;
        var _date = options.HighLigthMode ? c_date : datenow;
        var _type = options.HighLigthMode ? c_type : this.ReturnType(type);
        var _context = options.HighLigthMode ? c_context : context;
        var data = "".concat(_title, " [ ").concat(_date, " ]\n").concat(_type, " : ").concat(_context, "\n");
        var console_data = "".concat(c_title, " [ ").concat(c_date, " ]\n").concat(c_type, " : ").concat(c_context, "\n");
        var _filepath = "".concat(filePath !== undefined ? filePath : '', "/").concat(FileName !== undefined ? FileName : ''); // custom file
        var _Dfilepath = "".concat(this.FilePath, "/").concat(this.FileName); // compulsory file
        if (this.CreateFolder("".concat(filePath !== undefined ? filePath : this.FilePath))) { /// file existence check
            options.ConsoleMode && console.log(console_data);
            options.FileMode && this.AppendFile(data, _Dfilepath);
            options.FileMode && _filepath !== '/' && this.AppendFile(data, _filepath);
        }
        else {
            options.ConsoleMode && console.log(console_data);
            options.FileMode && this.AppendFile(data, _Dfilepath);
            options.FileMode && _filepath !== '/' && this.AppendFile(data, _filepath);
        }
    };
    //#endregion
    //#region /// LOGTABLE \\\
    /**
    * ### LOGTABLE()
    *
    * It performs logging to the desired or main file while simultaneously printing log output to the console if requested.
    *
    * ### Options
    *
    * | OPTION              | TYPE                      | DEFAULT          | DESCRIPTION
    * | :-                  | :-                        | :-               | :-
    * | **data**            | array[any]                | `[]`             |  Table contexts
    * | **head**            | array[string]             | `[]`             |  Table headers
    *
    * ---
    *
    * #### NOTE : If the `LOGTABLE` has an empty `head`, it will create a regular table. The `head` argument enables the table to be horizontal, leading to different expectations for the content of the `data` argument
    *
    * ### Examples:
    *
    * ```ts
    * // An example of a regular table with the `head` argument:
    * // Currently, the `normaldata` argument accepts an array of objects
    *
    *  const normaldata = [
    *    { 'Some key': 'Some value' },
    *    { 'Another key': 'Another value' }
    *  ];
    *
    *   RL.LOGTABLE(normaldata)
    *
    * ```
    * ---
    *
    * \
    * \
    * ```ts
    * // An example of a regular table without the `head` argument:
    * // Currently, the `headerdata` argument accepts an array of arrays
    *
    * const headerdata = [
    *   ['First value', 'Second value'],
    *   ['First value', 'Second value']
    * ];
    * // and headers
    * const headers = ['TH 1 label', 'TH 2 label']
    *
    *   RL.LOGTABLE(headerdata, headers)
    *
    * ```
    *
    */
    RelLog.prototype.LOGTABLE = function (data, head) {
        if (head) {
            var table = new Table({
                head: head,
                chars: tableChars
            });
            for (var t = 0; t < data.length; t++) {
                table.push(data[t]);
            }
            // console.log(table.toString());
            this.LOG("\n" + table.toString(), "i");
        }
        else {
            var table = new Table({ chars: tableChars });
            for (var t = 0; t < data.length; t++) {
                table.push(data[t]);
            }
            // console.log(table.toString());
            this.LOG("\n" + table.toString(), "i");
        }
    };
    //#endregion
    RelLog.prototype.ReturnType = function (type, HighLigth) {
        if (HighLigth === void 0) { HighLigth = false; }
        switch (type) {
            case "w":
            case "W":
                return HighLigth ? "".concat(exports.LOG_COLORS.yellow, "WARNING").concat(exports.LOG_COLORS.reset) : "WARNING";
            case "E":
            case "e":
                return HighLigth ? "".concat(exports.LOG_COLORS.red, "ERROR").concat(exports.LOG_COLORS.reset) : "ERROR";
            case "I":
            case "i":
                return HighLigth ? "".concat(exports.LOG_COLORS.cyan, "INFO").concat(exports.LOG_COLORS.reset) : "INFO";
            case "D":
            case "d":
                return HighLigth ? "".concat(exports.LOG_COLORS.blue, "DEBUG").concat(exports.LOG_COLORS.reset) : "DEBUG";
            default:
                break;
        }
    };
    RelLog.prototype.WriteFile = function (data, filename) {
        if (filename === void 0) { filename = this.FilePath; }
        fs.writeFileSync(filename, data, "utf8");
    };
    RelLog.prototype.AppendFile = function (data, filename, newline) {
        if (newline === void 0) { newline = true; }
        fs.appendFileSync(filename, newline ? data + "\n" : data, "utf8");
        return true;
    };
    RelLog.prototype.ReadFile = function (filename) {
        if (filename === void 0) { filename = this.FilePath; }
        fs.readFileSync(filename, "utf8");
    };
    RelLog.prototype.CreateFolder = function (folderPath) {
        if (folderPath === void 0) { folderPath = this.FilePath; }
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
            return true;
        }
        else {
            return false;
        }
    };
    return RelLog;
}());
exports.RelLog = RelLog;
//#endregion
// const RL = new RelLog()
// RL.LOG("this is a info log", "i")
// RL.LOG("this is a error log  with log title [BERK]", "E", "BERK")
// RL.LOG("Log displayed only in the console.", "w", "[BERK]", { FileMode: false})
// RL.LOG("warning log displayed only in the console and Colored log with title", "w", "[BERK]", { FileMode: false, Colors: { titleColor: LOG_COLORS.bg_bold_green } })
// RL.LOG("Active debug log in HighLigthMode.", "d", "[BERK]", { ConsoleMode: true, HighLigthMode: true, Colors: { titleColor: LOG_COLORS.bg_bold_green, dateColor: LOG_COLORS.blue } })
// RL.LOG("log with custom file name", "w", "[BERK]", {},"custom.log")
// RL.LOG("log with default file name and file path", "w", "[BERK]", {},"custom.log",RL.FilePath)
// RL.LOG("log with custom file name and file path", "w", "[BERK]", {},"custom.log","./logs")
// // Write log data for the `pre mode` within `` symbols
// RL.LOG(`bla bla 
// bla blablablabla 
// bla 
// blablablabla`, "E", "BERK")  
// const headers = ['TH 1 label', 'TH 2 label']
// const headerdata = [
//     [LOG_COLORS.blue + 'First value', 'Second value'],
//     [LOG_COLORS.blue + 'First value', 'Second value']
// ]
// const normaldata = [
//     { 'Some key': 'Some value' },
//     { 'Another key': 'Another value' }
// ]
// RL.LOGTABLE(normaldata)
// RL.LOGTABLE(headerdata, headers)

# rellog
Logger system for Relteco-Relnode


```sh
npm i rellog
```


## Quick Start

 ```ts
 const {RelLog,LOG_COLORS} = require("rellog")
 
 const RL = new RelLog()
 RL.LOG("this is a info log", "i")

 ```

  OR

 ```ts

 import {RelLog,LOG_COLORS} = from "rellog"
 
 const RL = new RelLog()
 RL.LOG("this is a info log", "i")
 ```
 ---


## LOG_COLORS

Ansi color codes.

  - reset
  - black
  - red
  - green
  - yellow
  - blue
  - purple
  - cyan
  - white
  - bold_black
  - bold_red
  - bold_green
  - bold_yellow
  - bold_blue
  - bold_purple
  - bold_cyan
  - bold_white
  - bg_bold_black
  - bg_bold_red
  - bg_bold_green
  - bg_bold_yellow
  - bg_bold_blue
  - bg_bold_purple
  - bg_bold_cyan
  - bg_bold_white


 ## RelLog

 Advanced Synchronous File and Console Logging System for Relteco-Relnode.
 
 You can capture log records to the main file and simultaneously to a custom file, 
 and optionally print log outputs to the console as per your preference.

 It also supports on-the-fly custom logging without the need for any main configuration when needed.

 ---
 
 ### Options
 
 | OPTION              | TYPE                               | DEFAULT          | DESCRIPTION
 | :-                  | :-                                 | :-               | :-
 | **FileName**        | string                             | `relnode.log`    | Main log file name
 | **FilePath**        | string                             | `./logs`         | Main log file path
 | **Options**         | object{T_Options}                  | `DefaultOptions` | Main log options
 
 ---
 ### Examples:

 ```ts
 const {RelLog,LOG_COLORS} = require("rellog")
 
 const RL = new RelLog()
 const RL = new RelLog("./logs")
 const RL = new RelLog("./logs","custom.log")
 const RL = new RelLog("./logs","custom.log",{ConsoleMode:false,Colors:{titleColor:LOG_COLORS.bg_bold_green}})


 ```

  OR

 ```ts

 import {RelLog,LOG_COLORS} = from "rellog"
 
 const RL = new RelLog()
 const RL = new RelLog("./logs")
 const RL = new RelLog("./logs","custom.log")
 const RL = new RelLog("./logs","custom.log",{ConsoleMode:false,Colors:{titleColor:LOG_COLORS.bg_bold_green}})

 ```
 ---
 

### Options
 
 Main log options
 
 ---
 
 ### T_Options Type Options
 
 | OPTION           | TYPE                | DEFAULT         | DESCRIPTION
 | :-                 | :-                  | :-              | :-
 | **ConsoleMode**    | boolean             | `true`          | Whether the main log should be displayed on the console or not
 | **FileMode**       | boolean             | `true`          | Whether the main log should be written to the main file or not
 | **HighLigthMode**  | boolean             | `false`         | Whether color codes should be included when writing the main log to the file
 | **Colors**         | object{T_Colors}    | `DefaultColors` | Color values for the main log
 
 #### NOTE: When HighLightMode is true, the color of the logged messages is included in the log file. This may reduce readability for normal readers, but it ensures that the log output is well-organized and colorful when retrieved with console commands like 'cat'.


 - #### Type: `object{T_Options}`
 - #### Default: `DefaultOptions`
 
 \
 \
 \
 ### T_Colors Type Options
 
 It retrieves the colors from the LOG_COLORS object.
 
 ---
 
 | OPTION          | TYPE    | DEFAULT                         | DESCRIPTION
 | :-                | :-      | :-                            | :-
 | **titleColor**    | string  | `LOG_COLORS.bg_bold_yellow`   | Title color of main log
 | **dateColor**     | string  | `LOG_COLORS.green`            | Date color of main log
 | **contextColor**  | string  | `LOG_COLORS.white`            | Context color of main log
 
 
### FilePath

Main log file path

---

- #### Type: `string`
- #### Default: `./logs`


### FileName
 
 Main log file name
 
 ---
 
 - #### Type: `string`
 - #### Default: `relnode.log`


 ## METHODS

 ### LOG()
 
 It performs logging to the desired or main file while simultaneously printing log output to the console if requested.
 
 ### Options
 
 | OPTION              | TYPE                               | DEFAULT          | DESCRIPTION
 | :-                  | :-                                 | :-               | :-
 | **context**         | string                             | `""`             |  Log context
 | **type**            | string                             | `w`              |  Log type (w/W-e/E-i/I-d/D)
 | **title**           | string                             | `[RelLog]`       |  Log title
 | **Options**         | object{T_Options}                  | `DefaultOptions` |  Log options
 | **FileName**        | string                             | `relnode.log`    |  Log file name
 | **FilePath**        | string                             | `./logs`         |  Log file path
 
 ---
 
 ### Examples:

 ```ts
 const {RelLog,LOG_COLORS} = require("rellog")
 
 RL.LOG("this is a info log", "i")
 RL.LOG("this is a error log  with log title [BERK]", "E", "BERK")
 
 
 RL.LOG("Log displayed only in the console.", "w", "[BERK]", { FileMode: false})
 RL.LOG("warning log displayed only in the console and Colored log with title", "w", "[BERK]", { FileMode: false, Colors: { titleColor: LOG_COLORS.bg_bold_green } })
 RL.LOG("Active debug log in HighLigthMode.", "d", "[BERK]", { ConsoleMode: true, HighLigthMode: true, Colors: { titleColor: LOG_COLORS.bg_bold_green, dateColor: LOG_COLORS.blue } })
 
 RL.LOG("log with custom file name", "w", "[BERK]", {},"custom.log")
 RL.LOG("log with default file name and file path", "w", "[BERK]", {},"custom.log",RL.FilePath)
 RL.LOG("log with custom file name and file path", "w", "[BERK]", {},"custom.log","./logs")
 
 // Write log data for the `pre mode` within `` symbols
 RL.LOG(`bla bla 
 bla blablablabla 
 bla 
 blablablabla`, "E", "BERK")  


 ```


### context
 
Log context

#### Type:string
#### default `""`

### type
 
Log type

The value names can be in either uppercase or lowercase.

### type: string
### default `w`
 
| OPTION       | TYPE     | DEFAULT   | DESCRIPTION
| :-           | :-       | :-        | :-
| **w \| W**   | string   | `w`       |  WARNING
| **e \| E**   | string   | `e`       |  ERROR
| **i \| I**   | string   | `i`       |  INFO
| **d \| D**   | string   | `d`       |  DEBUG
 

### title
 
Log title
 
#### Type:string
 #### default `[RelLog]`

### Options

Main log options

---

### T_Options Type Options

* | OPTION           | TYPE                | DEFAULT         | DESCRIPTION
| :-                 | :-                  | :-              | :-
| **ConsoleMode**    | boolean             | `true`          | Whether the main log should be displayed on the console or not
| **FileMode**       | boolean             | `true`          | Whether the main log should be written to the main file or not
| **HighLigthMode**  | boolean             | `false`         | Whether color codes should be included when writing the main log to the file
| **Colors**         | object{T_Colors}    | `DefaultColors` | Color values for the main log

#### NOTE: When HighLightMode is true, the color of the logged messages is included in the log file. This may reduce readability for normal readers, but it ensures that the log output is well-organized and colorful when retrieved with console commands like 'cat'.
#### Type: `object{T_Options}`
#### Default: `DefaultOptions`

\
\
\
### T_Colors Type Options

It retrieves the colors from the LOG_COLORS object.

---

| OPTION          | TYPE    | DEFAULT                         | DESCRIPTION
| :-                | :-      | :-                            | :-
| **titleColor**    | string  | `LOG_COLORS.bg_bold_yellow`   | Title color of main log
| **dateColor**     | string  | `LOG_COLORS.green`            | Date color of main log
| **contextColor**  | string  | `LOG_COLORS.white`            | Context color of main log


### FileName

Log file name

#### Type:string
#### default `relnode.log`


### filePath

Log file path

#### Type:string
#### default `./logs`



### LOGTABLE()

It performs logging to the desired or main file while simultaneously printing log output to the console if requested.

### Options

| OPTION              | TYPE                      | DEFAULT          | DESCRIPTION
| :-                  | :-                        | :-               | :-
| **data**            | array[any]                | `[]`             |  Table contexts
| **head**            | array[string]             | `[]`             |  Table headers

---

#### NOTE : If the `LOGTABLE` has an empty `head`, it will create a regular table. The `head` argument enables the table to be horizontal, leading to different expectations for the content of the `data` argument

### Examples:
```ts
// An example of a regular table with the `head` argument:
// Currently, the `normaldata` argument accepts an array of objects

 const normaldata = [
   { 'Some key': 'Some value' },
   { 'Another key': 'Another value' }
 ];
  RL.LOGTABLE(normaldata)

```
---

\
\
```ts
// An example of a regular table without the `head` argument:
// Currently, the `headerdata` argument accepts an array of arrays

const headerdata = [
  ['First value', 'Second value'],
  ['First value', 'Second value']
];
// and headers 
const headers = ['TH 1 label', 'TH 2 label']

  RL.LOGTABLE(headerdata, headers)

```

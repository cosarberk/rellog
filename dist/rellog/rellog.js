"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelLog = void 0;
var fs = require('fs');
var TableConsole = require('cli-table');
// tek seferlik dosya yazımı ya da console basımı olabilir.
// tek bir ana dosyayay yazılacak ve ayriyeten dosya yolları ekenebilecek
var RelLog = /** @class */ (function () {
    function RelLog(ConsoleMode, FileMode, FilePath) {
        if (ConsoleMode === void 0) { ConsoleMode = true; }
        if (FileMode === void 0) { FileMode = true; }
        if (FilePath === void 0) { FilePath = "/logs/relnode.log"; }
        this.ConsoleMode = ConsoleMode;
        this.FileMode = FileMode;
        this.FilePath = FilePath;
    }
    RelLog.prototype.CreateLogProfile = function () { };
    RelLog.prototype.LOG = function (type, title, context, consoleMode, fileMode, filePath) {
        if (type === void 0) { type = "w"; }
        if (title === void 0) { title = "[RelLog]"; }
        if (context === void 0) { context = ""; }
        if (consoleMode === void 0) { consoleMode = this.ConsoleMode; }
        if (fileMode === void 0) { fileMode = this.FileMode; }
        if (filePath === void 0) { filePath = this.FilePath; }
        this.AppendFile(context);
    };
    // warn(val){console.log("\n"+'\x1b[33m%s\x1b[0m', "[RelNode]\n"+val)}
    // error(val){ console.log("\n"+"\x1b[31m%s\x1b[0m","[RelNode]\n"+ val)}
    // success(val){console.log("\n"+"\x1b[32m%s\x1b[0m","[RelNode]\n"+val)}
    // dialog(val){ console.log("\n"+'\x1b[36m%s\x1b[0m',"[RelNode]\n"+val)}
    RelLog.prototype.WriteFile = function (data, filename) {
        if (filename === void 0) { filename = this.FilePath; }
        fs.writeFileSync(filename, data, "utf8");
    };
    RelLog.prototype.AppendFile = function (data, filename) {
        if (filename === void 0) { filename = this.FilePath; }
        var fr = fs.appendFileSync(filename, data, "utf8");
        console.log(fr);
    };
    RelLog.prototype.ReadFile = function (filename) {
        if (filename === void 0) { filename = this.FilePath; }
        fs.readFileSync(filename, "utf8");
    };
    return RelLog;
}());
exports.RelLog = RelLog;
var RL = new RelLog();
console.log("deneme");
RL.LOG("w", "denem", "deneme içerik");

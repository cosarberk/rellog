const fs = require('fs');
var TableConsole = require('cli-table');

// tek seferlik dosya yazımı ya da console basımı olabilir.
// tek bir ana dosyayay yazılacak ve ayriyeten dosya yolları ekenebilecek
export class RelLog{
    ConsoleMode:boolean
    FileMode:boolean
    FilePath:string

    constructor(ConsoleMode:boolean=true,FileMode:boolean=true,FilePath:string="/logs/relnode.log"){
        this.ConsoleMode=ConsoleMode
        this.FileMode=FileMode
        this.FilePath=FilePath

    }

    CreateLogProfile(){}

    LOG(
    type="w",
    title="[RelLog]",
    context="",
    consoleMode=this.ConsoleMode,
    fileMode=this.FileMode,
    filePath=this.FilePath){

        this.AppendFile(context)

    }
    // warn(val){console.log("\n"+'\x1b[33m%s\x1b[0m', "[RelNode]\n"+val)}
    // error(val){ console.log("\n"+"\x1b[31m%s\x1b[0m","[RelNode]\n"+ val)}
    // success(val){console.log("\n"+"\x1b[32m%s\x1b[0m","[RelNode]\n"+val)}
    // dialog(val){ console.log("\n"+'\x1b[36m%s\x1b[0m',"[RelNode]\n"+val)}

    private WriteFile(data:string,filename:string=this.FilePath){
        fs.writeFileSync(filename, data, "utf8");
    }
    
    private AppendFile(data:string,filename:string=this.FilePath){
       let fr =  fs.appendFileSync(filename, data, "utf8");
       console.log(fr)
    }

    private ReadFile(filename:string=this.FilePath){
        fs.readFileSync(filename, "utf8"); 
    }
}


const RL = new RelLog()
console.log("deneme")
RL.LOG("w","denem","deneme içerik")
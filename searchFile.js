var fs = require('fs');
var path=require('path');
var disks = require('diskinfo');
var prompt = require('prompt-sync')();



var fname=prompt("Enter a file to search:")

disks.getDrives(function(err, drivesList) {
    console.log("Select a drive from these to search");
    for (var i = 0; i < drivesList.length; i++) {
        console.log('\b' + drivesList[i].mounted);
    }
    var location=prompt("Enter a directory to search:")
    SearchFile(location+":\\");//__dirname is current directory and calling function
});

function SearchFile(dir){
    //console.log('[+]',dir);
    var files=fs.readdirSync(dir);//read contents and returns array of all file names
    for(var x in files)
    {
        if(! /^\..*/.test(files[x])){
            if('$RECYCLE.BIN'!=files[x] && 'System Volume Information'!=files[x] && 'node_modules'!=files[x]){
                var next=path.join(dir,files[x]);
                //console.log("files:"+files[x]);
                //lstat gives info-file or directory
                //if directory it goes inside it and calls function
                if(fs.lstatSync(next).isDirectory()==true){
                    //console.log(next);  //next is full path 
                    SearchFile(next);
                }
                //print the files with tab space
                else{
                    //console.log('\t',next);  //with directory file name 
                    //console.log(files[x]);   //just file name
                    if(fname===files[x]){
                        console.log('\t'+"File found:",next);
                        fs.writeFile(dir+"\\file.log", next, err => {
                            if (err) {
                                console.error(err)
                                return
                            }
                            console.log("File saved in "+next);
                        })
                    }   
                }
            }   
        }    
    }
}
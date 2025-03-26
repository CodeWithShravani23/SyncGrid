const yargs= require("yargs");
//  hidebin = to read an argument after command
const{hideBin}=require("yargs/helpers");
const{initRepo}=require("./controllers/init.js");
const{addRepo}=require("./controllers/add.js");
const{commitRepo}=require("./controllers/commit.js");
const{pullRepo}=require("./controllers/pull.js");
const{pushRepo}=require("./controllers/push.js");
const{revertRepo}=require("./controllers/revert.js");
yargs(hideBin(process.argv)).command("init","initialise a new repository",{},initRepo)
.command("add <file>", "Add a file to the repository", (yargs) => {
    yargs.positional("file", {
      description: "The file to add to the staging area",
      type: "string",
    });
  }, (argv)=>{
     addRepo(argv.file);
  })
.command("commit <message>","commit a staged file",(yargs) => {
    yargs.positional("message", {
      description: "commit message",
      type: "string",
    });
  },(argv)=>{
    commitRepo(argv.message);
 })

.command("push","push commits to S3",{},pushRepo)
.command("pull","pull commits from S3",{},pullRepo)
.command("revert <revertID>","revert to a specific  commit",(yargs) => {
    yargs.positional("revertID", {
      description: "commit ID to a revert to",
      type: "string",
    });},revertRepo)
.demandCommand(1,"You need atleast one command").help().argv;

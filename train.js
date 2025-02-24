/**
 * ! CORE MODULES
 */

const print = console.log;
/*
File Modules ---> writeFileSync() and writeFile() methods those are responsible for writing data to a file. if file doesn't exist, it will be created, if the file exists as we saw, its text content will be overwritten with new provided message.
*/

const fs = require("fs");
// fs.writeFileSync(
//     "notes.txt",
//     "this file is for storing some notes for you, written by Daniel"
// );

// CHALLENGE: Append a message to notes.txt.

// 1. Use appendFileSync() method  to append to the file.
// 2. Run the script
// 3. Check your work by opening the file and viewing the appended text.

//✨ appendFileSync() is a method in Node.js that belongs to the fs (File System) module. It is used to synchronously append data to a file. If the file does not exist, it creates a new one.

// SOLUTION
// const filePath = "notes.txt";
// const content =
//     " Hello There, my name is Daniel and I am 28 years old. Furthermore, I live in the South Korea as a student.";
// fs.appendFileSync(filePath, content, "utf-8");

/**
 * ! IMPORTING YOUR OWN FILES
 **/

/*
All of the files which we can refer to  as modules have their own scope with its own variables. one file can not access variables defined in another file even though  it was loaded in with require() function. in order to use these variables in other files, we need to explicitly export all of the stuff the file share with the outside world. for that we use "module.exports" and "require()" functions. So whatever we assign to modules.experts is what other files can get access to.
*/
// const myFirstName = require("./utils.js");
// print(myFirstName);

// const add = require("./utils");
// const result = add(10, 30);
// print(result);

// CHALLENGE: Define and use a function in a new file.

// 1. create a file called "notes.js".
// 2. Create getNotes() function that returns "Your notes...".
// 3. Export getNotes() function.
// 4. From app.js, load in and call the function printing message to the console.

// const getNotes = require("./notes");
// print(getNotes());

/**
 * ! IMPORTING NPM MODULES
 */

/*
Before we actually use any these npm modules in our script,   we have to take two important steps: first,  we have to initialize NPM in our project, then two, we have to install the module we want to use.
First up, we have to run a single command from the project root  in your terminal: npm init -y
*/
const validator = require("validator");
// print(validator.isEmail("kurbonbekovshokhboz@gmail.com"));
// print(validator.isEmail("kurbonbekov.com"));

// const url = "http://kurbonbekov.com";
// print(validator.isURL(url));
// print(validator.isURL("JSGKSBG./NJKVSNK.com"));

/**
 * ! PRINTING IN COLORS
 */

const chalk = require("chalk");
const log = console.log;
log(chalk.green("Succcess!"));
log(chalk.bold("Success!"));
log(chalk.inverse("Success!"));

/**
 * !  GLOBAL NPM MODULES AND NODEMON
 */
/*
When we install the modules globally, we actually don't load it in directly to our source files. Instead, we install globally and it gives us access to a new command we use from the terminal. When we are install a module globally,  the installation command  basically same with one slight difference: npm install  <module-name> -g, this is gonna install the module globally.it is installing the tool on our operating system,that's why, we don't see any package as a dependency in our package.json file.
 */
/**
 * ! GETTING INPUTS FROM USERS
 */
// Getting inputs from the users by the command line arguements. the question is that where do we access to these command line arguments? the answer is that they are on the process global variables. on process, there is a property and that is where we can access all the command line argunment into our app. If we write like console.log(process.argv), it will give us a new array, inside of there, we have three strings, two of them are always provided by Node.js itself. the first one is the path to the node.js executable on our machine. The node executable is the file that runs the Node.js runtime environment. It's what allows you to execute JavaScript code outside of a web browser. The second is the path to our app.js file, third one is the value we provided as we wrote the command like "node app.js Daniel. If we could do something like "node app.js add" which would let our program know our attention to add new note, we would access it like this: process.argv[2].

// const command = process.argv[2];
// if (command === "add") {
//     console.log("Adding note !!!");
// } else if (command === "remove") {
//     console.log("Removing a note");
// }
// Now we know that the user is trying to add or remove a note. How about we want to know note's title and body?. "node app.js add --title='My Note'" If we access the command line arguments like this: console.log(process.argv); we see this result:

/* C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\USER\\Desktop\\back-end-bootcamp\\note-app\\app.js',
  'add',
  '--title=My Note'*/
// Now we are gonna parse process.argv, for that we use the "yargs" module. So install it with npm install yargs.

const yargs = require("yargs");
// console.log(process.argv);
// console.log(yargs.argv); // yargs.argv will parse the command line arguments and provide us with an object with properties for each argument. for the deeper understanding , we use the command line "node app.js --help"

// Yargs comes with a tones of parsing and feaatures on its own. but it can be configured to fit our needs.

// customize the yargs version.
// yargs.version("1.1.0");

// create add command.
// yargs.command({
//     command: "add",
//     describe: "add a new note",
//     handler: function () {
//         console.log("adding a note here");
//     }, // this is the function that will be called if the command ever gets used
// });
// as a result of the command line "node app.js add", it will print "adding a note there". it means that yargs understands the command "add" and it calls the handler function that we provided.

// yargs.command({
//     command: "remove",
//     describe: "Remove a note",
//     handler: function () {
//         console.log("Removing a note here...");
//     },
// });

// console.log(yargs.argv);

// CHALLENGE: ADD TWO NEW COMMANDS.
// 1. SET UP A COMMAND TO SUPPORT "List" COMMAND (PRINTING PLACEHOLDER FOR NOW)
// 2. SET UP A COMMAND TO SUPPORT "READ" COMMAND (PRINTING PLACEHOLDER FOR NOW).
// 3. TEST YOUR WORK BY RUNNING BOTH COMMANDS AND ENSURE CORRECT OUTPUT.

// TEST 1
// yargs.command({
//     command: "list",
//     describe: "It lists all notes",
//     handler: function () {
//         console.log("Listing all the notes there");
//     },
// });

// TEST 2
// yargs.command({
//     command: "read",
//     describe: "It needs to read a note",
//     handler: function () {
//         console.log("Reading all the notes there");
//     },
// });
// console.log(yargs.argv);

/**
 * ! ARGUMENT PARSING WITH YARGS PART 2
 */
/*
Now we are gonna set up another property on the configuration object we pass to the command. builder's value is an object and on that object we can define all of the options that we want  this command to support
*/

yargs.command({
    command: "add",
    describe: "add a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true, // this makes the title option required
            type: "string", // we are telling yargs that this option should be a string
        },
        body: {
            describe: "the body part of the note",
            demandOption: true,
            type: "string",
        },
    },
    handler: function (argv) {
        console.log("Title: ", argv.title);
        console.log("Body: ", argv.body);
    }, // this is the function that will be called if the command ever gets used
});
yargs.parse(); // ✅ Required to trigger argument parsing
// if we run "node app.js add --title='My Note'", it will print: { _: [ 'add' ], title: 'My note', '$0': 'app.js' }. Now it is up to us as a developer to decide whether or not a given option should be required. for that we use "demandOPtion property". inside the option object.argv.title returns the value passed via --title="some value". If no --title is given, it returns undefined, unless a default value is set. If type: "boolean", passing --title without a value returns true. we should make  sure that argv.title is always a string. for that we use "type: string" on our little options object configuration. After all, we have this in place, we are always have a string value for the title and it is required
/// console.log(yargs.argv) === yarges.parse();

/*The yargs.parse() method is used to manually trigger the parsing of command-line arguments. Normally, Yargs automatically parses arguments when you access argv, but parse() gives more control over when and how the parsing happens.*/

/* CHALLENGE: Add an option to yargs*/

// 1. Set up  body option for the add command.
// 2. Configure a description, and make it required, and for it to be a string.
// 3. Log the body value in the handler function
// 4. Test Your work.

/**
 * ! STORING DATA WITH JSON
 */
/*
We already know how we are getting the data  into the program, and For now. it is via command line arguments which we have support for thanks to yargs.
JSON (JavaScript Object Notation) is a lightweight data format commonly used in backend development for data storage, communication, and API responses. It's widely supported across languages and databases.
                           Why JSON is Used in the Backend?
✅ Lightweight & Human-readable – Easy to read and write.
✅ Language-independent – Works with Java, Python, Node.js, etc.
✅ Widely Used in APIs – RESTful APIs and GraphQL often return JSON.
✅ Fast & Efficient – Quicker than XML due to its simple structure.
✅ Works Well with Databases – NoSQL databases like MongoDB store data as JSON.
 */
// by working with JSON, we are gonna able to read and write to the file system,

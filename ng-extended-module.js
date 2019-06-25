
const args = process.argv.slice(2);
console.log(args);


var exec = require('child_process').exec;

const generateModule = () => new Promise((resolve) => {
    // TODO Add routing?
    exec(`ng g mo ${args[0]}`, (error, stdout, stderr) => {
        if (stdout)
            console.log(`NgExtendedModule.js: ${stdout}`);
        if (stderr)
            console.log(`NgExtendedModule.js: Error: ${stderr}`);
        if (error)
            console.log(`NgExtendedModule.js: Exec error: ${error}`);
        resolve();
    });
});

async function createModule() {
    try {
        console.log(await generateModule());
    } catch (error) {
        console.log(error);
    }
}

async function createComponent() {
    // TODO
}

async function createService() {
    // TODO
}

async function createClassOrInterface() {
    // TODO
}

createModule();
import * as child_process from 'child_process';
import { singular } from 'pluralize';

function run(cmd: string) {
    return new Promise((resolve, reject) => child_process.exec(cmd, (error, stdout) => error ? reject(error) : resolve(stdout)));
}

async function createExtendedModule(args: string[]): Promise<void> {
    try {
        if (!args[0])
            return console.error('Invalid module path or name');
        const modulePath = args[0];
        const moduleName = modulePath.indexOf('/') != -1 ? modulePath.split('/')[1] : modulePath;
        console.log(await run(`ng generate module ${modulePath} --routing`));
        console.log(await run(`ng generate component ${modulePath}/pages/${moduleName}`));
        console.log(await run(`ng generate service ${modulePath}/services/${moduleName}`));
        console.log(await run(`ng generate interface ${modulePath}/models/${singular(moduleName)}.model`));
    } catch (err) {
        return console.error(`-- ng-extended-module-generator --\n${err.message}`);
    }
}

createExtendedModule(process.argv.slice(2));
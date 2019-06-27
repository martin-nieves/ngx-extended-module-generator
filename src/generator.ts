import * as child_process from 'child_process';
import { singular } from 'pluralize';
import * as colors from 'colors';

export class Generator {

    private static args: string[] = process && process.argv && process.argv.slice(2) || [];

    private static run(cmd: string): Promise<any> {
        return new Promise((resolve, reject) => child_process.exec(cmd, (error, stdout) => error ? reject(error) : resolve(stdout)));
    }

    private static outputError(txt: string): string {
        return colors.red(`[ngx-extended-module-generator] ${txt}`);
    }

    private static outputSuccess(txt: string): string {
        return colors.green(`[ngx-extended-module-generator] ${txt}`);
    }

    public static async createModule(): Promise<void> {
        try {
            if (!this.args[0])
                return console.error(this.outputError('Invalid module path or name.'));
            const modulePath = this.args[0];
            const moduleName = modulePath.indexOf('/') != -1 ? modulePath.split('/')[1] : modulePath;
            console.log(this.outputSuccess(await this.run(`ng generate module ${modulePath} --routing`)));
            console.log(this.outputSuccess(await this.run(`ng generate component ${modulePath}/pages/${moduleName}`)));
            console.log(this.outputSuccess(await this.run(`ng generate service ${modulePath}/services/${moduleName}`)));
            console.log(this.outputSuccess(await this.run(`ng generate interface ${modulePath}/models/${singular(moduleName)}.model`)));
        } catch (err) {
            const errMessage: string = err.message.split(/\r?\n/).filter((x: string) => x).map((txt: string) => `\n${this.outputError(txt)}`).join('');
            return console.error(errMessage);
        }
    }
}

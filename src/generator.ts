import * as child_process from 'child_process';
import { singular } from 'pluralize';
import { Color, red, green, yellow } from 'colors';


export class Generator {

    private static args: string[] = process && process.argv && process.argv.slice(2) || [];

    private static run(cmd: string): Promise<string> {
        return new Promise<string>((resolve, reject) => child_process.exec(cmd, (error, stdout) => error ? reject(error) : resolve(stdout)));
    }

    private static output(txt: string, color: Color): string {
        return color(`[ngx-extended-module-generator] ${txt}`);
    }

    private static breakLineFormat(txt: string, color: Color): string {
        return txt.split(/\r?\n/).filter((x: string) => x).map((txt: string) => `\n${this.output(txt, color)}`).join('');
    }

    public static async createModule(): Promise<void> {
        try {
            if (!this.args[0])
                return console.error(this.output(`Module path or name is required. Example usage: ngex modules/users`, yellow));
            const modulePath = this.args[0];
            const moduleName = modulePath.indexOf('/') != -1 ? modulePath.split('/')[1] : modulePath;
            console.log(this.breakLineFormat(await this.run(`ng generate module ${modulePath} --routing`), green));
            console.log(this.breakLineFormat(await this.run(`ng generate component ${modulePath}/pages/${moduleName}`), green));
            console.log(this.breakLineFormat(await this.run(`ng generate service ${modulePath}/services/${moduleName}`), green));
            console.log(this.breakLineFormat(await this.run(`ng generate interface ${modulePath}/models/${singular(moduleName)} model`), green));
        } catch (err) {
            const errMessage: string = err.message || "Something went wrong. Verify that you are in an Angular project.";
            return console.error(this.breakLineFormat(errMessage, red));
        }
    }
}

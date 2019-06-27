"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = require("child_process");
const pluralize_1 = require("pluralize");
const colors = require("colors");
class Generator {
    static run(cmd) {
        return new Promise((resolve, reject) => child_process.exec(cmd, (error, stdout) => error ? reject(error) : resolve(stdout)));
    }
    static outputError(txt) {
        return colors.red(`[ngx-extended-module-generator] ${txt}`);
    }
    static outputSuccess(txt) {
        return colors.green(`[ngx-extended-module-generator] ${txt}`);
    }
    static createModule() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.args[0])
                    return console.error(this.outputError('Invalid module path or name.'));
                const modulePath = this.args[0];
                const moduleName = modulePath.indexOf('/') != -1 ? modulePath.split('/')[1] : modulePath;
                console.log(this.outputSuccess(yield this.run(`ng generate module ${modulePath} --routing`)));
                console.log(this.outputSuccess(yield this.run(`ng generate component ${modulePath}/pages/${moduleName}`)));
                console.log(this.outputSuccess(yield this.run(`ng generate service ${modulePath}/services/${moduleName}`)));
                console.log(this.outputSuccess(yield this.run(`ng generate interface ${modulePath}/models/${pluralize_1.singular(moduleName)}.model`)));
            }
            catch (err) {
                const errMessage = err.message.split(/\r?\n/).filter((x) => x).map((txt) => `\n${this.outputError(txt)}`).join('');
                return console.error(errMessage);
            }
        });
    }
}
Generator.args = process && process.argv && process.argv.slice(2) || [];
exports.Generator = Generator;
//# sourceMappingURL=generator.js.map
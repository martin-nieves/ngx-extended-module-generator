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
const colors_1 = require("colors");
class Generator {
    static run(cmd) {
        return new Promise((resolve, reject) => child_process.exec(cmd, (error, stdout) => error ? reject(error) : resolve(stdout)));
    }
    static output(txt, color) {
        return color(`[ngx-extended-module-generator] ${txt}`);
    }
    static breakLineFormat(txt, color) {
        return txt.split(/\r?\n/).filter((x) => x).map((txt) => `\n${this.output(txt, color)}`).join('');
    }
    static createModule() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.args[0])
                    return console.error(this.output(`Module path or name is required. Example usage: ngex modules/users`, colors_1.yellow));
                const modulePath = this.args[0];
                const moduleName = modulePath.indexOf('/') != -1 ? modulePath.split('/')[1] : modulePath;
                console.log(this.breakLineFormat(yield this.run(`ng generate module ${modulePath} --routing`), colors_1.green));
                console.log(this.breakLineFormat(yield this.run(`ng generate component ${modulePath}/pages/${moduleName}`), colors_1.green));
                console.log(this.breakLineFormat(yield this.run(`ng generate service ${modulePath}/services/${moduleName}`), colors_1.green));
                console.log(this.breakLineFormat(yield this.run(`ng generate interface ${modulePath}/models/${pluralize_1.singular(moduleName)} model`), colors_1.green));
            }
            catch (err) {
                const errMessage = err.message || "Something went wrong. Verify that you are in an Angular project.";
                return console.error(this.breakLineFormat(errMessage, colors_1.red));
            }
        });
    }
}
Generator.args = process && process.argv && process.argv.slice(2) || [];
exports.Generator = Generator;
//# sourceMappingURL=generator.js.map
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
function run(cmd) {
    return new Promise((resolve, reject) => child_process.exec(cmd, (error, stdout) => error ? reject(error) : resolve(stdout)));
}
function createExtendedModule(args) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!args[0])
                return console.error('Invalid module path or name');
            const modulePath = args[0];
            const moduleName = modulePath.indexOf('/') != -1 ? modulePath.split('/')[1] : modulePath;
            console.log(yield run(`ng generate module ${modulePath} --routing`));
            console.log(yield run(`ng generate component ${modulePath}/pages/${moduleName}`));
            console.log(yield run(`ng generate service ${modulePath}/services/${moduleName}`));
            console.log(yield run(`ng generate interface ${modulePath}/models/${pluralize_1.singular(moduleName)}.model`));
        }
        catch (err) {
            return console.error(`-- ng-extended-module-generator --\n${err.message}`);
        }
    });
}
createExtendedModule(process.argv.slice(2));
//# sourceMappingURL=main.js.map
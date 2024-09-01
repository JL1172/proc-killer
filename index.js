#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var rl = require("readline-sync");
var child_process_1 = require("child_process");
var KillPort = /** @class */ (function () {
    function KillPort() {
        this.port = Infinity;
        this.pid = Infinity;
    }
    KillPort.prototype.main = function () {
        return __awaiter(this, void 0, void 0, function () {
            var int, int2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPort()];
                    case 1:
                        int = _a.sent();
                        if (!(int === 1)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getPid()];
                    case 2:
                        int2 = _a.sent();
                        if (!(int2 === 1)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.killProcess()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    KillPort.expediteKillProcess = function (port) {
        return __awaiter(this, void 0, void 0, function () {
            var pid, pid_num_1, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, new Promise(function (resolve) {
                                (0, child_process_1.exec)("lsof -i :".concat(port), function (error, stdout) {
                                    resolve(stdout);
                                });
                            })];
                    case 1:
                        pid = _a.sent();
                        if (!pid) {
                            throw new Error("No process detected at port " + port);
                        }
                        pid_num_1 = Number(pid
                            .split(" ")
                            .filter(function (n) { return n; })
                            .at(-9));
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                (0, child_process_1.exec)("kill -9 ".concat(pid_num_1), function (error) {
                                    if (error) {
                                        reject(error);
                                    }
                                    else {
                                        resolve;
                                    }
                                });
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.error(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    KillPort.prototype.getPort = function () {
        return __awaiter(this, void 0, void 0, function () {
            var answer, count_1, intervalId_1, err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.clear();
                        answer = rl.question(chalk.greenBright("Enter port you want to kill: "));
                        this.parseNumber(answer);
                        this.port = Number(answer);
                        count_1 = 5;
                        intervalId_1 = setInterval(function () {
                            if (count_1 === 0) {
                                clearInterval(intervalId_1);
                            }
                            else {
                                console.clear();
                                console.log("Inputted port: ".concat(chalk.cyanBright(_this.port), ". Press ").concat(chalk.blueBright("[control + c]"), " to restart process or do nothing to proceed. \n You have ").concat(count_1, " second(s) remaining."));
                                count_1--;
                            }
                        }, 1000);
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 6000); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, 1];
                    case 2:
                        err_2 = _a.sent();
                        this.reportError("getPort", err_2 + "");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    KillPort.prototype.getPid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var command_1, pid, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.clear();
                        command_1 = "sudo lsof -i :".concat(this.port);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                (0, child_process_1.exec)(command_1, function (err, stdout, stderr) {
                                    resolve(stdout);
                                });
                            })];
                    case 1:
                        pid = _a.sent();
                        if (!pid) {
                            throw new Error(chalk.red("No process at port: ".concat(this.port, " is active.")));
                        }
                        else {
                            this.pid = Number(pid
                                .split(" ")
                                .filter(function (n) { return n; })
                                .at(-9));
                            //* this might not always be 9 idk
                        }
                        console.log("Successfully fetched PID ".concat(chalk.blueBright(this.pid)));
                        return [2 /*return*/, 1];
                    case 2:
                        err_3 = _a.sent();
                        this.reportError("getPid", err_3 + "");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    KillPort.prototype.killProcess = function () {
        return __awaiter(this, void 0, void 0, function () {
            var command_2, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.clear();
                        command_2 = "sudo kill -9 ".concat(this.pid);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                (0, child_process_1.exec)(command_2, function (err, stdout, stderr) {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        resolve(stdout);
                                    }
                                });
                            })];
                    case 1:
                        result = _a.sent();
                        console.log(chalk.greenBright("Successfully killed process: ".concat(this.pid)));
                        process.exit(0);
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        this.reportError("killProcess", err_4 + "");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    KillPort.prototype.parseNumber = function (value) {
        if (isNaN(Number(value))) {
            throw new TypeError("Port number input must be integer.");
        }
        var working_value = Number(value);
        if (working_value < Number.MIN_SAFE_INTEGER ||
            working_value > Number.MAX_SAFE_INTEGER) {
            throw new RangeError("Value must be greater than 2^-63 and less than 2^63.");
        }
        if (isFinite(working_value) === false) {
            throw new RangeError("Value must be finite.");
        }
    };
    KillPort.prototype.reportError = function (methodName, err) {
        var _this = this;
        var count = 5;
        var intervalId = setInterval(function () {
            if (count === 0) {
                clearInterval(intervalId);
                _this.main();
            }
            else {
                console.clear();
                console.error(chalk.red("Error from ".concat(methodName, ": ").concat(err)));
                console.timeStamp();
                console.trace();
                console.log("\n retrying in ".concat(count, " seconds."));
                count--;
            }
        }, 1000);
    };
    return KillPort;
}());
function execute_file() {
    try {
        if (process.argv.length > 2) {
            var flags = Number(process.argv[2].split("").slice(2).join(""));
            if (isNaN(flags) === false && typeof flags === "number") {
                KillPort.expediteKillProcess(flags);
            }
            else {
                var killPortInstance = new KillPort();
                killPortInstance.main();
            }
        }
        else {
            var killPortInstance = new KillPort();
            killPortInstance.main();
        }
    }
    catch (err) {
        console.error("Error: If you are running script with flags utilizing npm scripts, ensure it follows the following format: \n\n      ".concat(chalk.bgRgb(51, 51, 51)("npm start -- --<port>"), " \n\n      or if you are executing via ts-node, follow the following format: \n\n         ").concat(chalk.bgRgb(51, 51, 51)("(npx) ts-node --<port>"), " \n\n          ").concat(chalk.bgRgb(51, 51, 51)("killp --<port>"), "\n      "));
    }
}
execute_file();

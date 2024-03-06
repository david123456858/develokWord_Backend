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
Object.defineProperty(exports, "__esModule", { value: true });
const ts_postgres_1 = require("ts-postgres");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class db_Connect {
    constructor() {
    }
    static getIntance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!db_Connect._intance) {
                db_Connect._intance = new db_Connect();
                yield db_Connect._intance.connectdb();
            }
            return db_Connect._intance;
        });
    }
    connectdb() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = (0, ts_postgres_1.connect)({
                "host": process.env.HOST,
                "user": process.env.USER,
                "database": process.env.DATABASE,
                "password": process.env.PASSWORD,
                "port": 5432
            });
            return client;
        });
    }
}

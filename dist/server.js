"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const sequelize_1 = require("./sequelize");
const schema_1 = __importDefault(require("./schema/schema"));
const app = express_1.default();
// bind express with graphql
app.use('/graphql', express_graphql_1.default({
    schema: schema_1.default,
    graphiql: true
}));
// app.listen(8080, () => console.log('Example app listening on port 8080!'));
const port = process.env.PORT || 8080;
(() => __awaiter(this, void 0, void 0, function* () {
    yield sequelize_1.sequelize.sync({ force: false });
    app.listen(port, () => console.info(`Server running on port ${port}`));
}))();
//# sourceMappingURL=server.js.map
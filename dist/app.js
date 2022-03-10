"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const exampleRoutes_1 = __importDefault(require("./routes/exampleRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes"));
const config_1 = require("./config");
const errorHanlder_1 = require("./middleware/errorHanlder");
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./middleware/passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("./swagger.json"));
const index_1 = __importDefault(require("./config/index"));
index_1.default.sync().then(() => {
    console.log("connect to db");
    app.listen(config_1.PORT, () => {
        console.log(`Listening On PORT ${config_1.PORT}`);
    });
});
const app = (0, express_1.default)();
app.use('/swagger', swagger_ui_express_1.default.serve);
app.get('/swagger', swagger_ui_express_1.default.setup(swaggerDocument));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(passport_1.default.initialize());
(0, passport_2.default)(passport_1.default);
app.use("/", exampleRoutes_1.default);
app.use("/user", userRoutes_1.default);
app.use("/employee", employeeRoutes_1.default);
app.use(() => {
    throw (0, http_errors_1.default)(404, "Route not found");
});
app.use(errorHanlder_1.errorHandler);
// mongoose
//   .connect(DB)
//   .then(() => {
//     console.log("Connected to db");
//     app.listen(PORT, () => {
//       console.log(`Listening On PORT ${PORT}`);
//     });
//   })
//   .catch(() => {
//     throw createHttpError(501, "Unable to connect database");
//   });

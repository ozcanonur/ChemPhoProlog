"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var path_1 = __importDefault(require("path"));
var public_1 = __importDefault(require("./routes/public"));
var web_1 = __importDefault(require("./routes/web"));
var app = express_1.default();
app.use(express_1.default.static('../client/build'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/api', public_1.default);
app.use('/apiWeb', web_1.default);
// Catch all for deploy
app.get('/*', function (_, res) {
    res.sendFile(path_1.default.join(__dirname, '../client/build/index.html'), function (err) {
        if (err)
            res.status(500).send(err);
    });
});
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('Server is up on port ' + port);
});

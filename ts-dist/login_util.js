"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import '../node_modules/dotenv/config';
const dist_1 = require("../node_modules/instagram-private-api/dist");
var fs = require('fs');
// #TODO I am not sure how to deal with this this.credentials, I am very sure there is a cleaner way, to set it in a config file
// #TODO I think my import fo IgApiClient is wrong
class LoginUtil {
    constructor(cookiePath) {
        this.credentials = {
            'IG_USERNAME': "managersrace",
            'IG_PASSWORD': "VOVN7KEt"
        };
        this.cookiePath = cookiePath;
        this.cookie = "";
    }
    login() {
        var test = this.createSession();
        console.log(test);
    }
    saveCookieToFile() {
        const cookiePath = `${this.cookiePath}/${this.credentials.IG_USERNAME}_cookie.json`;
        const jsonCookie = JSON.stringify(this.cookie);
        fs.writeFile(cookiePath, jsonCookie, function (err, data) {
            console.log(err);
        });
    }
    createSession() {
        (async () => {
            const ig = new dist_1.IgApiClient();
            ig.state.generateDevice(this.credentials.IG_USERNAME);
            // ig.state.proxyUrl = this.credentials.IG_PROXY;
            // This function executes after every request
            ig.request.end$.subscribe(async () => {
                // Here you have JSON object with cookies.
                // You could stringify it and save to any persistent storage
                this.cookie = await ig.state.serializeCookieJar();
                const state = {
                    deviceString: ig.state.deviceString,
                    deviceId: ig.state.deviceId,
                    uuid: ig.state.uuid,
                    phoneId: ig.state.phoneId,
                    adid: ig.state.adid,
                    build: ig.state.build,
                };
                this.saveCookieToFile();
            });
            // This call will provoke request.$end stream
            await ig.account.login(this.credentials.IG_USERNAME, this.credentials.IG_PASSWORD);
            return "moin moin";
        })();
    }
    getCookie() {
    }
    deleteCookie() {
    }
}
exports.LoginUtil = LoginUtil;

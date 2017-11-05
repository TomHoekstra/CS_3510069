import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../models/user.model';
import { IUserData } from '../models/user-data.model';
import * as bcrypt from "bcrypt-nodejs";

var fs = require('fs');
var path = require('path');

export default class AuthUtils {
    public static generateAccessToken(user: IUser) {
        const permissions = ["student"];
        if (user.role === "admin") {
            permissions.push("admin");
        }

        return jwt.sign({
            permissions: permissions,
            user: user,
            exp: this.generateEndOfDay().getTime()
        }, process.env.JWT_SECRET
        )
    }

    public static decodeAccesToken(token: string) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }

    public static setAccessCookie(res: express.Response, token: string) {
        res.cookie('access_token', token, { secure: false, httpOnly: true, signed: true, expires: this.generateEndOfDay() }); // zet secure op true bij ssl
    }

    private static generateEndOfDay() {
        var d = new Date();
        d.setHours(23, 59, 59, 0);
        return d;
    }

    public static getUserData(user: IUser): IUserData {
        let userData: IUserData = {
            studentId: user.studentId,
            firstName: user.firstName,
            lastName: user.lastName,
            signedIn: true,
            role: user.role
        };

        return userData;
    }

    public static generateHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    public static validPassword = function (password, passwordDb) {
        return bcrypt.compareSync(password, passwordDb);
    };
}
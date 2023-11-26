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
exports.ddd = void 0;
const db_1 = require("../../clients/db");
const bbbresolver = {
    getAllTweets: () => db_1.prismaClient.tweet.findMany({ orderBy: { createdAt: "desc" } })
};
const cccresolver = {
    createTweet: (parent, { payload }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        if (!ctx.user)
            throw new Error("LogIn to your account to post something");
        const tweet = yield db_1.prismaClient.tweet.create({
            data: {
                content: payload.content,
                image: payload.image,
                author: { connect: { id: ctx.user.id } }
            }
        });
        return tweet;
    })
};
const extraResolvers = {
    Tweet: {
        author: (parent) => db_1.prismaClient.user.findUnique({ where: { id: parent.authorId } })
    }
};
exports.ddd = { bbbresolver, cccresolver, extraResolvers };

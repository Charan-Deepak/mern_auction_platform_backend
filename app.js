// const express = require(express) ; nodejs export
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./router/userRoutes.js";
import auctionItemRouter from "./router/auctionItemRoutes.js";
import bidRouter from "./router/bidRoutes.js";
import commissionRouter from "./router/commissionRouter.js";
import superAdminRouter from "./router/superAdminRoutes.js";
import { endedAuctionCron } from "./automation/endedAuctionCron.js";
import { verifyCommissionCron } from "./automation/verifyCommissionCron.js";

const app = express() ;
config({
    path : "./config/config.env",
});

app.use(
    cors({
        origin : [process.env.FRONTEND_URL],
        methods : ["POST","GET","PUT","DELETE"],
        credentials : true,
    })
) ;
// corse : for connecting FRONTEND and BACKEND

app.use(cookieParser()) ; // for acessing cookies
app.use(express.json()) ; // returns data in json format 
app.use(express.urlencoded({extended:true})) ; // datatype matching in between them
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
); // uploading and storing files in Backend

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auctionitem", auctionItemRouter);
app.use("/api/v1/bid", bidRouter);
app.use("/api/v1/commission", commissionRouter);
app.use("/api/v1/superadmin", superAdminRouter);

endedAuctionCron();
verifyCommissionCron();
connection();
app.use(errorMiddleware);

export default app;

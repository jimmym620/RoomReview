import mongoose from "mongoose";

const connectMongo = async () =>
    mongoose.connect(
        process.env.MONGO_URI,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err) => {
            if (!err) {
                console.log("Connected successfully to 27017");
            }
        }
    );
// const connectMongo = async () =>
//     mongoose.connect(
//         "mongodb://localhost:27017/RoomReviewer",
//         { useNewUrlParser: true },
//         (err) => {
//             if (!err) {
//                 console.log("Connected successfully to 27017");
//             } else {
//                 console.log(err);
//             }
//         }
//     );

export default connectMongo;

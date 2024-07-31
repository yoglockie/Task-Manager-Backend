import express from "express"
import AuthRoutes from  "./routes/authRoutes.js"
import cors from "cors"
import TaskRoutes from "./routes/taskRoutes.js"
import MongoDbHelper from "./db/mongoDbHelper.js"
const app = express();

const PORT = process.env.PORT || 4000


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/backend/auth",AuthRoutes)
app.use("/backend/task",TaskRoutes)

await MongoDbHelper.connect();

app.listen(PORT,()=>{
    console.log("Server running on PORT 4000")
})
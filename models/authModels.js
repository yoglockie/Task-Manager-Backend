import MongoDbHelper from "../db/mongoDbHelper.js";

const isExistingUser = async(email,password) =>{

    const db =  MongoDbHelper.getDatabase();
    const response = await db.collection("users").find({email}).toArray()
    return response
}

const createUser = async(user_data) =>{

    const db =  MongoDbHelper.getDatabase();
    const response = await db.collection("users").insertOne(user_data)
    return response
}

export default { isExistingUser,createUser };
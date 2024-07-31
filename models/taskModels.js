import { ObjectId } from "mongodb";
import MongoDbHelper from "../db/mongoDbHelper.js";

const searchEmployee = async(department,search_term) =>{

    const db =  MongoDbHelper.getDatabase();

    const response = await db.collection("users")
    .find({
        department : department,
        $or: [
            { email: { $regex: search_term, $options: "i" } },
            { full_name: { $regex: search_term, $options: "i" } }
          ]
    })
    .toArray()
    return response
}

const assignTask = async(payload) =>{

    const db =  MongoDbHelper.getDatabase();

    const response = await db.collection("tasks")
    .insertOne(payload)
    return response
}

const fetchTasks = async(user_id) =>{

    const db =  MongoDbHelper.getDatabase();

    const response = await db.collection("tasks")
    .find({
        "assigned_to._id":user_id
    })
    .toArray()
    return response
}

const fetchTasksManager = async(user_id) =>{

    const db =  MongoDbHelper.getDatabase();

    const response = await db.collection("tasks")
    .find({
        "assigned_by.user_id":user_id
    })
    .toArray()
    return response
}

const changeTaskStatus = async(status, task_id) =>{

    const db =  MongoDbHelper.getDatabase();

    const response = await db.collection("tasks")
    .updateOne({
        _id : new ObjectId(task_id)
    },
    {
        $set: { status: status }
    }
    )
    
    return response
}

export default { searchEmployee, assignTask, fetchTasks, changeTaskStatus, fetchTasksManager };
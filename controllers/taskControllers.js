import TaskModels from "../models/taskModels.js"


const searchEmployee = async(req,res)=>{
    const payload = req.body
    const role = payload?.role
    const department = payload?.department
    const search_term = payload?.search_term

    if(role != "Manager"){
        res.status(400).json({
            message : "Not Authorized to Assign Task"
        })
    }
    else{
        const response = await TaskModels.searchEmployee(department,search_term)
        res.status(200).json({
            result : response
        })
    }
}

const assignTask = async(req,res)=>{
    const payload = req.body
    if(payload.assigned_by.role != "Manager"){
        return res.status(400).json({
            message : "Not Authorized to Assign Task"
        })
    }
    payload.status = "Pending"
    payload.created_at = Date.now()
    payload.modified_at = Date.now()
    const response = await TaskModels.assignTask(payload)
    res.status(200).json({
        result : response
    })
   
}

const fetchTasks = async(req,res)=>{
    const payload = req.body
    if(!payload.user_id){
        return res.status(400).json({
            message : "Missing User Id"
        })
    }
    
    const response = await TaskModels.fetchTasks(payload.user_id)
    res.status(200).json({
        tasks : response
    })
   
}

const fetchTasksManager = async(req,res)=>{
    const payload = req.body
    if(!payload.user_id){
        return res.status(400).json({
            message : "Missing User Id"
        })
    }
    
    const response = await TaskModels.fetchTasksManager(payload.user_id)
    res.status(200).json({
        tasks : response
    })
   
}

const changeTaskStatus = async(req,res)=>{
    const payload = req.body
    const status = payload?.status
    const task_id = payload?.task_id
    if(!status || !task_id){
        return res.status(400).json({
            message : "Missing Task Id or Status"
        })
    }
    else if(!["Working","Pending","Completed"].includes(status)){
          return res.status(400).json({
            message : "Status should be among Working, Pending, Completed Only"
          })
    }
    
    const response = await TaskModels.changeTaskStatus(status, task_id)
    res.status(200).json({
        result : response
    })
   
}

export default { searchEmployee, assignTask, fetchTasks, changeTaskStatus, fetchTasksManager };
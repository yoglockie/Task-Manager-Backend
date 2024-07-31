import AuthModels from "../models/authModels.js"
import bcypt from "bcrypt"

const login = async(req,res)=>{
    const payload = req.body
    const email = payload?.email
    const password = payload?.password
    const isExistingUser = await AuthModels.isExistingUser(email)
    
    if(isExistingUser.length > 0){
        if(await bcypt.compare(password,isExistingUser[0].password)){
            res.status(200).json({
                message:"Valid User",
                user : isExistingUser[0]
            })
        }
        else{
            res.status(400).json({
                message : "Incorrect Password"
            })
        }
    }
    else{
        res.status(400).json({
            message : "User Does Not Exist"
        })
    }
}

const register = async(req,res)=>{
    
     const payload = req.body
     const full_name = payload?.full_name
     const email = payload?.email
     const password = payload?.password
     const department = payload?.department
     const role = payload?.role
      
     const isExistingUser = await AuthModels.isExistingUser(email)
     if(isExistingUser.length > 0 ){
        res.status(400).json({
           message : "User Already Exist"
        })
     }
     else{
           if(full_name && email && password && department && role){
              
            const hashed_password = await bcypt.hash(password,10)

            const user_data = {
                full_name,
                email,
                password:hashed_password,
                department,
                role
              }
              
              const response = await AuthModels.createUser(user_data);
              if(response){
                 res.status(200).json({
                    message : "User Created Successfully"
                 })
              }
              else{
                 res.status(500).json({
                    message : "Internal Server Error"
                 })
              }
           }
           else{
             res.status(400).json({
                message : "Incomplete Details"
             })
           }
     }


}

export default { login, register };
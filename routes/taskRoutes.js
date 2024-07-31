import express from "express"
import TaskController from "../controllers/taskControllers.js"

const router = express.Router({
    mergeParams: true
  })

router.post("/search/employee",TaskController.searchEmployee)
router.post("/assign",TaskController.assignTask)
router.post("/fetch",TaskController.fetchTasks)
router.post("/manager/fetch",TaskController.fetchTasksManager)
router.put("/change/status",TaskController.changeTaskStatus)

export default router;
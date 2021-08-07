import { Router } from 'express'
import RoomController from './controllers/RoomController'

const routes = Router()

routes.get('/rooms', RoomController.get)

export default routes

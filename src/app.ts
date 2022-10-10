import express, {Request, Response, NextFunction, Application, ErrorRequestHandler} from 'express'
import {Server} from 'http'
import createHttpError from 'http-errors'
import {config} from 'dotenv'

config()

const app = express()

app.get('/', (req: Request, res: Response, next: NextFunction): Response => {
    return res.status(200).json({message: 'Hello World!'})
  });

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound())
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        status: err.status || 500,
        message: err.message
    })
}

app.use(errorHandler)

const PORT: Number = Number(process.env.PORT) || 3000
const server: Server = app.listen(PORT, () => 
    console.log(`running on port ${PORT}`)
)

export default server;
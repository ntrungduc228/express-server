import { Response } from 'express'

export enum STATUS {
  success = 'success',
  failed = 'failed'
}

export const STATUS_CODE = {
  OK: 200,
  CREATED: 201
}

export const successReponse = (status: number = 200, data: any = {}, res: Response) => {
  return res.status(status).json({ data, status, message: STATUS.success })
}

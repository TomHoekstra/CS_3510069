
import * as express from 'express';
import ServiceResult from '../models/service-result.model';

export default class RouterUtils {
    public static createSuccessResponse<T>(model: T): ServiceResult<T> {
        let serviceResult = new ServiceResult<T>();
        serviceResult.success = true;
        serviceResult.model = model;
        return serviceResult;
    }

    public static createErrorResponse(message: string): ServiceResult<null> {
        let serviceResult = new ServiceResult<null>();
        serviceResult.success = false;
        serviceResult.msg = message;
        return serviceResult;
    }

    public static handleResponse<T>(res: express.Response, err, model: T): string {
        if (err) {
            return res.json(RouterUtils.createErrorResponse(err));
        }
        else {
            return res.json(RouterUtils.createSuccessResponse(model));
        }
    }

}
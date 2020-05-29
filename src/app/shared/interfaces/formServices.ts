import { WebService } from '../models/web-services';

export interface FormServices {
    list: WebService,
    search: WebService,
    get: WebService,
    create: WebService,
    update: WebService,
    delete: WebService
    archive: WebService,
    resources: WebService
}
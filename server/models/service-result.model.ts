//Response model
export default class ServiceResult<T> {
    public msg: string;    
    public success:boolean;
    public model:T
    
    constructor(){}
}
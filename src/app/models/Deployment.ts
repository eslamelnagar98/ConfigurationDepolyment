export interface IDeployment{
  
    deploymentID:Number,
    deploymentDate:Date,
    deploymentType:string,
    originalDeployment?:number,
    deployedBy:string,
    requestedBy:string,
    approvedBy:string
}


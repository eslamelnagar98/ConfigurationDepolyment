export interface IDeployment{
  
    deploymentID:Number,
    deploymentDate:Date,
    deploymentType:number,
    originalDeployment?:number,
    deployedBy:string,
    requestedBy:string,
    approvedBy:string
}


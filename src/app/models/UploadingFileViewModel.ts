import { IHubapplication } from "./hubapplication";

export interface UploadingFileViewModel{
        files: File[],
       HubsApplications:IHubapplication[],
        ApprovedBy :string,
        RequestedBy :string,
        DeployedBy :string
}
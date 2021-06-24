import { IApplication } from "./Application";

export interface IHubapplication {
    hubID: number,
    appID: number,
    assemblyPath?: string,
    backupPath?: string,
    ConfigFilepPath?: string,
    application?:IApplication
}

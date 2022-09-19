import IService from "./IService"

export default interface IProject{
    name: string,
    budget: number,
    category: {
        id: number,
        name: string
    }
    id: number,
    cost?: number,
    services?: Array<IService>
}

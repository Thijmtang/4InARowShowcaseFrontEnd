import axios, { AxiosInstance } from "axios";

export class GameApiService {
    readonly baseURL = "boeie";
    private client:AxiosInstance;
    // const client;
    /**
     *
     */
    constructor() {
        this.client = axios.create({
            baseURL: this.baseURL
        });
    }

    
}
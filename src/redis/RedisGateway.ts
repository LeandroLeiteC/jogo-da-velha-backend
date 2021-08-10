import redis from 'redis';
import { ErrorEnum } from '../enums/ErrorEnum';
import { promisify } from 'util';


class RedisGateway {
    public client: redis.RedisClient;
    private getAsync: any;
    
    constructor() {
        this.client = redis.createClient({
            host: process.env.REDIS_HOST,
            port: +process.env.REDIS_PORT,
            password: process.env.REDIS_PASSWORD
        });
        this.listen();
        this.getAsync = promisify(this.client.get).bind(this.client);
    }

    public set(key: string, value: string) {
        this.client.set(key, value, 'EX', 60 * 5);
    }

    public async get(key: string): Promise<string> {
        return this.getAsync(key)
            .then(response => { 
                return response;
            })
            .catch(() => {
                throw new Error(ErrorEnum.ROOM_NOT_FOUND);
            });
    }

    public delete(key: string) {
        this.client.del(key);
    }

    private listen() {
        this.client.on('connect', () => console.log("Connected to redis"));
    }
}

export default new RedisGateway();
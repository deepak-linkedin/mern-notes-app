import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";

import dotenv from "dotenv";
dotenv.config();
// console.log(process.env.UPSTASH_REDIS_REST_URL);
// console.log(process.env.UPSTASH_REDIS_REST_TOKEN);

// create a ratelimiter that allows 100 request in 60 seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100,"60 s")
});

export default ratelimit;
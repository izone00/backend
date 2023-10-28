// import { Module } from '@nestjs/common';
// import Redis from 'ioredis';

// @Module({
//   providers: [
//     {
//       provide: 'REDIS_CLIENT',
//       useValue: new Redis({
//         host: 'localhost',
//         port: 6379,
//       }),
//     },
//     // {
//     //   provide: 'SESSION',
//     //   useFactory: (redis) => {
//     //     const RedisStore = connectRedis(session);
//     //     return new RedisStore({ client: redis });
//     //   },
//     //   inject: ['REDIS_CLIENT'],
//     // },
//   ],
//   exports: ['REDIS_CLIENT'],
// })
// export class RedisModule {}

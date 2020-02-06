import { Between } from 'typeorm';
import { GetNearybyDriversResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import User from '../../../entities/User';
import privateResolver from '../../../utils/privateResolver';

const resolvers: Resolvers = {
  Query: {
    GetNearybyDrivers: privateResolver(
      async (_, __, { req }): Promise<GetNearybyDriversResponse> => {
        const user: User = req.user;
        const { lastLat, lastLng } = user;
        try {
          const drivers: any = await User.find({
            isDriving: true,
            lastLat: Between(lastLat - 0.05, lastLat + 0.05),
            lastLng: Between(lastLng - 0.05, lastLng + 0.05),
          });

          return {
            ok: true,
            error: null,
            drivers,
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            drivers: null,
          };
        }
      },
    ),
  },
};

export default resolvers;

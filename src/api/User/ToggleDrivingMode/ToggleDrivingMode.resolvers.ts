import { Resolvers } from '../../../types/resolvers';
import { ToggleDrivingModeResponse } from '../../../types/graph';
import User from '../../../entities/User';
import privateResolver from '../../../utils/privateResolver';

const resolvers: Resolvers = {
  Mutation: {
    ToggleDrivingMode: privateResolver(
      async (_, __, { req }): Promise<ToggleDrivingModeResponse> => {
        const user: User = req.user;

        user.isDriving = !user.isDriving;
        user.save();

        return {
          ok: true,
          error: null,
        };
      },
    ),
  },
};

export default resolvers;

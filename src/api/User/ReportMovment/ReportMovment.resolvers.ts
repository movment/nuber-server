import {
  ReportMovmentMutationArgs,
  ReportMovmentResponse,
} from '../../../types/graph';

import { Resolvers } from '../../../types/resolvers';
import User from '../../../entities/User';
import cleanNullArgs from '../../../utils/cleanNullArgs';
import privateResolver from '../../../utils/privateResolver';

const resolvers: Resolvers = {
  Mutation: {
    ReportMovment: privateResolver(
      async (
        _,
        args: ReportMovmentMutationArgs,
        { req, pubSub },
      ): Promise<ReportMovmentResponse> => {
        const user: User = req.user;
        const notNull = cleanNullArgs(args);

        try {
          await User.update({ id: user.id }, { ...notNull });
          const updatedUser = await User.findOne({ id: user.id });
          pubSub.publish('driverUpdate', { DriversSubscription: updatedUser });
          return {
            ok: true,
            error: null,
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
          };
        }
      },
    ),
  },
};

export default resolvers;

import db from '../../dbConnection';

const usersAreTeammates = async (
  userId: string,
  teammateIds: Array<string>
) => {
  const userTeam = await db('user_team')
    .select()
    .where((x) => {
      x.where('from_user_id', '=', userId).whereIn('to_user_id', teammateIds);
    })
    .orWhere((x) => {
      x.where('to_user_id', '=', userId).whereIn('from_user_id', teammateIds);
    })
    .andWhere({
      pending: false
    })
    .first();

  return Boolean(userTeam);
};

export default usersAreTeammates;

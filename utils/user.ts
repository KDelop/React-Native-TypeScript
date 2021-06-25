export interface IParticipant {
  firstName: string;
  lastName: string;
  id: number;
}

export const joinParticipantNames = (participants: IParticipant[]) =>
  participants.map(x => `${x.firstName} ${x.lastName}`).join(', ');


export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BasicUser = {
  __typename?: 'BasicUser';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['String']>;
  lastLoginAt?: Maybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  id?: Maybe<Scalars['ID']>;
  body?: Maybe<Scalars['String']>;
  sentByUserId?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['String']>;
};

export type MessagePage = {
  __typename?: 'MessagePage';
  nextOffset?: Maybe<Scalars['Int']>;
  messages?: Maybe<Array<Maybe<Message>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  inviteToTeam?: Maybe<User>;
  updateTeamInvite?: Maybe<User>;
  impressRoom?: Maybe<Room>;
  createRoom?: Maybe<Room>;
  sendMessage?: Maybe<Message>;
};


export type MutationInviteToTeamArgs = {
  toUserId: Scalars['ID'];
};


export type MutationUpdateTeamInviteArgs = {
  fromUserId: Scalars['ID'];
  accepted: Scalars['Boolean'];
};


export type MutationImpressRoomArgs = {
  roomId: Scalars['ID'];
  impressionAt?: Maybe<Scalars['String']>;
};


export type MutationCreateRoomArgs = {
  participants?: Maybe<Array<Scalars['ID']>>;
  firstMessageBody: Scalars['String'];
};


export type MutationSendMessageArgs = {
  roomId: Scalars['ID'];
  body: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allUsers?: Maybe<UserPage>;
  allTeammates?: Maybe<UserPage>;
  allRooms?: Maybe<RoomPage>;
  allMessages?: Maybe<MessagePage>;
  user?: Maybe<BasicUser>;
  room?: Maybe<Room>;
  roomByParticipants?: Maybe<Room>;
  currentUser?: Maybe<BasicUser>;
};


export type QueryAllUsersArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAllTeammatesArgs = {
  pending?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAllRoomsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAllMessagesArgs = {
  roomId: Scalars['ID'];
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  userId: Scalars['ID'];
};


export type QueryRoomArgs = {
  roomId: Scalars['ID'];
};


export type QueryRoomByParticipantsArgs = {
  participants?: Maybe<Array<Scalars['ID']>>;
};

export type Room = {
  __typename?: 'Room';
  id?: Maybe<Scalars['ID']>;
  participants?: Maybe<Array<Maybe<BasicUser>>>;
  lastMessage?: Maybe<Message>;
  lastImpressionAt?: Maybe<Scalars['String']>;
};

export type RoomPage = {
  __typename?: 'RoomPage';
  nextOffset?: Maybe<Scalars['Int']>;
  rooms?: Maybe<Array<Maybe<Room>>>;
};

export enum TeammateStatus {
  RequestSent = 'REQUEST_SENT',
  RequestReceived = 'REQUEST_RECEIVED',
  Teammates = 'TEAMMATES',
  None = 'NONE'
}

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['String']>;
  lastLoginAt?: Maybe<Scalars['String']>;
  teammateStatus?: Maybe<TeammateStatus>;
};

export type UserPage = {
  __typename?: 'UserPage';
  nextOffset?: Maybe<Scalars['Int']>;
  users?: Maybe<Array<Maybe<User>>>;
};

import {GestureResponderEvent} from 'react-native';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {ObservableQuery} from '@apollo/client';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  state: string;
  country: string;
  createdAt: Date;
  lastLoginAt: Date;
  isPro?: boolean;
}

// TODO: Dedupe
export type ScheduleEventTypes = 'STREAM' | 'GROUP_CALL';

export interface IScheduleItem {
  id: string;
  startAt: string;
  title: string;
  description: string;
  type: ScheduleEventTypes;
  attendees: Array<IGenericParticipant>;
  initiatedBy: IUser;
  isInitiator: boolean;
}

export interface IMessage {
  id: string;
  sentBy: IGenericParticipant;
  sentAt: string;
  text: string;
}

export interface IStream {
  id: string;
  startAt: string;
  title: string;
  description: string;
  initiatedBy: IUser;
  isInitiator: boolean;
}

export interface IChat {
  id: string;
  lastMessage: {
    id: string;
    text: string;
    sentAt: string;
    sentBy: {
      id: string;
      firstName: string;
      lastName: string;
    };
  };
  members: Array<{
    id: string;
    firstName: string;
    lastName: string;
  }>;
  hasUnreadMessages: boolean;
  createdAt: string;
}

export interface IChatRoom {
  createdAt: Date;
  lastMessage: {
    id: string;
    sentAt: FirebaseFirestoreTypes.Timestamp;
    sentBy: string;
    text: string;
  };
  roomSize: number;
  messageCount?: number;
  memberIds: {
    [key: string]: boolean;
  };
  members: {
    [key: string]: {
      firstName: string;
      lastName: string;
      lastSeenMessage?: string;
    };
  };
}

export interface INewChatMetadata {
  [memberId: string]: {
    firstName: string;
    lastName: string;
  };
}

export type RootStackParamList = {
  Dashboard: undefined;
  SignIn: {
    resetPassword: boolean;
  };
  SignUp: undefined;
  Welcome: undefined;
  Loading: undefined;
  Explore: undefined;
  ChatList: undefined;
  NewChat: undefined;
  NewGroupCall: undefined;
  NewScheduleItem: undefined;
  LoggedIn: undefined;
  Settings: undefined;
  ResetPassword: undefined;
  Chat: {
    chatId?: string;
    members?: INewChatMetadata;
  };
  Profile: {userId: string};
  GroupCall: {participants?: INewChatMetadata; channelId: string};
  Stream: {streamId: string; isHost?: boolean};
  StreamList: undefined;
  Schedule: undefined;
};

export interface IGenericParticipant {
  id: string;
  firstName: string;
  lastName: string;
  isPro?: boolean;
}

export type ModalManagerParamList = {
  Profile: {
    userId: string;
    beforeNavigate?(e: GestureResponderEvent): void | Promise<void>;
  };
  UserMultiSelect: {
    defaultSelectedUsers?: Array<IUser>;
    onChange?(selection: Array<IUser>): void;
  };
  Calendar: {
    onDateChange?(date: Date): void;
  };
  Connect: undefined;
};

export interface ICreateAccountArgs {
  email: string;
  password: string;
  city: string;
  country: string;
  fullName: string;
  state: string;
  isPro: boolean;
}

export type RefetchFunction = ObservableQuery['refetch'];

export type Data<T> =
  | {
      status: 'loading';
      data: null;
      refetch?: RefetchFunction;
    }
  | {
      status: 'success';
      data: T;
      refetch?: RefetchFunction;
    }
  | {
      status: 'error';
      data: Error;
      refetch?: RefetchFunction;
    };

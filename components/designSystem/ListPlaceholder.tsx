import * as React from 'react';
import {DotIndicator} from 'react-native-indicators';

import Padded from './Padded';
import Typography from './Typography';
import {ellipsisText} from '../textUtil';
import {LIGHT_GREY} from '../colors';

const ListPlaceholderContainer: React.FunctionComponent = ({children}) => {
  return <Padded size={{left: 5, right: 5, top: 3}}>{children}</Padded>;
};

const NoSearchResults: React.FunctionComponent<{searchTerm: string}> = ({
  searchTerm,
}) => {
  return (
    <ListPlaceholderContainer>
      <Typography variant="listPlaceholderText">
        Couldn't find anything for "{ellipsisText(15, searchTerm)}"
      </Typography>
    </ListPlaceholderContainer>
  );
};

const NoData: React.FunctionComponent = ({children}) => {
  return (
    <ListPlaceholderContainer>
      <Typography variant="listPlaceholderText">{children}</Typography>
    </ListPlaceholderContainer>
  );
};

const NoScheduledItems = () => {
  return (
    <ListPlaceholderContainer>
      <Typography variant="listPlaceholderText">
        Nothing is scheduled for today.
      </Typography>
    </ListPlaceholderContainer>
  );
};

const EmptyChat = () => {
  return (
    <ListPlaceholderContainer>
      <Typography variant="listPlaceholderText">
        Introduce yourself! 👋
      </Typography>
    </ListPlaceholderContainer>
  );
};

export const Loading = () => {
  return (
    <Padded size={{top: 10}}>
      <DotIndicator size={4} color={LIGHT_GREY} />
    </Padded>
  );
};

export default {
  NoSearchResults,
  NoData,
  NoScheduledItems,
  EmptyChat,
  Loading,
};

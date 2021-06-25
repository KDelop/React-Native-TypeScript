import * as React from 'react';

import GenericUserListView from './GenericUserListView';
import useChatNavigation from '../hooks/useChatNavigation';

const NewChatView = () => {
  const navigateToChat = useChatNavigation();

  return (
    <GenericUserListView
      title="New Chat"
      onUserClick={(user) => navigateToChat(user)}
    />
  );
};

export default NewChatView;

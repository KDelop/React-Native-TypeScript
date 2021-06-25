import * as React from 'react';

import GenericUserListView from './GenericUserListView';
import useGroupCallNavigation from '../hooks/useGroupCallNavigation';

const NewGroupCallView = () => {
  const navigateToGroupCall = useGroupCallNavigation();

  return (
    <GenericUserListView
      title="Video"
      onUserClick={(user) =>
        navigateToGroupCall([
          {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        ])
      }
    />
  );
};

export default NewGroupCallView;

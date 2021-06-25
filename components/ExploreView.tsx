import * as React from 'react';

import {useModal} from '../hooks/useModal';
import GenericUserListView from './GenericUserListView';

const ExploreView = () => {
  const openModal = useModal();

  return (
    <GenericUserListView
      title="Explore"
      showBackButton={false}
      onUserClick={(user) => openModal('Profile', {userId: user.id})}
    />
  );
};

export default ExploreView;

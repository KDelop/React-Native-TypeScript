import * as React from 'react';

import ListViewHeader from './designSystem/ListViewHeader';
import UserList, {IProps as IUserListProps} from './UserList';

interface IProps {
  title: string;
  onUserClick: IUserListProps['onUserClick'];
  showBackButton?: boolean;
}

const GenericUserListView: React.FunctionComponent<IProps> = ({
  title,
  onUserClick,
  showBackButton,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <>
      <ListViewHeader
        showBackButton={showBackButton}
        title={title}
        searchInputProps={{onChangeText: setSearchTerm}}
      />
      <UserList searchTerm={searchTerm} onUserClick={onUserClick} />
    </>
  );
};

export default GenericUserListView;

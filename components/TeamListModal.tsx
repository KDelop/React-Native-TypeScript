import * as React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from 'react-navigation-hooks';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import SlideUpModal from './SlideUpModal';
import { BRAND_BLUE, LIGHT_GREY, MEDIUM_GREY } from '../constants/colors';
import useTeam from '../hooks/useTeam';
import RoundedInput from './RoundedInput';
import ListItem from './ListItem';
import UserAvatar from './UserAvatar';
import useCurrentUser from '../hooks/useCurrentUser';

interface IProps {
  open: boolean;
  onRequestClose?(): void;
  onAnimationEnd?(): void;
  onTeamMemberClick?(userId: string): void;
}

const filterByName = (searchTerm: string) => (x: any) => {
  const lowerSearchTerm = searchTerm.toLowerCase();
  return x?.name?.toLowerCase()?.includes(lowerSearchTerm);
};

const TeamListModal: React.SFC<IProps> = ({
  open,
  onRequestClose,
  onTeamMemberClick,
  onAnimationEnd
}) => {
  const { navigate } = useNavigation();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [error, loading, team] = useTeam();

  return (
    <SlideUpModal
      open={open}
      cardProps={{ style: styles.card, borderRadiusSize: 'large' }}
      onRequestClose={onRequestClose}
      onAnimationEnd={onAnimationEnd}
    >
      <View style={styles.root}>
        <Text style={styles.heading}>Team</Text>
        <RoundedInput
          leftAdornment={
            <FeatherIcon name="search" size={18} color={LIGHT_GREY} />
          }
          onChangeText={setSearchTerm}
          value={searchTerm}
        />
        <FlatList
          keyExtractor={x => x?.id ?? ''}
          contentContainerStyle={styles.listContainer}
          data={team?.filter(filterByName(searchTerm)) ?? []}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => {
                if (item?.id && onTeamMemberClick) {
                  onTeamMemberClick(item?.id);
                  onRequestClose && onRequestClose();
                }
              }}
              leftAdornment={
                <UserAvatar userId={item?.id} loading={loading} size="medium" />
              }
              content={
                <>
                  <Text style={styles.listItemTitle}>{item?.name}</Text>
                  <Text style={styles.listItemSecondaryText}>DPT, CSCS</Text>
                  <Text style={styles.listItemSecondaryText}>Boston, MA</Text>
                </>
              }
            />
          )}
        />
      </View>
    </SlideUpModal>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingTop: 30,
    paddingBottom: 40,
    paddingLeft: '5%',
    paddingRight: '5%'
  },
  root: {
    height: '90%'
  },
  heading: {
    fontFamily: 'Montserrat',
    fontSize: 28,
    fontWeight: '800',
    color: BRAND_BLUE,
    fontStyle: 'italic',
    textTransform: 'uppercase',
    marginBottom: 12
  },
  listContainer: {
    paddingTop: 12
  },
  listItemSecondaryText: {
    fontFamily: 'Montserrat',
    color: MEDIUM_GREY,
    fontSize: 12,
    paddingTop: 2
  },
  listItemTitle: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: '700'
  }
});

export default TeamListModal;

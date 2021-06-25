import * as React from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface IContext {
  initializing: boolean;
  user: FirebaseAuthTypes.User | null;
}

export const UserContext = React.createContext<IContext>({
  initializing: true,
  user: null,
});

const UserProvider: React.FunctionComponent = ({children}) => {
  const [user, setUser] = React.useState<IContext['user']>(null);
  const [initializing, setInitiailizing] = React.useState(true);

  const onAuthStateChanged: FirebaseAuthTypes.AuthListenerCallback = (user) => {
    if (user) {
      firestore().collection('users').doc(user.uid).update({
        lastLoginAt: new Date(),
      });
    }
    setUser(user);
    if (initializing) setInitiailizing(false);
  };

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <UserContext.Provider value={{initializing, user}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

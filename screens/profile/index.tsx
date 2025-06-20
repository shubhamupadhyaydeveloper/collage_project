import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from 'components/Button';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackNavigationType } from 'utils/types';
import { account } from 'utils/appwrite';
import { resetAndNavigate } from 'utils/navigation';
import { Models } from 'appwrite';

const ProfilePage = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackNavigationType>>();
  const [accountDetail, setAccountDetail] = useState<Models.User<Models.Preferences> | null>(null);

  useEffect(() => {
    (async () => {
      const user = await account.get();
      setAccountDetail(user);
    })();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.profileContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {accountDetail?.name ? accountDetail.name.charAt(0).toUpperCase() : 'U'}
          </Text>
        </View>

        <Text style={styles.name}>{accountDetail?.name}</Text>
        <Text style={styles.email}>{accountDetail?.email}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Logout"
          onPress={async () => {
            await account.deleteSession('current');
            resetAndNavigate('Auth');
          }}
        />
      </View>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6C47FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    color: 'white',
    fontWeight: '600',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#B0B0B0',
  },
  buttonContainer: {
    flex : 1,
    justifyContent : 'flex-end',
  },
});

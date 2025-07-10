import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from 'components/Button';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ProfileNavigationType, RootStackNavigationType } from 'utils/types';
import { account } from 'utils/appwrite';
import { resetAndNavigate } from 'utils/navigation';
import { Models } from 'appwrite';
import { toast } from 'burnt';
import FeatherIcon from 'react-native-vector-icons/Feather'
import * as WebBrowser from 'expo-web-browser';

type BoxProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  onPress: () => void;
};

const ProfilePage = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<ProfileNavigationType,'ProfileHome'>>();
  const [accountDetail, setAccountDetail] = useState<Models.User<Models.Preferences> | null>(null);

  const openEmail = () => {
    const email = 'shubhamwork48@gmail.com'
    const subject = 'Hello shubham'
    const body = 'I wanted to get in touch with you'

    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(url).catch(err => {
      console.warn('could not open email client', err)
    })
  }

  const openBrowser = async () => {
    await WebBrowser.openBrowserAsync('https://www.freeprivacypolicy.com/live/4c05e92a-b3ec-47e9-8e68-58855a2b0f23');
  };

  const InfoBox = ({ icon, title, description, onPress }: BoxProps) => {
    return (
      <TouchableOpacity style={styles.boxcontainer} onPress={onPress} activeOpacity={0.8}>
        <View style={styles.leftIcon}>
          {icon}
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <FeatherIcon name="chevron-right" size={22} color="#aaa" />
      </TouchableOpacity>
    );
  };

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
            {accountDetail?.name ? accountDetail.name.charAt(0).toUpperCase() : 'N/N'}
          </Text>
        </View>

        <View style={{
          justifyContent: 'center', alignContent: 'center', marginBottom: 20
        }}>
          <Text style={[styles.name, { textAlign: 'center' }]}>{accountDetail?.name ?? "No Name"}</Text>
          <Text style={styles.email}>{accountDetail?.email}</Text>
        </View>

        <InfoBox
          description='shubhamwork48@gmail.com'
          icon={<FeatherIcon name="mail" size={22} color="#fff" />}
          onPress={openEmail}
          title='Contact Support'
        />

        <InfoBox
          description='Read our terms and privacy policy'
          icon={<FeatherIcon name="file" size={22} color="#fff" />}
          onPress={openBrowser}
          title='Terms & privacy Policy'
        />

        <InfoBox
          description='shubham upadhyay '
          icon={<FeatherIcon name="linkedin" size={22} color="#fff" />}
          onPress={() => {
            Linking.openURL('https://www.linkedin.com/in/shubhamupadhyaydeveloper/')
          }}
          title='Connect on Linkedin'
        />

        <InfoBox
          description='change Password'
          icon={<FeatherIcon name="lock" size={22} color="#fff" />}
          onPress={() => { 
             navigation.navigate('ForgetPassword')
          }}
          title='Change Password'

        />

      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Logout"
          onPress={async () => {
            await account.deleteSession('current');
            resetAndNavigate('Auth');
            toast({
              title: 'Login out',
              message: 'Successfully logged out',
              preset: 'done',

            });
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
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  boxcontainer: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  leftIcon: {
    marginRight: 14,
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    color: '#999999',
    fontSize: 13,
    marginTop: 2,
  },
});

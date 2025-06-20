import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
// import { AuthContext } from 'context/AuthProvider'; // If using context for logout

const DrawerContent = (props: DrawerContentComponentProps) => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // context.logout(); OR clear token/session
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Auth' }],
    // });
  };

  return (
    <DrawerContentScrollView contentContainerStyle={styles.container} {...props}>
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://ui-avatars.com/api/?name=Shubham+Upadhyay&background=6C47FF&color=fff',
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Shubham Upadhyay</Text>
        <Text style={styles.email}>shubham@example.com</Text>
      </View>

      <View style={styles.links}>
        <DrawerLink label="Profile" onPress={() => {}} />
        <DrawerLink label="Saved History" onPress={() => {}} />
        <DrawerLink label="Meet Developers" onPress={() => {}} />
      </View>

      <View style={styles.footer}>
        <DrawerLink label="Logout" onPress={handleLogout} danger />
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerLink = ({
  label,
  onPress,
  danger = false,
}: {
  label: string;
  onPress: () => void;
  danger?: boolean;
}) => (
  <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={[styles.link, danger && styles.dangerLink]}>
    <Text style={[styles.linkText, danger && styles.dangerText]}>{label}</Text>
  </TouchableOpacity>
);

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6C47FF',
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  email: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 2,
  },
  links: {
    flex: 1,
  },
  link: {
    backgroundColor: '#1A241F',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginBottom: 12,
  },
  linkText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 20,
  },
  dangerLink: {
    backgroundColor: '#DE3163',
  },
  dangerText: {
    color: '#fff',
  },
});

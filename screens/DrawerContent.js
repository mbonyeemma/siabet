import React from 'react';
import {View, StyleSheet, Linking, Share,Text} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Drawer,
  Divider,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import {AuthContext} from '../components/context';
import {Link} from '@react-navigation/native';
export function DrawerContent (props) {
  const paperTheme = useTheme ();

  
  const {signOut, toggleTheme, isValidator, userData} = React.useContext (
    AuthContext
  );
  const ShareItem = async () => {
    try {
        const result = await Share.share({
            title: 'invite player',
            message: "Hello, you are invited to download the siabet app and join the prediction game, download here https://play.google.com/store/apps/details?id=com.siabet. Use my as the referer. username: "+userData.username
        });

        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
        alert(error.message);
    }
};



  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                style={{backgroundColor: 'gray'}}
                source={{
                  uri: userData.avatar,
                }}
                size={50}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>{userData.username}</Title>
                <Caption style={styles.caption}>@{userData.username}</Caption>
              </View>
            </View>

          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate ('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate ('Profile');
              }}
            />
            {isValidator
              ? <DrawerItem
                  icon={({color, size}) => (
                    <Icon
                      name="square-edit-outline"
                      color={color}
                      size={size}
                    />
                  )}
                  label="Update Games"
                  onPress={() => {
                    props.navigation.navigate ('TopicsApproval');
                  }}
                />
              : <View />}
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="share-variant" color={color} size={size} />
              )}
              label="Share"
              onPress={ShareItem}
            />
          </Drawer.Section>

        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            margin: 16,
          }}
        >
          <Entypo
            onPress={() => Linking.openURL ('https://twitter.com/SIABET5')}
            name="twitter-with-circle"
            size={26}
          />
          <Icon
            onPress={() =>
              Linking.openURL ('https://discord.com/invite/AtxmT2WJxT')}
            name="discord"
            size={26}
          />
          <Icon
            onPress={() => Linking.openURL ('https://siabet.org')}
            name="web"
            size={26}
          />

        </View>
        <Divider />

        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            signOut ();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create ({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

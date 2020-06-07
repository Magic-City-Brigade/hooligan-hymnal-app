import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import { Layout } from '../constants';
import { Palette, Settings, Skin } from '../../config';
import i18n from '../i18n';


const CustomDrawer = props => {
  // we want to hide certain routes from showing up in the drawer, because they are accessed through custom buttons
  const hideRoutes = ["About", "Admin", "YellowCard", "RedCard"];
  const filteredProps = {
    ...props,
    state: {
      ...props.state,
      routeNames: props.state.routeNames.filter(routeName => !hideRoutes.includes(routeName)),
      routes: props.state.routes.filter(route => !hideRoutes.includes(route.name))
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.drawerHeader}>
        <Image
          source={Skin.Drawer_HeroBackground}
          style={styles.backgroundImage}
        />
        <View style={[StyleSheet.absoluteFill, styles.imageOverlay]} />
        <View style={[StyleSheet.absoluteFill, styles.logoContainer]}>
          <Image
            source={Skin.Drawer_HeroOverlay}
            style={styles.logoImage}
          />
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <DrawerItemList
          {...filteredProps}
          activeBackgroundColor="rgba(255,255,255,0.1)"
          activeTintColor='white' inactiveTintColor='white'
          labelStyle={{ color: 'white', textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection(), fontFamily: Skin.NavigationDrawer_FontFamily }}
          onItemPress={({ route, focused }) => {
            if (route.routeName === 'CapoHome') {
              if (props.globalData.state.currentUser) {
                props.navigation.navigate('CapoHome');
              } else {
                props.navigation.navigate('CapoLogin');
              }
            } else {
              props.onItemPress({ route });
            }
          }}
        />
      </ScrollView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={() => { props.navigation.navigate("About") }}>
          <Ionicons name={"md-information-circle"} size={30} color={'white'} style={{ marginRight: 10 }} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log(props.state.routeNames)
            if (props.globalData.state.currentUser)
              props.navigation.navigate('CapoHome');
            else
              props.navigation.navigate('Admin');
          }}>
          <Ionicons name={props.globalData.state.currentUser ? "md-construct" : "md-log-in"} size={30} color={'white'} style={{ marginRight: 10 }} />
        </TouchableOpacity>
        {Settings.RefereeCards_Show &&
          <View style={styles.cardContainer}>
            <TouchableOpacity
              onPress={() => { props.navigation.navigate("YellowCard") }}>
              <View style={[styles.card, { backgroundColor: Palette.YellowCard }]}></View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { props.navigation.navigate("RedCard") }}>
              <View style={[styles.card, { backgroundColor: Palette.RedCard }]}></View>
            </TouchableOpacity>
          </View>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: 140 + Layout.notchHeight,
    width: '100%',
    resizeMode: 'cover'
  },
  bottomContainer: {
    flexDirection: i18n.getFlexDirection(),
    borderTopColor: '#222',
    borderTopWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center"
  },
  card: {
    margin: 5,
    width: 20,
    height: 30,
    borderRadius: 5
  },
  cardContainer: {
    flex: 1,
    flexDirection: i18n.getFlexDirection(),
    justifyContent: "flex-end",
  },
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  imageOverlay: {
    backgroundColor: 'rgba(3, 46, 85, 0.57)'
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Layout.notchHeight + 20
  },
  logoImage: {
    width: 200,
    height: 50,
    resizeMode: 'contain'
  }
});

export default withUnstated(CustomDrawer, { globalData: GlobalDataContainer });

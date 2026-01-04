import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    paddingBottom: 15,
    paddingLeft: 15,
    flexDirection: 'row',
  },
  tab: {
    marginRight: 20,
  },
});

const AppBarTab = ({ children, to }) => {
  return (
    <Link to={to} component={Pressable}>
      <Text
        color="textSecondary"
        fontSize="heading"
        fontWeight="bold"
        style={styles.tab}
      >
        {children}
      </Text>
    </Link>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to="/">Repositories</AppBarTab>
        <AppBarTab to="/signin">Sign in</AppBarTab>
      </ScrollView>
    </View>
  );
};

export default AppBar;

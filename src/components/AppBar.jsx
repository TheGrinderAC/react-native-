import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';
import theme from '../theme';
import Text from './Text';
import { GET_ME } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';

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

const AppBarTab = ({ children, to, onPress }) => {
  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        <Text
          color="textSecondary"
          fontSize="heading"
          fontWeight="bold"
          style={styles.tab}
        >
          {children}
        </Text>
      </Pressable>
    );
  }

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
  const { data } = useQuery(GET_ME);
  const signOut = useSignOut();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to="/">Repositories</AppBarTab>
        {data?.me ? (
          <AppBarTab onPress={handleSignOut}>Sign out</AppBarTab>
        ) : (
          <AppBarTab to="/signin">Sign in</AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;

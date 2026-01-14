import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderItem = ({ item }) => {
    const { onItemPress } = this.props;

    return (
      <Pressable onPress={() => onItemPress?.(item.id)}>
        <RepositoryItem item={item} />
      </Pressable>
    );
  };

  render() {
    const { repositories, onEndReach, ListHeaderComponent } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={this.renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeaderComponent}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

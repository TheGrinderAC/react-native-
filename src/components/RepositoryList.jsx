import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';
import useRepositories from '../hooks/useRepositories';
import { RepositoryListContainer } from './RepositoryListContainer';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff',
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  picker: {
    height: 50,
  },
});

const RepositoryListHeader = React.memo(({
  searchKeyword,
  setSearchKeyword,
  sortValue,
  onSortChange,
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search repositories..."
          value={searchKeyword}
          onChangeText={setSearchKeyword}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={sortValue}
          onValueChange={onSortChange}
          style={styles.picker}
        >
          <Picker.Item label="Latest repositories" value="latest" />
          <Picker.Item label="Highest rated repositories" value="highest" />
          <Picker.Item label="Lowest rated repositories" value="lowest" />
        </Picker>
      </View>
    </View>
  );
});

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const navigate = useNavigate();

  const { repositories, fetchMore } = useRepositories({
    first: 8,
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchKeyword,
  });

  const handlePress = useCallback((id) => {
    navigate(`/repositories/${id}`);
  }, [navigate]);

  const handleSortChange = useCallback((value) => {
    switch (value) {
      case 'latest':
        setOrderBy('CREATED_AT');
        setOrderDirection('DESC');
        break;
      case 'highest':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('DESC');
        break;
      case 'lowest':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('ASC');
        break;
      default:
        setOrderBy('CREATED_AT');
        setOrderDirection('DESC');
    }
  }, []);

  const getSortValue = useCallback(() => {
    if (orderBy === 'CREATED_AT' && orderDirection === 'DESC') return 'latest';
    if (orderBy === 'RATING_AVERAGE' && orderDirection === 'DESC')
      return 'highest';
    if (orderBy === 'RATING_AVERAGE' && orderDirection === 'ASC')
      return 'lowest';
    return 'latest';
  }, [orderBy, orderDirection]);

  const onEndReach = useCallback(() => {
    fetchMore();
  }, [fetchMore]);

  const ListHeaderComponent = useMemo(() => (
    <RepositoryListHeader
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      sortValue={getSortValue()}
      onSortChange={handleSortChange}
    />
  ), [searchKeyword, getSortValue, handleSortChange]);

  return (
    <RepositoryListContainer
      repositories={repositories}
      onItemPress={handlePress}
      onEndReach={onEndReach}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

export default RepositoryList;

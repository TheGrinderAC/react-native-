import React from 'react';
import { render, screen, within } from '@testing-library/react-native';
import { RepositoryListContainer } from '../components/RepositoryListContainer';

describe('RepositoryListContainer', () => {
  it('renders repository information correctly', () => {
    const repositories = {
      totalCount: 8,
      pageInfo: {
        hasNextPage: true,
        endCursor: 'end',
        startCursor: 'start',
      },
      edges: [
        {
          node: {
            id: 'jaredpalmer.formik',
            fullName: 'jaredpalmer/formik',
            description: 'Build forms in React, without the tears',
            language: 'TypeScript',
            forksCount: 1619,
            stargazersCount: 21856,
            ratingAverage: 88,
            reviewCount: 3,
            ownerAvatarUrl: 'https://example.com/avatar1.png',
          },
        },
        {
          node: {
            id: 'async-library.react-async',
            fullName: 'async-library/react-async',
            description: 'Flexible promise-based React data loader',
            language: 'JavaScript',
            forksCount: 69,
            stargazersCount: 1760,
            ratingAverage: 72,
            reviewCount: 3,
            ownerAvatarUrl: 'https://example.com/avatar2.png',
          },
        },
      ],
    };

    render(<RepositoryListContainer repositories={repositories} />);

    const items = screen.getAllByTestId('repositoryItem');

    expect(items).toHaveLength(2);

    // FIRST REPO
    const first = within(items[0]);
    expect(first.getByText('jaredpalmer/formik')).toBeDefined();
    expect(
      first.getByText('Build forms in React, without the tears')
    ).toBeDefined();
    expect(first.getByText('TypeScript')).toBeDefined();
    expect(first.getByText('21.9k')).toBeDefined(); // stars
    expect(first.getByText('1.6k')).toBeDefined(); // forks
    expect(first.getByText('3')).toBeDefined(); // reviews
    expect(first.getByText('88')).toBeDefined(); // rating

    // SECOND REPO
    const second = within(items[1]);
    expect(second.getByText('async-library/react-async')).toBeDefined();
    expect(
      second.getByText('Flexible promise-based React data loader')
    ).toBeDefined();
    expect(second.getByText('JavaScript')).toBeDefined();
    expect(second.getByText('1.8k')).toBeDefined(); // stars
    expect(second.getByText('69')).toBeDefined(); // forks
    expect(second.getByText('3')).toBeDefined();
    expect(second.getByText('72')).toBeDefined();
  });
});

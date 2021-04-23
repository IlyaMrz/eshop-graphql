import React from 'react';
import { gql, useQuery } from '@apollo/client';

import CollectionPreview from '../collection-preview/collection-preview.component';
import Spinner from '../spinner/spinner.component';

import './collections-overview.styles.scss';

const GET_COLLECTIONS = gql`
    {
        collections {
            id
            title
            items {
                id
                name
                price
                imageUrl
            }
        }
    }
`

const CollectionsOverview = () => {
  const { loading, data } = useQuery(GET_COLLECTIONS);
  if (loading) return <Spinner />
  return (
    <div className='collections-overview'>
      {data.collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
)};



export default CollectionsOverview;

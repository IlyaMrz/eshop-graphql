import React from 'react';
import { gql, useQuery } from '@apollo/client';

import CollectionItem from '../../components/collection-item/collection-item.component';

import './collection.styles.scss';
import Spinner from '../../components/spinner/spinner.component';

const GET_COLLECTION_BY_TITLE = gql`
query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title){
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

const CollectionPage = ({match}) => {
  const { loading, data } = useQuery(GET_COLLECTION_BY_TITLE,
    {variables:{title: match.params.collectionId}});

  if (loading) return <Spinner />
  // console.log("collectinopage data", data)
  const { items, title } = data.getCollectionsByTitle;

  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};


export default CollectionPage;

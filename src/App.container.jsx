import React from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';

import App from './App';

const SET_CURRENT_USER = gql`
  mutation SetCurrentUser($user: User!) {
    setCurrentUser(user: $user) @client
  }
`;

const GET_CURRENT_USER = gql`
  {
    currentUser @client
  }
`;

const AppContainer = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);
  if (loading) return <p>Loading...</p>;
  return (<App  currentUser={data.currentUser}/>)

};

// const AppContainer = () => (
//   <Query query={GET_CURRENT_USER}>
//     {({ data: { currentUser } }) => (
//       <Mutation mutation={SET_CURRENT_USER}>
//         {setCurrentUser => (
//           <App
//             currentUser={currentUser}
//             setCurrentUser={user => {
//               setCurrentUser({ variables: { user } });
//             }}
//           />
//         )}
//       </Mutation>
//     )}
//   </Query>
// );

export default AppContainer;
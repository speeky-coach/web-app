import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Conversation from './Conversation';

const GET_CONVERSATIONS = gql`
  query {
    conversations {
      id
      userId
      filename
      transcription {
        paragraphs {
          words {
            value
          }
        }
      }
    }
  }
`;

interface GetConversationsResponse {
  conversations: Conversation[];
}

function Conversations() {
  const { loading, error, data } =
    useQuery<GetConversationsResponse>(GET_CONVERSATIONS);
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <div>Conversations</div>
      {data &&
        data.conversations.map((conversation) => (
          <div key={conversation.id}>
            <div>{conversation.id}</div>
            <div>{conversation.filename}</div>
          </div>
        ))}
    </div>
  );
}

export default Conversations;

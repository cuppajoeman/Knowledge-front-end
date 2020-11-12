import React from 'react'
import { useMutation, gql, Mutation } from '@apollo/client'
import { useState } from 'react'

const CREATE_TOPIC = gql`
  mutation CreateTopic(
    $subfield_id: ID!
    $title: String!
  ) {
    createTopic(
      subfield_id: $subfield_id
      title: $title
    ) {
      title
    }
  }
`
export default function NewTopicForm(props) {
  const [title, setTitle] = useState('')
  const [createTopic, { data }] = useMutation(CREATE_TOPIC)

  function handleSubmit(event) {
    event.preventDefault()
    createTopic({
      variables: {
        subfield_id: props.parentId,
        title,
      },
    })
  }


  return (
    <details>
      <summary>Create a new Topic</summary>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <br />
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <input type="submit" value="Create" />
      </form>
    </details>
  )
}

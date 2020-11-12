import React from 'react'
import { useMutation, gql, Mutation } from '@apollo/client'
import { useState } from 'react'

const CREATE_SECTION = gql`
  mutation CreateSection( $top_id: ID! $title: String!) {
    createSection( top_id: $top_id title: $title) {
      title
    }
  }
`
export default function NewSectionForm(props) {
  const [title, setTitle] = useState('')
  const [createSection, { data }] = useMutation(CREATE_SECTION)

  function handleSubmit(event) {
    event.preventDefault()
    createSection({
      variables: {
        top_id: props.parentId,
        title,
      },
    })
  }


  return (
    <details>
      <summary>Create a new Section:</summary>
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

import React from 'react'
import { useMutation, gql, Mutation } from '@apollo/client'
import { useState } from 'react'

const CREATE_SUBFIELD = gql`
  mutation CreateSubfield(
    $areaofstudy_id: ID!
    $title: String!
  ) {
    createSubfield(
      areaofstudy_id: $areaofstudy_id
      title: $title
    ) {
      title
    }
  }
`
export default function NewSubfieldForm(props) {
  const [title, setTitle] = useState('')
  const [createSubfield, { data }] = useMutation(CREATE_SUBFIELD)

  function handleSubmit(event) {
    event.preventDefault()
    createSubfield({
      variables: {
        areaofstudy_id: props.parentId,
        title,
      },
    })
  }


  return (
    <details>
      <summary>Create a new Subfield:</summary>
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

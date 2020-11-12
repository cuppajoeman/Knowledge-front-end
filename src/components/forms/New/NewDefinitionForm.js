import React from 'react'
import { useMutation, gql, Mutation } from '@apollo/client'
import { useState } from 'react'
import { MathpixMarkdown, MathpixLoader } from 'mathpix-markdown-it'

const CREATE_DEFINITION = gql`
  mutation CreateDefinition(
    $sec_id: ID!
    $title: String!
    $content: String
    $definitionsUsed: [ID!]
  ) {
    createDefinition(
      sec_id: $sec_id
      title: $title
      content: $content
      definitionsUsed: $definitionsUsed
    ) {
      title
      content
    }
  }
`
export default function NewDefinitionForm(props) {
  const [result, setResult] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [defsUsed, setDefsUsed] = useState('')
  const [createDefinition, { data }] = useMutation(CREATE_DEFINITION)

  function handleSubmit(event) {
    event.preventDefault()
    const definitionsUsed = defsUsed.split(',')
    createDefinition({
      variables: { sec_id: props.parentId, title, content, definitionsUsed },
    })
  }

  function handleChange(event) {
    setContent(event.target.value)
    event.preventDefault()
  }

  return (
    <details>
      <summary>Create a new definition</summary>
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
          <br />
          Content:
          <br />
          <textarea name="content" value={content} onChange={handleChange} />
          <br />
          Definitions Used:
          <br />
          <textarea
            name="defsUsed"
            value={defsUsed}
            onChange={(e) => setDefsUsed(e.target.value)}
          />
        </label>
        <MathpixLoader>
          <MathpixMarkdown text={content} />
        </MathpixLoader>
        <br></br>
        <input type="submit" value="Create" />
      </form>
    </details>
  )
}

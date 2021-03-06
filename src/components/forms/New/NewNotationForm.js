import React from 'react'
import { useMutation, gql, Mutation } from '@apollo/client'
import { useState } from 'react'
import { MathpixMarkdown, MathpixLoader } from 'mathpix-markdown-it'
import KnowledgeUsedForm from './KnowledgeUsedForm'

const CREATE_NOTATION = gql`
  mutation CreateNotation(
    $sec_id: ID!
    $title: String!
    $content: String
    $definitionsUsed: [ID!]
    $theoremsUsed: [ID!]
    $propositionsUsed: [ID!]
    $lemmasUsed: [ID!]
  ) {
    createNotation(
      sec_id: $sec_id
      title: $title
      content: $content
      definitionsUsed: $definitionsUsed
      theoremsUsed: $theoremsUsed
      propositionsUsed: $propositionsUsed
      lemmasUsed: $lemmasUsed
    ) {
      title
      content
    }
  }
`
export default function NewNotationForm(props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [defsUsed, setDefsUsed] = useState('')
  const [theoremsUsed, setTheoremsUsed] = useState('')
  const [propositionsUsed, setPropositionsUsed] = useState('')
  const [lemmasUsed, setLemmasUsed] = useState('')
  const [createNotation, { data }] = useMutation(CREATE_NOTATION)

  function handleSubmit(event) {
    event.preventDefault()
    const dU = defsUsed.split(',')
    const tU = theoremsUsed.split(',')
    const pU = propositionsUsed.split(',')
    const lU = lemmasUsed.split(',')
    createNotation({
      variables: {
        sec_id: props.parentId,
        title,
        content,
        definitionsUsed: dU,
        theoremsUsed: tU,
        propositionsUsed: pU,
        lemmasUsed: lU,
      },
    })
  }

  function handleChange(event) {
    setContent(event.target.value)
    event.preventDefault()
  }

  return (
    <details>
      <summary>Create new notation:</summary>
      <MathpixLoader>
        <MathpixMarkdown text={title} />
        <MathpixMarkdown text={content} />
      </MathpixLoader>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <br />
          <textarea
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          Content:
          <br />
          <textarea name="content" value={content} onChange={handleChange} />
          <KnowledgeUsedForm funs={{handleSubmit, setDefsUsed, setTheoremsUsed, setPropositionsUsed, setLemmasUsed}} vars={{defsUsed, theoremsUsed, propositionsUsed, lemmasUsed}}/>
        </label>
        <br />
        <input type="submit" value="Create" />
      </form>
    </details>
  )
}

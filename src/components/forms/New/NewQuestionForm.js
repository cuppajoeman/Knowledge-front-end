import React from 'react'
import { useMutation, gql, Mutation } from '@apollo/client'
import { useState } from 'react'
import { MathpixMarkdown, MathpixLoader } from 'mathpix-markdown-it'
import KnowledgeUsedForm from './KnowledgeUsedForm'

const CREATE_QUESTION = gql`
  mutation CreateQuestion(
    $sec_id: ID!
    $title: String!
    $solution: String
    $definitionsUsed: [ID!]
    $theoremsUsed: [ID!]
    $propositionsUsed: [ID!]
    $lemmasUsed: [ID!]
    $notationUsed: [ID!]
  ) {
    createQuestion(
      sec_id: $sec_id
      title: $title
      solution: $solution
      definitionsUsed: $definitionsUsed
      theoremsUsed: $theoremsUsed
      propositionsUsed: $propositionsUsed
      lemmasUsed: $lemmasUsed
      notationUsed: $notationUsed
    ) {
      title
      proof
    }
  }
`
export default function NewLemmaForm(props) {
  const [title, setTitle] = useState('')
  const [solution, setSolution] = useState('')
  const [defsUsed, setDefsUsed] = useState('')
  const [theoremsUsed, setTheoremsUsed] = useState('')
  const [propositionsUsed, setPropositionsUsed] = useState('')
  const [lemmasUsed, setLemmasUsed] = useState('')
  const [notationUsed, setNotationUsed] = useState('')
  const [createLemma, { data }] = useMutation(CREATE_QUESTION)

  function handleSubmit(event) {
    event.preventDefault()
    const dU = defsUsed.split(',')
    const tU = theoremsUsed.split(',')
    const pU = propositionsUsed.split(',')
    const lU = lemmasUsed.split(',')
    const nU = notationUsed.split(',')
    createLemma({
      variables: {
        sec_id: props.parentId,
        title,
        solution,
        definitionsUsed: dU,
        theoremsUsed: tU,
        propositionsUsed: pU,
        lemmasUsed: lU,
        notationUsed: nU,
      },
    })
  }

  function handleChange(event) {
    setSolution(event.target.value)
    event.preventDefault()
  }

  return (
    <details>
      <summary>Create a new question</summary>
      <MathpixLoader>
        <MathpixMarkdown text={title} />
        <MathpixMarkdown text={solution} />
      </MathpixLoader>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <br />
          <textarea name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <br />
          Solution:
          <br />
          <textarea name="solution" value={solution} onChange={handleChange} />
          <KnowledgeUsedForm 
          funs={{handleSubmit, setDefsUsed, setTheoremsUsed, setPropositionsUsed, setLemmasUsed, setNotationUsed}} 
          vars={{defsUsed, theoremsUsed, propositionsUsed, lemmasUsed, notationUsed}}/>
        </label>
        <br />
        <input type="submit" value="Create" />
      </form>
    </details>
  )
}

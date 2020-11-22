import React from 'react'
import { useMutation, gql, Mutation } from '@apollo/client'
import { useState } from 'react'
import { MathpixMarkdown, MathpixLoader } from 'mathpix-markdown-it'
import KnowledgeUsedForm from './KnowledgeUsedForm'


const CREATE_THEOREM = gql`
  mutation CreateTheorem(
    $sec_id: ID!
    $title: String!
    $proof: String
    $definitionsUsed: [ID!]
    $theoremsUsed: [ID!]
    $propositionsUsed: [ID!]
    $lemmasUsed: [ID!]
    $notationUsed: [ID!]
  ) {
    createTheorem(
      sec_id: $sec_id
      title: $title
      proof: $proof
      definitionsUsed: $definitionsUsed
      propositionsUsed: $propositionsUsed
      theoremsUsed: $theoremsUsed
      lemmasUsed: $lemmasUsed
      notationUsed: $notationUsed
    ) {
      _id
      title
      proof
      definitionsUsed {
        _id
      }
      theoremsUsed {
        _id
      }
      lemmasUsed {
        _id
      }
      propositionsUsed {
        _id
      }
      notationUsed {
        _id
      }
    }
  }
`
export default function NewTheoremForm(props) {
  const [result, setResult] = useState('')
  const [title, setTitle] = useState('')
  const [proof, setProof] = useState('')
  const [defsUsed, setDefsUsed] = useState('')
  const [theoremsUsed, setTheoremsUsed] = useState('')
  const [propositionsUsed, setPropositionsUsed] = useState('')
  const [lemmasUsed, setLemmasUsed] = useState('')
  const [notationUsed, setNotationUsed] = useState('')
  const [createTheorem, { data }] = useMutation(CREATE_THEOREM)

  function handleSubmit(event) {
    event.preventDefault()
    const dU = defsUsed.split(',')
    const tU = theoremsUsed.split(',')
    const pU = propositionsUsed.split(',')
    const lU = lemmasUsed.split(',')
    const nU = notationUsed.split(',')
    console.log(
      {
      variables: {
        sec_id: props.parentId,
        title,
        proof,
        definitionsUsed: dU,
        theoremsUsed: tU,
        propositionsUsed: pU,
        lemmasUsed: lU,
        notationUsed: nU,
      }
    }
    )
    createTheorem({
      variables: {
        sec_id: props.parentId,
        title,
        proof,
        definitionsUsed: dU,
        theoremsUsed: tU,
        propositionsUsed: pU,
        lemmasUsed: lU,
        notationUsed: nU,
      },
    })
  }

  function handleChange(event) {
    setProof(event.target.value)
    event.preventDefault()
  }

  return (
    <details>
      <summary>Create a new theorem:</summary>
      <MathpixLoader>
        <MathpixMarkdown text={title} /> 
        <MathpixMarkdown text={proof} /> 
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
          Proof:
          <br />
          <textarea name="proof" value={proof} onChange={handleChange} />
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

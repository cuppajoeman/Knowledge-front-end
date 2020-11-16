import React from 'react'
import { useState } from 'react'
import { MathpixMarkdown, MathpixLoader } from 'mathpix-markdown-it'

export default function Question(props) {
  const [title, setTitle] = useState(props.question.title)
  const [solution, setSolution] = useState(props.question.solution)
  const [defsUsed, setDefsUsed] = useState(
    props.question.definitionsUsed.map((d) => d._id).toString()
  )
  const [theoremsUsed, setTheoremsUsed] = useState(
    props.question.theoremsUsed.map((d) => d._id).toString()
  )
  const [propositionsUsed, setPropositionsUsed] = useState(
    props.question.propositionsUsed.map((d) => d._id).toString()
  )
  const [lemmasUsed, setLemmasUsed] = useState(
    props.question.lemmasUsed.map((d) => d._id).toString()
  )
  // const [createQuestion, { data }] = useMutation(CREATE_DEFINITION)

  function handleSubmit(event) {
    event.preventDefault()
    const definitionsUsed = defsUsed.split(',')
    // edit definition
    // createQuestion({
    //   variables: { sec_id: props.parentId, title, content, definitionsUsed },
    // })
  }

  function handleChange(event) {
    setSolution(event.target.value)
    event.preventDefault()
  }

  return (
    <details key={props.question._id}>
      <summary>
        ID: {props.question._id}
        <MathpixLoader>
          <MathpixMarkdown text={props.question.title} />
        </MathpixLoader>
      </summary>
      Solution:
      <MathpixLoader>
        <MathpixMarkdown text={solution} />
      </MathpixLoader>
      <details>
        <summary>Edit</summary>
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
            Solution:
            <br />
            <textarea name="solution" value={solution} onChange={handleChange} />
            <br />
            Definitions Used:
            <br />
            <textarea
              name="defsUsed"
              value={defsUsed}
              onChange={(e) => setDefsUsed(e.target.value)}
            />
            <br />
            Theorems Used:
            <br />
            <textarea
              name="theoremsUsed"
              value={theoremsUsed}
              onChange={(e) => setTheoremsUsed(e.target.value)}
            />
            <br />
            Propositions Used:
            <br />
            <textarea
              name="propositionsUsed"
              value={propositionsUsed}
              onChange={(e) => setPropositionsUsed(e.target.value)}
            />
            Lemmas Used:
            <br />
            <textarea
              name="lemmasUsed"
              value={lemmasUsed}
              onChange={(e) => setLemmasUsed(e.target.value)}
            />
          </label>
          <br></br>
          <input type="submit" value="Update" />
        </form>
      </details>
    </details>
  )
}

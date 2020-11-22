import React from 'react'
import { useState } from 'react'
import { MathpixMarkdown, MathpixLoader } from 'mathpix-markdown-it'

export default function Notation(props) {
  const [title, setTitle] = useState(props.notation.title)
  const [content, setContent] = useState(props.notation.content)
  const [defsUsed, setDefsUsed] = useState(
    props.notation.definitionsUsed.map((d) => d._id).toString()
  )
  const [theoremsUsed, setTheoremsUsed] = useState(
    props.notation.theoremsUsed.map((d) => d._id).toString()
  )
  const [propositionsUsed, setPropositionsUsed] = useState(
    props.notation.propositionsUsed.map((d) => d._id).toString()
  )
  const [lemmasUsed, setLemmasUsed] = useState(
    props.notation.lemmasUsed.map((d) => d._id).toString()
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
    setContent(event.target.value)
    event.preventDefault()
  }

  return (
    <details key={props.notation._id}>
      <summary>
        ID: {props.notation._id}
        <MathpixLoader>
          <MathpixMarkdown text={props.notation.title} />
        </MathpixLoader>
      </summary>
      Notation:
      <MathpixLoader>
        <MathpixMarkdown text={content} />
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
            Notation:
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

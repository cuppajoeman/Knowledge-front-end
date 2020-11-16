import React from 'react'

export default function KnowledgeForm(
    { 
        funs: {setDefsUsed, setTheoremsUsed, setPropositionsUsed, setLemmasUsed}, 
        vars: {defsUsed, theoremsUsed, propositionsUsed, lemmasUsed} 
    }) {
    return (
        <div>
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
          <br />
          Lemmas Used:
          <br />
          <textarea
            name="lemmasUsed"
            value={lemmasUsed}
            onChange={(e) => setLemmasUsed(e.target.value)}
          />
      </div>
    )
}

import React from 'react'

// import Can from "../Can"
import Proposition from "../knowledge/Proposition"
import NewPropositionForm from "../forms/New/NewPropositionForm"

export default function PropositionList({sec}) {
    return (
    <details>
        <summary>Propositions (Quantity: {sec.propositions.length})</summary>
        {/* <Can
        role={user.role}
        perform="posts:edit"
        data={{
            // userId: user.id,
            // postOwnerId: post.ownerId
            // TODO
            userId: 3,
            postOwnerId: 3
        }}
        yes={() => ( */}
        <NewPropositionForm parentId={sec._id} />
        {/* )}
        /> */}
        {sec.propositions.map((proposition) => {
        return (
            <Proposition key={proposition._id} proposition={proposition} />
        )
        })}
    </details>
    )
}

import React from 'react'

// import Can from "../Can"
import Theorem from "../knowledge/Theorem"
import NewTheoremForm from "../forms/New/NewTheoremForm"

export default function TheoremList({sec}) {
    return (
    <details>
        <summary>Theorems (Quantity: {sec.theorems.length})</summary>
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
        <NewTheoremForm parentId={sec._id} />
        {/* )}
        /> */}
        {sec.theorems.map((theorem) => {
        return (
            <Theorem key={theorem._id} theorem={theorem} />
        )
        })}
    </details>
    )
}

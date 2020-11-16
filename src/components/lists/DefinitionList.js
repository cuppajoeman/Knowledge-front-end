import React from 'react'

// import Can from "../Can"
import Definition from "../knowledge/Definition"
import NewDefinitionForm from "../forms/New/NewDefinitionForm"

export default function DefinitionList({sec}) {
    return (
    <details>
        <summary>Definitions (Quantity: {sec.definitions.length})</summary>
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
        <NewDefinitionForm parentId={sec._id} />
        {/* )}
        /> */}
        {sec.definitions.map((definition) => {
        return (
            <Definition key={definition._id} def={definition} />
        )
        })}
    </details>
    )
}

import React from 'react'

// import Can from "../Can"
import Lemma from "../knowledge/Lemma"
import NewLemmaForm from "../forms/New/NewLemmaForm"

export default function LemmaList({sec}) {
    return (
    <details>
        <summary>Lemmas (Quantity: {sec.lemmas.length})</summary>
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
        <NewLemmaForm parentId={sec._id} />
        {/* )}
        /> */}
        {sec.lemmas.map((lemma) => {
        return (
            <Lemma key={lemma._id} lemma={lemma} />
        )
        })}
    </details>
    )
}

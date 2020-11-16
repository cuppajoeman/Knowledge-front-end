import React from 'react'

// import Can from "../Can"
import Question from "../knowledge/Question"
import NewQuestionForm from "../forms/New/NewQuestionForm"

export default function QuestionList({sec}) {
    return (
    <details>
        <summary>Questions (Quantity: {sec.questions.length})</summary>
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
        <NewQuestionForm parentId={sec._id} />
        {/* )}
        /> */}
        {sec.questions.map((question) => {
        return (
            <Question key={question._id} question={question} />
        )
        })}
    </details>
    )
}

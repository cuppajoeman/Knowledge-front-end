import React from 'react'
import { useState } from 'react'
// import Can from "../Can"
import Definition from "../knowledge/Definition"
import NewDefinitionForm from "../forms/New/NewDefinitionForm"
import { useQuery, gql } from '@apollo/client'

const GET_DEFS_FROM_SEC = gql`
query DefinitionsOfSection( $sec_id: ID!) 
{
    definitionsOfSection(sec_id: $sec_id) {
        _id
        title
        content
        definitionsUsed {
            _id
        }
        notationUsed {
            _id
        }
    }
}
`

export default function DefinitionList({sec_id}) {
    const [summaryIsOpen, setSummaryIsOpen] = useState(false);  

    return (
    <div>
            <details>
                <summary onClick={() => setSummaryIsOpen(true)}>Definitions</summary>
                {summaryIsOpen && <Definitions sec_id={sec_id}/>}

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
                {/* )}
                /> */}
                {/* {sec.definitions.map((definition) => {
                return (
                    <Definition key={definition._id} def={definition} />
                )
                })} */}
            </details>
    </div>
    )
}
const Definitions = ({sec_id}) => {
    const { loading, data, error } = useQuery(GET_DEFS_FROM_SEC, {
        variables: {sec_id}
    })  
    return loading ? <p>Wait bidge</p> : 
    <div>
        <NewDefinitionForm parentId={sec_id} />
        {data.definitionsOfSection.map((definition) => {
            return (
                <Definition key={definition._id} def={definition} />
            )
        })}
    </div>
}

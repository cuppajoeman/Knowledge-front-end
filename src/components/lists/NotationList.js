import React from 'react'
import { useState } from 'react'
// import Can from "../Can"
import Notation from "../knowledge/Notation"
import NewNotationForm from "../forms/New/NewNotationForm"
import { useQuery, gql } from '@apollo/client'

const GET_NOTATION_FROM_SEC = gql`
query NotationOfSection( $sec_id: ID!) 
{
    notationOfSection(sec_id: $sec_id) {
        _id
        title
        content
        definitionsUsed {
            _id
        }
        theoremsUsed {
            _id
        }
        propositionsUsed {
            _id
        }
        lemmasUsed {
            _id
        }
    }
}
`

export default function NotationList({sec_id}) {
    const [summaryIsOpen, setSummaryIsOpen] = useState(false);  

    return (
    <div>
            <details>
                <summary onClick={() => setSummaryIsOpen(true)}>Notation</summary>
                {summaryIsOpen && <Notations sec_id={sec_id}/>}
            </details>
    </div>
    )
}
const Notations = ({sec_id}) => {
    const { loading, data, error } = useQuery(GET_NOTATION_FROM_SEC, {
        variables: {sec_id}
    })  
    return loading ? <p>Wait bidge</p> : 
    <div>
        <NewNotationForm parentId={sec_id} />
        {data.notationOfSection.map((notation) => {
            return (
                <Notation key={notation._id} notation={notation} />
            )
        })}
    </div>
}

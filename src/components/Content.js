import React from 'react'
import { useQuery, gql } from '@apollo/client'
import './index.css';

import {AuthConsumer} from "../authContext";
import Can from "./Can"

// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
//   Button,
// } from '@material-ui/core'
// import { Menu as MenuIcon } from '@material-ui/icons'

// import Profile from './components/Profile'

import Definition from './knowledge/Definition'
import Theorem from './knowledge/Theorem'
import Proposition from './knowledge/Proposition'
import Lemma from './knowledge/Lemma'

import NewSectionForm from './forms/New/NewSectionForm'
import NewTopicForm from './forms/New/NewTopicForm'

import NewDefinitionForm from './forms/New/NewDefinitionForm'
import NewTheoremForm from './forms/New/NewTheoremForm'
import NewPropositionForm from './forms/New/NewPropositionForm'
import NewLemmaForm from './forms/New/NewLemmaForm'
import NewSubfieldForm from './forms/New/NewSubfieldForm'

/**
 * Our data comes from users-data.js
 * -----------------------------
 */

const GET_EVERYTHING = gql`
  {
    AreaOfStudy {
      _id
      title
      subfields {
        _id
        title
        topics {
          _id
          title
          sections {
            _id
            title
            definitions {
              _id
              title
              content
              definitionsUsed {
                _id
              }
            }
            theorems {
              _id
              title
              proof
              definitionsUsed {
                _id
              }
              theoremsUsed {
                _id
              }
            }
            propositions {
              _id
              title
              proof
              definitionsUsed {
                _id
              }
              theoremsUsed {
                _id
              }
            }
            lemmas {
              _id
              title
              proof
              definitionsUsed {
                _id
              }
              theoremsUsed {
                _id
              }
            }
          }
        }
      }
    }
  }
`

/**
 * Our React component where we display data
 * -----------------------------
 */
export default function Content() {
  const { loading, data, error } = useQuery(GET_EVERYTHING)

  // const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

  return (
    <AuthConsumer>
      {({user}) => (
      <div className="App">
        {loading && !error && <p>Loading...</p>}
        {error && !loading && <p>Error</p>}
        {data && !loading && !error && (
          <div id="testing">
            {/* <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6">Knowledge</Typography>
                {!isAuthenticated && (
                  <Button color="inherit" onClick={() => loginWithRedirect()}>
                    Log In
                  </Button>
                )}
                {isAuthenticated && (
                  <Button color="inherit" onClick={() => logout()}>
                    Log out
                  </Button>
                )}
              </Toolbar>
            </AppBar>
            <Profile /> */}
            {data.AreaOfStudy.map((aos) => {
              return (
                <details key={aos._id}>
                  <summary>{aos.title}</summary>
                  <Can
                    role={user.role}
                    perform="posts:edit"
                    data={{
                      // userId: user.id,
                      // postOwnerId: post.ownerId
                      // TODO
                      userId: 3,
                      postOwnerId: 3
                    }}
                    yes={() => (
                    <NewSubfieldForm parentId={aos._id} />
                    )}
                  />
                  {aos.subfields.map((sf) => {
                    return (
                      <details key={sf._id}>
                        <summary>{sf.title}</summary>
                        <Can
                          role={user.role}
                          perform="posts:edit"
                          data={{
                            // userId: user.id,
                            // postOwnerId: post.ownerId
                            // TODO
                            userId: 3,
                            postOwnerId: 3
                          }}
                          yes={() => (
                          <NewTopicForm parentId={sf._id} />
                          )}
                        />
                        {sf.topics.map((t) => {
                          return (
                            <details key={t._id}>
                              <summary>{t.title}</summary>
                              <Can
                                role={user.role}
                                perform="posts:edit"
                                data={{
                                  // userId: user.id,
                                  // postOwnerId: post.ownerId
                                  // TODO
                                  userId: 3,
                                  postOwnerId: 3
                                }}
                                yes={() => (
                                <NewSectionForm parentId={t._id} />
                                )}
                              />
                              {t.sections.map((sec) => {
                                return (
                                  <details key={sec._id}>
                                    <summary>{sec.title}</summary>
                                    <details>
                                      <summary>Definitions</summary>
                                      <Can
                                        role={user.role}
                                        perform="posts:edit"
                                        data={{
                                          // userId: user.id,
                                          // postOwnerId: post.ownerId
                                          // TODO
                                          userId: 3,
                                          postOwnerId: 3
                                        }}
                                        yes={() => (
                                        <NewDefinitionForm parentId={sec._id} />
                                        )}
                                      />
                                      {sec.definitions.map((def) => {
                                        return (
                                          <Definition key={def._id} def={def} />
                                        )
                                      })}
                                    </details>
                                    {/* Eventually turn this into one thing, command pattern? */}
                                    <details>
                                      <summary>Theorems</summary>
                                      <Can
                                        role={user.role}
                                        perform="posts:edit"
                                        data={{
                                          // userId: user.id,
                                          // postOwnerId: post.ownerId
                                          // TODO
                                          userId: 3,
                                          postOwnerId: 3
                                        }}
                                        yes={() => (
                                        <NewTheoremForm parentId={sec._id} />
                                        )}
                                      />
                                      {sec.theorems.map((theorem) => {
                                        return (
                                          <Theorem
                                            key={theorem._id}
                                            theorem={theorem}
                                          />
                                        )
                                      })}
                                    </details>
                                    <details>
                                      <summary>Propositions</summary>
                                      <Can
                                        role={user.role}
                                        perform="posts:edit"
                                        data={{
                                          // userId: user.id,
                                          // postOwnerId: post.ownerId
                                          // TODO
                                          userId: 3,
                                          postOwnerId: 3
                                        }}
                                        yes={() => (
                                        <NewPropositionForm parentId={sec._id} />
                                        )}
                                      />
                                      {sec.propositions.map((proposition) => {
                                        return (
                                          <Proposition
                                            key={proposition._id}
                                            proposition={proposition}
                                          />
                                        )
                                      })}
                                    </details>
                                    <details>
                                      <summary>Lemmas</summary>
                                      <Can
                                        role={user.role}
                                        perform="posts:edit"
                                        data={{
                                          // userId: user.id,
                                          // postOwnerId: post.ownerId
                                          // TODO
                                          userId: 3,
                                          postOwnerId: 3
                                        }}
                                        yes={() => (
                                        <NewLemmaForm parentId={sec._id} />
                                        )}
                                      />
                                      {sec.lemmas.map((lemma) => {
                                        return (
                                          <Lemma key={lemma._id} lemma={lemma} />
                                        )
                                      })}
                                    </details>
                                  </details>
                                )
                              })}
                            </details>
                          )
                        })}
                      </details>
                    )
                  })}
                </details>
              )
            })}
          </div>
        )}
      </div>

      )}
    </AuthConsumer>
  )
}

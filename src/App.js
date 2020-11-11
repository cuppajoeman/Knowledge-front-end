import React from 'react'
import { useQuery, gql } from '@apollo/client'
import './index.css'

// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
//   Button,
// } from '@material-ui/core'
// import { Menu as MenuIcon } from '@material-ui/icons'

// import Profile from './components/Profile'

import Definition from './components/Definition'
import Theorem from './components/Theorem'
import Proposition from './components/Proposition'
import Lemma from './components/Lemma'

import NewDefinitionForm from './components/forms/NewDefinitionForm'
import NewTheoremForm from './components/forms/NewTheoremForm'
import NewPropositionForm from './components/forms/NewPropositionForm'
import NewLemmaForm from './components/forms/NewLemmaForm'

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
export default function App() {
  const { loading, data, error } = useQuery(GET_EVERYTHING)

  // const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

  return (
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
                {aos.subfields.map((sf) => {
                  return (
                    <details key={sf._id}>
                      <summary>{sf.title}</summary>
                      {sf.topics.map((t) => {
                        return (
                          <details key={t._id}>
                            <summary>{t.title}</summary>
                            {t.sections.map((sec) => {
                              return (
                                <details key={sec._id}>
                                  <summary>{sec.title}</summary>
                                  <details>
                                    <summary>Definitions</summary>
                                    {/* {isAuthenticated && ( */}
                                      <NewDefinitionForm parentId={sec._id} />
                                    {/* )} */}
                                    {sec.definitions.map((def) => {
                                      return (
                                        <Definition key={def._id} def={def} />
                                      )
                                    })}
                                  </details>
                                  {/* Eventually turn this into one thing, command pattern? */}
                                  <details>
                                    <summary>Theorems</summary>
                                    {/* {isAuthenticated && ( */}
                                      <NewTheoremForm parentId={sec._id} />
                                    {/* )} */}
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
                                    {/* {isAuthenticated && ( */}
                                      <NewPropositionForm parentId={sec._id} />
                                    {/* )} */}
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
                                    {/* {isAuthenticated && ( */}
                                      <NewLemmaForm parentId={sec._id} />
                                    {/* )} */}
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
  )
}

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

import NewSectionForm from './forms/New/NewSectionForm'
import NewTopicForm from './forms/New/NewTopicForm'

import NewSubfieldForm from './forms/New/NewSubfieldForm'

import DefinitionList from './lists/DefinitionList'
import PropositionList from './lists/PropositionList'
import LemmaList from './lists/LemmaList'
import TheoremList from './lists/TheoremList'
import QuestionList from './lists/QuestionList'
import NotationList from './lists/NotationList'

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
              propositionsUsed {
                _id
              }
              lemmasUsed {
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
              propositionsUsed {
                _id
              }
              lemmasUsed {
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
              propositionsUsed {
                _id
              }
              lemmasUsed {
                _id
              }
            }
            questions {
              _id
              title
              solution
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
                                    <DefinitionList sec_id={sec._id} />
                                    <TheoremList sec={sec} />
                                    <PropositionList sec={sec} />
                                    <LemmaList sec={sec} />
                                    <QuestionList sec={sec} />
                                    <NotationList sec_id={sec._id} />
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

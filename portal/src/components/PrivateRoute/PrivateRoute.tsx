import React from 'react'
import { Route, Redirect } from 'react-router'
import LoadingScreen from '../LoadingScreen'

const PrivateRoute = ({
  component: Component,
  render,
  isLoggedIn,
  isLoading,
  ...rest
}: any) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (isLoading) {
          return <LoadingScreen />
        } else {
          if (isLoggedIn) {
            return Component ? (
              <Component
                {...props}
                isLoggedIn={isLoggedIn}
                isLoading={isLoading}
              />
            ) : (
              render({ ...props, isLoggedIn, isLoading })
            )
          }
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location },
              }}
            />
          )
        }
      }}
    />
  )
}

export default PrivateRoute

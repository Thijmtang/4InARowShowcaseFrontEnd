import React from 'react'
import { EnableTwoFactor } from './EnableTwoFactor'

describe('<EnableTwoFactor />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<EnableTwoFactor />)
  })
})
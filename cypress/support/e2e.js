// cypress/support/e2e.js
// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// 添加自定义命令
Cypress.Commands.add('mockTokenInfo', (tokenData = {}) => {
  const defaultData = {
    name: 'YD Token',
    symbol: 'YDT',
    decimals: '18',
    totalSupply: '1000000000000000000000000',
    tokenPrice: '1000000000000000',
    saleActive: true,
    maxTokensPerTransaction: '1000000000000000000000',
    contractETHBalance: '5000000000000000000',
    userBalance: '100000000000000000000'
  }
  
  const data = { ...defaultData, ...tokenData }
  
  // 这里可以添加具体的mock逻辑
  // 由于这是演示，我们暂时不做实际的网络拦截
  cy.log('Mock token info set:', data)
})

// 添加连接钱包命令
Cypress.Commands.add('connectWallet', (address = '0x742d35Cc6634C0532925a3b8D81C05389996b0f7') => {
  cy.window().then((win) => {
    // 模拟钱包连接
    win.mockWalletConnected = true
    win.mockWalletAddress = address
  })
  cy.log('Wallet connected:', address)
})

// 添加断开钱包命令
Cypress.Commands.add('disconnectWallet', () => {
  cy.window().then((win) => {
    win.mockWalletConnected = false
    delete win.mockWalletAddress
  })
  cy.log('Wallet disconnected')
})

// 添加模拟交易命令
Cypress.Commands.add('mockTransaction', (success = true) => {
  if (success) {
    cy.log('Mock transaction: success')
  } else {
    cy.log('Mock transaction: failure')
  }
})

// 添加等待交易命令
Cypress.Commands.add('waitForTransaction', (timeout = 5000) => {
  cy.wait(1000) // 简单的等待
  cy.log('Transaction completed')
})

// 添加地址验证命令
Cypress.Commands.add('validateEthAddress', (address) => {
  expect(address).to.match(/^0x[a-fA-F0-9]{40}$/)
})

// 添加合约调用模拟命令
Cypress.Commands.add('mockContractCall', (method, returnValue) => {
  cy.log(`Mock contract call: ${method} -> ${returnValue}`)
})

Cypress.Commands.add('getButton', (text) => {
  return cy.get('button').contains(text)
})

Cypress.Commands.add('getHeading', (level, text) => {
  return cy.get(`h${level}`).contains(text)
})

Cypress.Commands.add('getCard', (type = 'white') => {
  const colorClass = type === 'white' ? 'bg-white' : 'bg-gray-100'
  return cy.get(`.${colorClass}.rounded-lg.shadow`)
})

Cypress.Commands.add('getDebugJson', () => {
  return cy.get('pre')
})

Cypress.Commands.add('getClickableText', (text) => {
  return cy.get('.cursor-pointer').contains(text)
})
// cypress/support/commands.js - 先添加这些自定义命令
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

// cypress/e2e/home.cy.js - 修复后的测试代码
describe('Home页面测试 (修复版)', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.wait(500)
  })

  describe('页面结构测试', () => {
    it('应该显示正确的页面结构', () => {
      cy.getHeading(1, '我的web3-DAPP').should('be.visible')
      cy.getHeading(3, '欢迎使用').should('be.visible')
      cy.getHeading(3, '状态调试').should('be.visible')
    })

    it('应该显示两个主要卡片', () => {
      cy.getCard('white').should('be.visible')
      cy.getCard('gray').should('be.visible')
    })

    it('应该显示所有交互元素', () => {
      cy.getButton('更改问候语').should('be.visible')
      cy.getButton('学习模式').should('be.visible')
      cy.getButton('重置').should('be.visible')
      cy.getClickableText('大家好').should('be.visible')
      cy.getDebugJson().should('be.visible')
    })
  })

  describe('交互功能测试', () => {
    it('点击问候语文本应该改变状态', () => {
      cy.getClickableText('大家好').click()
      cy.contains('同学们好').should('be.visible')
      cy.getDebugJson().should('contain', '同学们好')
    })

    it('更改问候语按钮应该正确工作', () => {
      cy.getButton('更改问候语').click()
      cy.contains('欢迎大家！').should('be.visible')
      cy.getDebugJson().should('contain', '欢迎大家！')
    })

    it('学习模式按钮应该正确工作', () => {
      cy.getButton('学习模式').click()
      cy.contains('学习Web3开发').should('be.visible')
      cy.getDebugJson().should('contain', '学习Web3开发')
    })

    it('重置按钮应该正确工作', () => {
      // 先改变状态
      cy.getButton('学习模式').click()
      cy.contains('学习Web3开发').should('be.visible')
      
      // 重置
      cy.getButton('重置').click()
      cy.contains('重置状态').should('be.visible')
      cy.getDebugJson().should('contain', '重置状态')
    })
  })

  describe('复杂交互场景', () => {
    it('连续状态变更应该正确处理', () => {
      const interactions = [
        { button: '更改问候语', expected: '欢迎大家！' },
        { button: '学习模式', expected: '学习Web3开发' },
        { button: '重置', expected: '重置状态' }
      ]

      interactions.forEach(({ button, expected }) => {
        cy.getButton(button).click()
        cy.contains(expected).should('be.visible')
        cy.getDebugJson().should('contain', expected)
      })
    })

    it('文本点击和按钮点击混合使用', () => {
      // 文本点击
      cy.getClickableText('大家好').click()
      cy.contains('同学们好').should('be.visible')
      
      // 按钮点击
      cy.getButton('学习模式').click()
      cy.contains('学习Web3开发').should('be.visible')
      
      // 再次文本点击
      cy.getClickableText('学习Web3开发').click()
      cy.contains('同学们好').should('be.visible')
    })

    it('快速连续操作测试', () => {
      // 快速连续点击
      cy.getButton('更改问候语').click()
      cy.getButton('学习模式').click()
      cy.getButton('重置').click()
      
      // 验证最终状态
      cy.contains('重置状态').should('be.visible')
      cy.getDebugJson().should('contain', '重置状态')
    })
  })

  describe('数据一致性测试', () => {
    it('UI和JSON应该始终同步', () => {
      const testSequence = [
        { action: () => cy.getButton('更改问候语').click(), expected: '欢迎大家！' },
        { action: () => cy.getButton('学习模式').click(), expected: '学习Web3开发' },
        { action: () => cy.getButton('重置').click(), expected: '重置状态' },
        { action: () => cy.getClickableText('重置状态').click(), expected: '同学们好' }
      ]

      testSequence.forEach(({ action, expected }) => {
        action()
        cy.contains(expected).should('be.visible')
        cy.getDebugJson().should('contain', `"${expected}"`)
      })
    })

    it('JSON格式应该正确', () => {
      cy.getDebugJson().invoke('text').then((jsonText) => {
        expect(jsonText).to.include('\n') // 格式化
        expect(jsonText).to.include('  ') // 缩进
        
        const data = JSON.parse(jsonText)
        // 修复：使用Cypress语法而不是Jest语法
        expect(data).to.have.property('info')
        expect(data.info).to.be.a('string')  // ✅ 正确的Cypress语法
        expect(data.info).to.equal('大家好')
      })
    })
  })

  describe('状态对象结构验证', () => {
    it('状态对象应该有正确的结构', () => {
      cy.getDebugJson().invoke('text').then((jsonText) => {
        const data = JSON.parse(jsonText)
        
        // 验证对象结构 - 使用Cypress断言
        expect(data).to.be.an('object')
        expect(data).to.have.property('info')
        expect(data.info).to.be.a('string')
        expect(Object.keys(data)).to.have.length(1)
        expect(Object.keys(data)).to.deep.equal(['info'])
      })
    })

    it('状态变化后结构应该保持一致', () => {
      cy.getButton('更改问候语').click()
      
      cy.getDebugJson().invoke('text').then((jsonText1) => {
        const data1 = JSON.parse(jsonText1)
        expect(Object.keys(data1)).to.deep.equal(['info'])
        expect(data1.info).to.be.a('string')
        
        cy.getButton('学习模式').click()
        
        cy.getDebugJson().invoke('text').then((jsonText2) => {
          const data2 = JSON.parse(jsonText2)
          expect(Object.keys(data2)).to.deep.equal(['info'])
          expect(data2.info).to.be.a('string')
          expect(data2.info).to.equal('学习Web3开发')
        })
      })
    })
  })

  describe('响应式和样式测试', () => {
    it('按钮应该有正确的样式', () => {
      cy.getButton('更改问候语').should('have.class', 'bg-blue-500')
      cy.getButton('学习模式').should('have.class', 'bg-green-500')
      cy.getButton('重置').should('have.class', 'bg-gray-500')
    })

    it('移动端应该正常工作', () => {
      cy.viewport(375, 667)
      
      cy.getHeading(1, '我的web3-DAPP').should('be.visible')
      cy.getButton('学习模式').click()
      cy.contains('学习Web3开发').should('be.visible')
    })

    it('卡片布局应该正确', () => {
      cy.getCard('white').should('have.class', 'p-6')
      cy.getCard('gray').should('have.class', 'p-6')
    })
  })

  describe('错误处理和边界测试', () => {
    it('页面刷新后应该重置状态', () => {
      cy.getButton('学习模式').click()
      cy.contains('学习Web3开发').should('be.visible')
      
      cy.reload()
      
      cy.contains('大家好').should('be.visible')
      cy.getDebugJson().should('contain', '大家好')
    })

    it('重复操作应该稳定', () => {
      for (let i = 0; i < 5; i++) {
        cy.getButton('更改问候语').click()
      }
      
      cy.contains('欢迎大家！').should('be.visible')
      cy.getDebugJson().should('contain', '欢迎大家！')
    })

    it('所有按钮应该可点击', () => {
      cy.getButton('更改问候语').should('not.be.disabled')
      cy.getButton('学习模式').should('not.be.disabled')
      cy.getButton('重置').should('not.be.disabled')
    })
  })

  describe('JSON数据验证', () => {
    it('JSON应该始终是有效格式', () => {
      const buttons = ['更改问候语', '学习模式', '重置']
      
      buttons.forEach(buttonText => {
        cy.getButton(buttonText).click()
        
        cy.getDebugJson().invoke('text').then((jsonText) => {
          // 验证是有效的JSON
          expect(() => JSON.parse(jsonText)).to.not.throw()
          
          const data = JSON.parse(jsonText)
          expect(data).to.be.an('object')
          expect(data).to.have.property('info')
        })
      })
    })

    it('JSON缩进应该正确', () => {
      cy.getDebugJson().invoke('text').then((jsonText) => {
        // 验证包含换行符（格式化）
        expect(jsonText).to.match(/\n/)
        
        // 验证包含2个空格的缩进
        expect(jsonText).to.match(/  "info"/)
        
        // 验证JSON结构完整
        expect(jsonText).to.match(/{\s*\n\s*"info":\s*".*"\s*\n}/)
      })
    })
  })

  describe('用户体验测试', () => {
    it('悬停效果应该正确设置', () => {
      cy.getClickableText('大家好').should('have.class', 'hover:text-blue-600')
      cy.getButton('更改问候语').should('have.class', 'hover:bg-blue-600')
      cy.getButton('学习模式').should('have.class', 'hover:bg-green-600')
      cy.getButton('重置').should('have.class', 'hover:bg-gray-600')
    })

    it('过渡效果应该设置', () => {
      cy.getClickableText('大家好').should('have.class', 'transition-colors')
    })

    it('应该有适当的间距', () => {
      cy.get('.space-x-2').should('be.visible')
      cy.get('.mb-4').should('exist')
      cy.get('.p-8').should('exist')
    })
  })
})
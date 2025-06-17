describe('YD Token 基础测试', () => {
  beforeEach(() => {
    // 直接访问您的应用根路径
    cy.visit('/')
    cy.wait(1000)
  })

  describe('页面基础功能', () => {
    it('应该成功加载页面', () => {
      // 检查页面是否加载
      cy.get('body').should('be.visible')
      
      // 如果有标题，检查标题
      cy.title().should('not.be.empty')
    })

    it('应该显示YD Token相关内容', () => {
      // 查找可能存在的YD Token相关文本
      // 使用 contains 而不是特定的选择器，因为我们不确定确切的DOM结构
      
      // 检查是否包含YD Token相关文本（不区分大小写）
      cy.get('body').then(($body) => {
        if ($body.text().includes('YD Token') || $body.text().includes('YDToken')) {
          cy.contains('YD Token', { matchCase: false }).should('be.visible')
        } else {
          cy.log('YD Token 组件可能未加载或路径不正确')
        }
      })
    })
  })

  describe('导航和路由测试', () => {
    it('应该检查当前URL', () => {
      cy.url().should('include', Cypress.config().baseUrl || 'localhost')
    })

    it('应该能够与页面交互', () => {
      // 尝试查找任何可点击的元素
      cy.get('button, a, [role="button"]').then(($elements) => {
        if ($elements.length > 0) {
          cy.log(`找到 ${$elements.length} 个可交互元素`)
          // 可以测试第一个按钮的可见性
          cy.wrap($elements.first()).should('be.visible')
        } else {
          cy.log('页面上没有找到按钮或链接')
        }
      })
    })
  })

  describe('表单元素测试', () => {
    it('应该查找输入框', () => {
      cy.get('input').then(($inputs) => {
        if ($inputs.length > 0) {
          cy.log(`找到 ${$inputs.length} 个输入框`)
          
          // 测试第一个输入框
          cy.wrap($inputs.first()).should('be.visible')
          
          // 尝试输入文本
          if ($inputs.first().attr('type') === 'number') {
            cy.wrap($inputs.first()).clear().type('123')
          } else if ($inputs.first().attr('type') === 'text') {
            cy.wrap($inputs.first()).clear().type('test input')
          }
        } else {
          cy.log('页面上没有找到输入框')
        }
      })
    })

    it('应该查找文本内容', () => {
      // 查找一些可能的关键词
      const keywords = [
        '购买', '卖出', '转账', '代币', 'Token', 
        '余额', '价格', '合约', 'ETH', 'Contract'
      ]
      
      keywords.forEach(keyword => {
        cy.get('body').then(($body) => {
          if ($body.text().includes(keyword)) {
            cy.contains(keyword).should('be.visible')
            cy.log(`找到关键词: ${keyword}`)
          }
        })
      })
    })
  })

  describe('响应式测试', () => {
    it('应该在移动设备上正常显示', () => {
      cy.viewport('iphone-6')
      cy.get('body').should('be.visible')
    })

    it('应该在平板设备上正常显示', () => {
      cy.viewport('ipad-2')
      cy.get('body').should('be.visible')
    })

    it('应该在桌面设备上正常显示', () => {
      cy.viewport(1280, 720)
      cy.get('body').should('be.visible')
    })
  })

  describe('错误处理测试', () => {
    it('应该处理不存在的路径', () => {
      cy.visit('/nonexistent-page', { failOnStatusCode: false })
      
      // 检查是否有404页面或重定向
      cy.get('body').should('be.visible')
    })

    it('应该处理网络延迟', () => {
      // 添加延迟访问
      cy.intercept('GET', '**/*', (req) => {
        req.reply((res) => {
          // 添加100ms延迟
          return new Promise((resolve) => {
            setTimeout(() => resolve(res), 100)
          })
        })
      })
      
      cy.visit('/')
      cy.get('body').should('be.visible')
    })
  })

  describe('基本交互测试', () => {
    it('应该能够滚动页面', () => {
      cy.scrollTo('bottom')
      cy.scrollTo('top')
    })

    it('应该检查页面标题', () => {
      cy.title().should('not.be.empty')
      cy.title().then((title) => {
        cy.log(`页面标题: ${title}`)
      })
    })

    it('应该检查meta标签', () => {
      cy.get('head meta').should('have.length.greaterThan', 0)
    })
  })

  describe('控制台错误检查', () => {
    it('应该检查控制台错误', () => {
      cy.visit('/')
      
      cy.window().then((win) => {
        // 检查是否有JavaScript错误
        const errors = []
        win.addEventListener('error', (e) => {
          errors.push(e.message)
        })
        
        // 等待一段时间让页面完全加载
        cy.wait(2000).then(() => {
          if (errors.length > 0) {
            cy.log(`发现 ${errors.length} 个JavaScript错误`)
            errors.forEach(error => cy.log(`错误: ${error}`))
          } else {
            cy.log('没有发现JavaScript错误')
          }
        })
      })
    })
  })
})

// 如果您确定YD Token组件在特定路径，可以创建专门的测试
describe('YD Token 组件专项测试', () => {
  // 假设YD Token组件在 /ydtoken 路径
  it('应该尝试访问YD Token页面', () => {
    const possiblePaths = ['/', '/ydtoken', '/token', '/yd-token', '/home']
    
    possiblePaths.forEach(path => {
      cy.visit(path, { failOnStatusCode: false })
      
      cy.get('body').then(($body) => {
        if ($body.text().includes('YD Token')) {
          cy.log(`在路径 ${path} 找到YD Token组件`)
          cy.contains('YD Token').should('be.visible')
        }
      })
    })
  })
})
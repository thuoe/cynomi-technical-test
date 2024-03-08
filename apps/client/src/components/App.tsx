import { Layout, Menu } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { MenuItemType } from 'antd/es/menu/hooks/useItems'
import { Link, useLoaderData } from 'react-router-dom'
import { NavItem } from '../types'

const navItems: MenuItemType[] = [
  {
    key: NavItem.Home,
    label: <Link to="/">{NavItem.Home}</Link>,
  },
  {
    key: NavItem.View,
    label: <Link to="/view">{NavItem.View}</Link>,
  }
]

type Props = {
  content: JSX.Element
}

const App = ({ content }: Props): JSX.Element => {
  const loader = useLoaderData() as NavItem
  const selectedNavItem = navItems.find(item => item.key === loader) ?? navItems[0]
  return (
    <> 
    <Layout style={{ height: '100vh', overflow: "auto"}}>
      <Header style={{ display: 'flex', alignItems: 'center'}}>
        <Menu selectedKeys={[String(selectedNavItem.key)]} theme='dark' mode='horizontal' items={navItems} style={{ flex: 1, minWidth: 0 }} />
      </Header>
      <Content style={{ padding: '0 48px' }}>
          {content}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Cynomi Technical Task ©{new Date().getFullYear()} Created by Eddie Thuo
      </Footer>
    </Layout>
    </>
  )
}

export default App

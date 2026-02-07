import { MainMenu } from './MainMenu'
import { UserInfo } from './UserInfo'

export function Header() {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        borderBottom: '1px solid #ccc',
        backgroundColor: '#f5f5f5',
      }}
    >
      <MainMenu />
      <UserInfo />
    </header>
  )
}


import GameShell from './components/GameShell'
import GameDetails from './components/GameDetails'
import dashboard from './dashboard.module.css'

export default function Home() {
  return (
    <main className={dashboard.dashboardFrame}>
      <GameShell />
      <GameDetails />
    </main>
  )
}

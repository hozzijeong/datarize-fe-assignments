import { Link } from 'react-router-dom'
import DataRiseLogo from '../assets/datarize_logo.svg'

export function Gnb() {
  return (
    <header className="fixed w-full z-50 bg-white h-20 border-b-2 border-gray-100">
      <div className="max-w-360 w-full mx-auto flex items-center h-full">
        <Link to={'/dashboard'} className="h-9.25">
          <img src={DataRiseLogo} height={37} />
        </Link>
        <nav className="ml-7">
          <ul className="flex  items-center gap-4">
            <li className="px-3">
              <Link to={'/dashboard'}>대시보드</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

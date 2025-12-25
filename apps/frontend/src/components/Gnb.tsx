import { Link } from 'react-router-dom'
import DataRiseLogo from '../assets/datarize_logo.svg'

export function Gnb() {
  return (
    <header className="fixed w-full z-50 bg-white h-20 border-b-2 border-gray-100">
      <div className="max-w-[1440px] w-full mx-auto flex items-center h-full">
        <Link to={'/dashboard'}>
          <img src={DataRiseLogo} />
        </Link>
      </div>
    </header>
  )
}

import './styles/Loader.css'
import Sidebar from './Sidebar';


const Loader = () => {
    return (
        <div className="container">
            <Sidebar />
            <div className='box'>
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>

        </div>
    )
}

export default Loader
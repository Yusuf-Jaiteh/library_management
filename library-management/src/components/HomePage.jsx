import { useState } from 'react'
import './HomePage.css'

function HomePage(){
    
    const [count, setCount] = useState(0)

    return(
        <>
            <header>
                <nav className='home'>
                    <h1>Counter</h1>
                    <p>{count}</p>
                    <button onClick={() => setCount(count + 1)}>Increment</button>
                </nav>
            </header>
        </>
        
    )
}

export default HomePage
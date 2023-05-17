import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const containerStyle = {
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${'http://localhost:4040/img/background.jpg'})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
}

function DemoReactVite() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

function WelcomePage() {
    return (
        <>
            <form>
                <input
                    placeholder="username..."
                    type="text"
                    required
                    minlength="4"
                    maxlength="20"
                />
                <input
                    placeholder="email address..."
                    type="text"
                    required
                    minlength="4"
                    maxlength="20"
                />
                <input type="submit" />
            </form>
        </>
    )
}

function PageSelector({ actualPage }) {
    console.log('page selector bar: ' + actualPage)

    if (actualPage == 'demo') {
        return <DemoReactVite />
    } else if (actualPage == 'welcome') {
        return <WelcomePage />
    }
}

function ButtonPageDemo() {
    return <button>react demo page</button>
}

function ButtonPageWelcome() {
    return <button>welcome page</button>
}

function NavigationBar({ actualPage, setActualPage }) {
    console.log('navigation bar: ' + actualPage)
    return (
        <>
            <input
                type="button"
                value="demo"
                onClick={(e) => setActualPage('demo')}
            />
            <input
                type="button"
                value="welcome"
                onClick={(e) => setActualPage('welcome')}
            />
            <input
                type="button"
                value="empty page"
                onClick={(e) => setActualPage('empty')}
            />
            <ButtonPageDemo />
            <ButtonPageWelcome />
        </>
    )
}

function App() {
    const [actualPage, setActualPage] = useState('demo')
    return (
        <>
            <div className="container" style={containerStyle}>
                <NavigationBar
                    actualPage={actualPage}
                    setActualPage={setActualPage}
                />
                <PageSelector actualPage={actualPage} />
            </div>
        </>
    )
}

export default App

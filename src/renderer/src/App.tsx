import { useState } from 'react'
import { Telop } from './components/telop'

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  window.electron.ipcRenderer.on('tweet', (_: unknown, message: string) => {
    setMessage(message)
  })

  const [message, setMessage] = useState('hoge')

  return (
    <main className="h-[100px] w-[900px] overflow-hidden">
      <Telop message={message} key={message} />
    </main>
  )
}

export default App

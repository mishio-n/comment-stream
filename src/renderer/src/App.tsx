import { useState } from 'react'

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  window.electron.ipcRenderer.on('tweet', (_: unknown, message: string) => {
    setMessage(message)
  })

  const [message, setMessage] = useState('hoge')

  return (
    <main className="main">
      <p className="message">{message}</p>
    </main>
  )
}

export default App

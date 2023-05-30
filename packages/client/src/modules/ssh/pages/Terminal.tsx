import io, { Socket } from 'socket.io-client'
import { useEffect, useRef, useState } from 'react'
import { Terminal as XtermTerminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'
import { useNavigate } from 'react-router-dom'
const terminal = new XtermTerminal({ cursorBlink: true })
const terminalFit = new FitAddon()
export const Terminal = () => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isInit, setIsInit] = useState(true)
  const terminalRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  terminal.loadAddon(terminalFit)

  useEffect(() => {
    if (terminalRef?.current && isInit) {
      terminal.open(terminalRef?.current)
      terminalFit.fit()
      setIsInit(false)
      const newSocket = io(import.meta.env.VITE_BASE_API_URL, {
        extraHeaders: {
          Authorization: `Bearer ${localStorage.getItem('USER_TOKEN')}`,
        },
      })
      newSocket.on('connect', () => {
        terminal.write('\r\n*** Connected to backend***\r\n')
      })

      newSocket.on('data', (data) => {
        terminal.write(data)
      })
      newSocket.on('disconnect', () => {
        terminal.write('\r\n*** Disconnected from backend***\r\n')
      })

      newSocket.on('error', (data) => {
        if (data === '401') {
          navigate('/login')
        }
      })

      setSocket(newSocket)
    }
  }, [isInit])
  terminal.focus()
  terminal.onData((data) => {
    if (socket) {
      socket.emit('data', data)
    }
  })

  return (
    <div
      ref={terminalRef}
      style={{
        height: '700px',
      }}
    />
  )
}

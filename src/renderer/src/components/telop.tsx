type Props = {
  message: string
}

export const Telop: React.FC<Props> = ({ message }) => {
  return <p className="animate-telop text-2xl font-bold text-cyan-400">{message}</p>
}

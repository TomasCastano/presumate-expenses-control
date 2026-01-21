type CardProps = {
    children: React.ReactNode
    className?: string
}

const Card = ({children, className}: CardProps) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-md ${className}`}>
        {children}
    </div>
  )
}

export default Card
type FooterProps = {
    className?: string
}

const Footer = ({ className }: FooterProps) => {
    return (
        <p className={`w-full text-center text-xs text-secondary ${className}`}>
            Developed with ❤️ by <a className="underline" href="https://www.linkedin.com/in/tomascastanochica/" target="_blank" rel="noopener noreferrer">Tomas Castaño</a>
        </p>
    )
}

export default Footer
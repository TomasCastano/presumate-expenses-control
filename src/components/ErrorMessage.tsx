import { PropsWithChildren } from "react"

const ErrorMessage = ({children} : PropsWithChildren) => {
    return (
        <p className="bg-red-600/20 p-2 text-red-800 text-sm text-center rounded-md">
            {children}
        </p>
    )
}

export default ErrorMessage
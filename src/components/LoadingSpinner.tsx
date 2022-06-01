import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

type props = {
	className?: string
}

function LoadingSpinner({ className }: props) {
	return (
		<div className={`spinner ${className}`}>
			<FontAwesomeIcon className="rotate-center" icon={faSpinner} />
		</div>
	)
}

export default LoadingSpinner

import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faClock } from "@fortawesome/free-solid-svg-icons"

function Switcher() {
	const getStyle = (isActive: boolean) => {
		return {
			display: isActive ? "none" : "block",
		}
	}

	return (
		<div className="navigation-switcher">
			<NavLink to="/" style={({ isActive }) => getStyle(isActive)}>
				<FontAwesomeIcon icon={faMagnifyingGlass} />
			</NavLink>
			<NavLink to="/searches" style={({ isActive }) => getStyle(isActive)} end>
				<FontAwesomeIcon icon={faClock} />
			</NavLink>
		</div>
	)
}

export default Switcher

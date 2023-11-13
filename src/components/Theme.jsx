import { useEffect, useState } from "react";

const Theme = () => {
	const [isDarkTheme, setIsDarkTheme] = useState(false);

	const toggleTheme = () => {
		setIsDarkTheme(!isDarkTheme);
	};

	useEffect(() => {
		document.body.className = isDarkTheme ? "dark-theme" : "";
	}, [isDarkTheme]);

	return (
		<div className={isDarkTheme ? "dark-theme" : ""}>
			<button
				// style={{ border: "none", background: "light" }}
				onClick={toggleTheme}
				className=" bg-light border border-light"
			>
				{!isDarkTheme ? (
					<i className="bi bi-brightness-high"></i>
				) : (
					<i className="bi bi-moon-fill"></i>
				)}
			</button>
		</div>
	);
};

export default Theme;

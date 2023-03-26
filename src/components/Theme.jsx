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
        style={{ border: "none", backgroundColor: "#F8F9FA" }}
        onClick={toggleTheme}
      >
        {!isDarkTheme ? (
          <i className="bi bi-brightness-high"> Light Mode</i>
        ) : (
          <i className="bi bi-moon-fill"> Dark mode</i>
        )}
      </button>
    </div>
  );
};

export default Theme;

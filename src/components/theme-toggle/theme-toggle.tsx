import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Sun, Moon } from 'lucide-react';


const ThemeToggle: React.FC = () => {
  const [cookies, setCookie] = useCookies(["theme"]);
  const [theme, setTheme] = useState<"light" | "dark">("dark"); // По умолчанию 'dark'

  useEffect(() => {
    // Проверяем, есть ли сохраненная тема
    const savedTheme = cookies.theme || "dark"; // Если темы нет, используем 'dark'
    setTheme(savedTheme);
    if (savedTheme === "light") {
      document.body.classList.add("light"); // Добавляем класс light, если тема светлая
    } else {
      document.body.classList.remove("light"); // Убираем класс light
    }
  }, [cookies.theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setCookie("theme", newTheme, { path: "/", maxAge: 31536000 }); // Сохраняем тему
    if (newTheme === "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  };

  return (
    <button className={`sideBarLink ${theme === "light" ? "light" : ""} `}  onClick={toggleTheme}>
      {theme === "light" ? (
        <>
        <Sun size={25} color="white" />
        <h3 className="sideBarLinkLabel">
          Светлая тема
        </h3>
        </>
      ) : (
        <>
        <Moon size={25} color="white" />
        <h3 className="sideBarLinkLabel">
          Темная тема
        </h3>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;

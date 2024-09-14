import { MdDarkMode } from "react-icons/md";
import { FaSun } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { selectThemeMode, toggleTheme } from "../features/theme/themeSlice";

const AppTitleBar = () => {
    const dispatch = useDispatch();
    const themeMode = useSelector(selectThemeMode);

    return (
        <div
            className="flex flex-row flex-wrap justify-between items-center text-4xl pb-10">
            {/* Main title of the application */}
            <h1 className="">Todo List</h1>
            {/* Toggle theme icon based on the current theme mode */}
            {themeMode === "light" ? (
                <MdDarkMode onClick={() => dispatch(toggleTheme())} />
            ) : (
                <FaSun onClick={() => dispatch(toggleTheme())} />
            )}
        </div>
    );
}

export default AppTitleBar;
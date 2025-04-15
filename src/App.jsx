import { useEffect, useState } from "react";
import "./App.css"
import Alert from './components/shared/alert';
import { Sidebar } from "./components/sidebar";


const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsSidebarOpen(mediaQuery.matches);
    const handleResize = (e) => setIsSidebarOpen(e.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <>
      <Alert />
      <div className="flex p-6 max-h-screen">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        {/* Main Content */}
        <main className={`flex flex-col gap-3 flex-1 transition-transform duration-1000 px-0 md:px-6 rounded-2xl overflow-y-hidden ${isSidebarOpen ? "ml-8 lg:ml-80" : "ml-8"}`}>
          <div className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-2xl mb-2">
            <h1 className="hidden text-2xl font-bold text-blue-500 lg:inline-block mb-6">Task Manager</h1>
            {/* Add Task */}
            <div className="flex flex-col sm:flex-row items-center gap-3 lg:mb-6">
              {/* <AddTask Component/> */}
            </div>
          </div>
          {/* Task List */}
          <div className="bg-white dark:bg-gray-800 shadow-lg p-2 md:p-10 overflow-y-auto max-h-10/12 rounded-2xl">
            <ul className="flex flex-col gap-5 py-2">
              {/* <TaskList Component/> */}
            </ul>
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
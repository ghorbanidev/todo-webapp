import "./App.css"
import Alert from './components/shared/alert';


const App = () => {
  return (
    <>
      <Alert />
      <div className="flex p-6 max-h-screen">
        {/* <Sidebar Component/>*/}
        {/* Main Content */}
        <main className={`flex flex-col gap-3 flex-1 transition-transform duration-1000 px-0 md:px-6 rounded-2xl overflow-y-hidden ml-8`}>
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
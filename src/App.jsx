import { Provider } from 'react-redux';
import store from './app/store';
import TodoAppContainer from './components/TodoAppContainer';

const App = () => {

  return (
    <Provider store={store}>
        {/* Main app container with background and text color based on theme */}
        <div className='bg-white w-screen min-h-screen h-full dark:bg-gray-900 text-black dark:text-white'>
          <TodoAppContainer /> {/* Main component of the todo application */}
        </div>
    </Provider>
      
  );
}

export default App

import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="  ">
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default App;

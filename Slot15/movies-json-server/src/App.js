// src/App.js
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieManager from "./pages/MovieManager";

function App() {
  return (
    <div className="App">
      {/* MovieManager là trang chính quản lý phim */}
      <MovieManager />
    </div>
  );
}

export default App;

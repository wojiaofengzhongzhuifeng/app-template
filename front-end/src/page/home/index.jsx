import {Link} from "react-router-dom";

const Home = ()=>{
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/category">category</Link>
          </li>
          <li>
            <Link to="/error">error</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
export default Home

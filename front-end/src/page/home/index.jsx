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
            <Link to="/tag">tag</Link>
          </li>
          <li>
            <Link to="/content">content</Link>
          </li>
          <li>
            <Link to="/error">error</Link>
          </li>
          <li>
            <Link to="/file-upload">file upload</Link>
          </li>
          <li>
            <Link to="/lang">国际化</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
export default Home

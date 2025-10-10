// src/components/Footer/MyFooter.jsx
import Button from "react-bootstrap/Button";
import "./Footer.css";

function MyFooter({ author = "KhoaDPD", email = "khoadang.ib6f@gmail.com", linkGithub = "Movie Management Project" }) {
  return (
    <footer>
      <p>Author: {author}</p>
      <p>Created by: {email}</p>
      <p>&copy; {new Date().getFullYear()} {author}. All rights reserved</p>
      <Button variant="link" href="#" >My Link Github: {linkGithub}</Button>
    </footer>
  );
}

export default MyFooter;

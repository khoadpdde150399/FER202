import React from "react";
import { Button } from "react-bootstrap"; // ✅ use named import
import "./Footer.css";

function MyFooter({
  author = "KhoaDPD",
  email = "khoadang.ib6f@gmail.com",
  linkGithub = "Movie Management Project",
}) {
  return (
    <footer className="text-center py-3 bg-light">
      <p>Author: {author}</p>
      <p>Created by: {email}</p>
      <p>&copy; {new Date().getFullYear()} {author}. All rights reserved.</p>
      <Button
        variant="link"
        href="#"
      >
        My GitHub Link: {linkGithub}
      </Button>
    </footer>
  );
}

export default MyFooter;

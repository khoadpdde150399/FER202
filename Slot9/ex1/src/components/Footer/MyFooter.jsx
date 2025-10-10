import  Button from "react-bootstrap/Button";

function MyFooter() {
  return (
    <footer>
      <p>Author: KhoaDP</p>
      <p>Created by: khoadang.ib6f@gmail.com </p>
      <p>&copy; {new Date().getFullYear()} KhoaDP. All rights reserved </p>
      <Button variant="link" href="" >My Link Github's project: Movies Management </Button>
    </footer>
  )
}
export default MyFooter;

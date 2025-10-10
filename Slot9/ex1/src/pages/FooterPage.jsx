import MyFooter from "../components/Footer/MyFooter";

export default function FooterPage() {
  return (
    <div className="footer">
      <h2 style={{textAlign: "center", maxWidth: 600, margin: "0 auto"}}>Footer Section</h2>
      <MyFooter 
        author="KhoaDP" 
        email="khoadang.ib6f@gmail.com" 
        linkGithub="Movie Management Project" 
      />
    </div>
  );
}

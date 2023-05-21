import Navigation from "../components/Navigation";
import { useSelector } from "react-redux";


function ErrorPage() {
  const error = useSelector((state) => state.error);


  let title = "Desila se greska.";
  let message = "Dosio se problem u aplikaciji.";

 if(error){
    message = error;
 }


  return (
    <>
      <Navigation />
      <main>
        <h1>{title}</h1>
        <p>{message}</p>
      </main>
    </>
  );
}

export default ErrorPage;

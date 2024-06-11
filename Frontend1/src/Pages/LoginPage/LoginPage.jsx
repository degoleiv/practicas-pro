import "./LoginPage.css";

import FirstBar from "../../Components/FirstBar/FirstBar";
import { useEffect, useState } from 'react';
import {useAuthAndApi} from "../../Hocks/useAuthAndApi"; // Importa useAuthAndApi
import { Footer } from "../../Components/Footer/Footer";
import { NewsFeedPage } from "../NewsFeedPage/NewsFeedPage";
import { toast } from "react-toastify";

export function LoginPage() {
  const { isAuthenticated, error, login } = useAuthAndApi(); // Usa useAuthAndApi
  useEffect(() => {
    
    if (error) {
      toast.error(`Error: ${error}`);
    }
    if(isAuthenticated){
      console.log(isAuthenticated);
      
    }
  },[error, isAuthenticated]);
  return (
    <>
      {isAuthenticated ? (
        <NewsFeedPage />
      ) : (
        <>
        <header>
            <FirstBar />
        </header>
        <main className="login-content">
            <section className="content">
            <img src="src\assets\workingstudent.jpg" className="img-login" />
            <h1 className="title">Practicas Profesionales Uniminuto</h1>
            <h2 className="subtitulo">Identifíquese usando su cuenta en:</h2>
            <button onClick={login} className="boton-login">INGRESAR</button>
            </section>
        </main>
        <Footer />
        </>
      )}
    </>
  );
}

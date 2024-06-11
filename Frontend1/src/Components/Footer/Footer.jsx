import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import './Footer.css'
export function Footer() {
  return (
    <footer>
      <div className="container container--custom">
        <div className="main-footer">
          <div className="logo">
            <a href="">
              <img
                src="src\assets\Logo uniminuto.png"
                alt="Logo Uniminuto Footer"
                className="logo-img"
              />
            </a>
          </div>
          <div className="textcenter">
            <p>
              <span>Todos los derechos Reservados. UNIMINUTO &copy;2024</span>
              <span>
                
                Institución de Educación Superior sujeta a inspección y
                vigilancia por el Ministerio de Educación Nacional
              </span>
              <span>
                Personería jurídica: Resolución 10345 del 1 de agosto de 1990
                MEN
              </span>
              <strong>CORPORACIÓN UNIVERSITARIA MINUTO DE DIOS</strong>
            </p>
          </div>
          <div className="social-network">
            <a
              href="https://www.facebook.com/UNIMINUTOCOLOMBIA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={30} />
            </a>
            <a
              href="https://twitter.com/uniminutocol"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={30} />
            </a>
            <a
              href="https://www.instagram.com/uniminutocol"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={30} />
            </a>
            <a
              href="https://es.linkedin.com/school/uniminutocol"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={30} />
            </a>
            <a
              href="https://www.youtube.com/channel/UCYripsaQMUFIufEMKisPTsw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={30} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

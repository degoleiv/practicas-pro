

import { Footer } from '../Footer/Footer';
import { NavBar } from '../NavBar/NavBar';
import './TemplateLayout.css'
export function TemplateLayout({ children }) {
  return (
    <>
      <NavBar />
      <main className='background-layout'>
        <div className='content-layout'>
        {children}
        </div>
      </main>
      <Footer />
    </>
  );
}


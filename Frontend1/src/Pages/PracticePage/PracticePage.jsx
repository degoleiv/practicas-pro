import { Stepper } from "../../Components/Stepper/Stepper";
import { TemplateLayout } from "../../Components/TemplateLayout/TemplateLayout";
import { PageBar } from "../../Components/PageBar/PageBar";

import './PracticePage.css'

export function PracticePage (){

    return (
        <>
        <TemplateLayout>
        
      
        <article className="practice-layout">
            <PageBar/>
            <Stepper ></Stepper>    
            
        </article>
        <aside></aside>
        
        
        </TemplateLayout>

        </>
    )
}
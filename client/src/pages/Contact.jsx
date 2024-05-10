import { useState , useEffect } from 'react'

const Contact = () => {
    
    useEffect(() => {
        
        // Scroll remis à zéro
        scrollTo(0,0)
        
    }, [])
    
    return (
        <main className="contact-page-main">
            
            {/****** Bloc du formulaire *******/}
            <article className="contactpage-article">
            
            <h1 className="contactpage-title">Formulaire de contact</h1>
                
                {/***** Formulaire de contact ***********/}
                <form>
                  
                  <fieldset className="contactpage-input-label">
                    <input name="username" type="text" className="contactpage-input" required />
                    <label htmlFor="username" >Prénom</label>
                  </fieldset>
                  
                  <fieldset className="contactpage-input-label">
                    <input name="email" type="text" className="contactpage-input" required />
                    <label htmlFor="email" >Adresse email</label>
                  </fieldset>
                  
                  <label className="contactpage-select-label">Sujet de votre message</label>
                  <select name="subjectMessage" className="contactpage-select">
                      <option defaultValue> --- </option>
                      <option value="Jeux"> Jeux </option>
                      <option value="prix"> Prix </option>
                      <option value="autres"> Autres </option>
                  </select>
                  
                  <textarea name="message" type="text" className="contactpage-textarea" placeholder="Votre message" required />
                    
                  <button type="submit" className="contactpage-form-button"> Envoyer </button>
                
                </form>
            
            </article>
            
        </main>
    )
}

export default Contact
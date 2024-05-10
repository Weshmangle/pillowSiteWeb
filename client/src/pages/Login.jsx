import { useState , useEffect } from 'react'

const Login = () => {
  
    useEffect(() => {
        
        // Scroll remis à zéro
        scrollTo(0,0)
        
    }, [])
    
    return (
        <main className="login-page-main container">
        
            {/****** Bloc du formulaire *******/}
            <article className="loginpage-article">
            
            <h1 className="loginpage-title">Identifiez-vous</h1>
                
                {/**** Formulaire de connexion  ***********/}
                <form>
                  
                  <fieldset className="loginpage-input-label">
                    <input name="username" type="text" className="loginpage-input" required />
                    <label htmlFor="username" >Identifiant</label>
                  </fieldset>
                  
                  <fieldset className="loginpage-input-label">
                    <input name="password" type="password" className="loginpage-input" required />
                    <label htmlFor="password" >Mot de passe</label>
                  </fieldset>
                  
                  <button type="submit" className="loginpage-form-button"> Se connecter </button>
                
                </form>
            
            </article>
            
        </main>
    )
}

export default Login
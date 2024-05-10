const Newsletter = () => {
    
    return (
        <article className="newsletter-article">
            <h2>Inscrivez-vous à notre newsletter</h2>
            <p className="newsletter-paragraph">Donec in vestibulum urna. Sed aliquam tellus at metus vehicula ultricies. Integer semper viverra velit, non efficitur libero aliquam non. Suspendisse potenti. Proin in odio vel sapien cursus viverra. In hac habitasse platea dictumst.</p>
            
            
            {/**** Formulaire ****/}
            <form>
                <fieldset className="newsletter-fieldset">
                    <input name="email" type="text" required />
                    <label htmlFor="email" >Adresse email</label>
                 </fieldset>
                 
                 <button className="newsletter-button" >S'abonner</button>
            </form>
        </article>
    )
}

export default Newsletter
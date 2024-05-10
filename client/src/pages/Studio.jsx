import { useEffect } from 'react'


const Studio = () => {
    
    
    useEffect(() => {
        
        // Scroll remis à zéro
        scrollTo(0,0)
        
    }, [])
    
    
    return (
        <main className="studio-page-main container">
            
            {/****** Article **********/}
            <article className="studio-page-article">
                <p>Lorem ipsum</p>
            </article>
            
        </main>
    )
}

export default Studio
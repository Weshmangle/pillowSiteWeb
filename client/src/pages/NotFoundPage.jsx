import { useEffect } from 'react'

const NotFoundPage = () => {
    
    useEffect(() => {

        scrollTo(0,0)
        document.body.style.overflow = ""
        
    }, [])
    
    return (
        <main className="container notfoundpage-main">
            <h1>Cette page n'existe pas</h1>
            
            <img className="img-responsive" src="../../Logo3.png" alt="logo Pillow Interactive"/>
        </main>
    )
}

export default NotFoundPage
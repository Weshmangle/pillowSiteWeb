import { useEffect } from 'react'


const Studio = () => {
    
    const paragArray = [
            {
               id: 0,
               title : "Lorem ipsum",
               paragraph : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare quam eget justo luctus, sed convallis sapien tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam in eleifend lacus. Sed ut leo magna. Maecenas consectetur mauris et neque condimentum, nec venenatis odio faucibus. Curabitur sed est eget justo vehicula tempor nec a mauris. Proin suscipit auctor urna, nec commodo mi lobortis id. Integer suscipit, nisi vitae dapibus hendrerit, dui quam congue purus, vitae aliquam elit ligula sit amet ligula. Vivamus at velit in ligula interdum ullamcorper. Etiam tempus, ligula sit amet venenatis volutpat, mauris sapien bibendum urna, id malesuada ligula magna sed lectus. Suspendisse potenti. Nunc auctor feugiat justo, vitae tempor elit efficitur et. Vivamus tempor velit vel libero vehicula, nec elementum libero convallis. Curabitur vel risus vel turpis pharetra faucibus eget ut mauris."
            },
            
            {
               id: 1,
               title : "Lorem ipsum",
               paragraph : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare quam eget justo luctus, sed convallis sapien tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam in eleifend lacus. Sed ut leo magna. Maecenas consectetur mauris et neque condimentum, nec venenatis odio faucibus. Curabitur sed est eget justo vehicula tempor nec a mauris. Proin suscipit auctor urna, nec commodo mi lobortis id. Integer suscipit, nisi vitae dapibus hendrerit, dui quam congue purus, vitae aliquam elit ligula sit amet ligula. Vivamus at velit in ligula interdum ullamcorper. Etiam tempus, ligula sit amet venenatis volutpat, mauris sapien bibendum urna, id malesuada ligula magna sed lectus. Suspendisse potenti. Nunc auctor feugiat justo, vitae tempor elit efficitur et. Vivamus tempor velit vel libero vehicula, nec elementum libero convallis. Curabitur vel risus vel turpis pharetra faucibus eget ut mauris."
            },
            
            {
               id: 2,
               title : "Lorem ipsum",
               paragraph : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare quam eget justo luctus, sed convallis sapien tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam in eleifend lacus. Sed ut leo magna. Maecenas consectetur mauris et neque condimentum, nec venenatis odio faucibus. Curabitur sed est eget justo vehicula tempor nec a mauris. Proin suscipit auctor urna, nec commodo mi lobortis id. Integer suscipit, nisi vitae dapibus hendrerit, dui quam congue purus, vitae aliquam elit ligula sit amet ligula. Vivamus at velit in ligula interdum ullamcorper. Etiam tempus, ligula sit amet venenatis volutpat, mauris sapien bibendum urna, id malesuada ligula magna sed lectus. Suspendisse potenti. Nunc auctor feugiat justo, vitae tempor elit efficitur et. Vivamus tempor velit vel libero vehicula, nec elementum libero convallis. Curabitur vel risus vel turpis pharetra faucibus eget ut mauris."
            },
            
            {
               id: 3,
               title : "Lorem ipsum",
               paragraph : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare quam eget justo luctus, sed convallis sapien tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam in eleifend lacus. Sed ut leo magna. Maecenas consectetur mauris et neque condimentum, nec venenatis odio faucibus. Curabitur sed est eget justo vehicula tempor nec a mauris. Proin suscipit auctor urna, nec commodo mi lobortis id. Integer suscipit, nisi vitae dapibus hendrerit, dui quam congue purus, vitae aliquam elit ligula sit amet ligula. Vivamus at velit in ligula interdum ullamcorper. Etiam tempus, ligula sit amet venenatis volutpat, mauris sapien bibendum urna, id malesuada ligula magna sed lectus. Suspendisse potenti. Nunc auctor feugiat justo, vitae tempor elit efficitur et. Vivamus tempor velit vel libero vehicula, nec elementum libero convallis. Curabitur vel risus vel turpis pharetra faucibus eget ut mauris."
            },
            
            {
               id: 4,
               title : "Lorem ipsum",
               paragraph : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare quam eget justo luctus, sed convallis sapien tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam in eleifend lacus. Sed ut leo magna. Maecenas consectetur mauris et neque condimentum, nec venenatis odio faucibus. Curabitur sed est eget justo vehicula tempor nec a mauris. Proin suscipit auctor urna, nec commodo mi lobortis id. Integer suscipit, nisi vitae dapibus hendrerit, dui quam congue purus, vitae aliquam elit ligula sit amet ligula. Vivamus at velit in ligula interdum ullamcorper. Etiam tempus, ligula sit amet venenatis volutpat, mauris sapien bibendum urna, id malesuada ligula magna sed lectus. Suspendisse potenti. Nunc auctor feugiat justo, vitae tempor elit efficitur et. Vivamus tempor velit vel libero vehicula, nec elementum libero convallis. Curabitur vel risus vel turpis pharetra faucibus eget ut mauris."
            }
        ]
    
    useEffect(() => {
        
        // Scroll remis à zéro
        scrollTo(0,0)
        
    }, [])
    
    
    return (
        <main className="studio-page-main container">
            <h1 className="studio-page-title">Notre studio</h1>
            
            {/****** Contenu de la page **********/}
            <article className="studio-page-article">
                {paragArray.map((oneParag, index) => (
                    
                    <>
                    {/**** Section avec un paragraphe ****/}
                    <section key={oneParag.id} className="studio-page-section">
                        <h2>{oneParag.title}</h2>
                        <p className="studio-page-paragraph">{oneParag.paragraph}</p>
                    </section>
                    </>
                    
                ))}
            </article>
            
        </main>
    )
}

export default Studio
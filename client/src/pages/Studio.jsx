import { useEffect , useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'


const Studio = () => {
    
    const {user} = useAuth()
    
    const [editInputValue, setEditInputValue] = useState({
        title : "",
        teamMember : [{},{},{},{},{},{}],
        paragTitle : ["","","","",""],
        paragText : ["","","","",""]
    })
    const studioPageId = "6659e3e30f89f9ec4aa3e5db"
    
    // const paragArray = [
    //         {
    //           id: 0,
    //           title : "Lorem ipsum",
    //           paragraph : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare quam eget justo luctus, sed convallis sapien tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam in eleifend lacus. Sed ut leo magna. Maecenas consectetur mauris et neque condimentum, nec venenatis odio faucibus. Curabitur sed est eget justo vehicula tempor nec a mauris. Proin suscipit auctor urna, nec commodo mi lobortis id. Integer suscipit, nisi vitae dapibus hendrerit, dui quam congue purus, vitae aliquam elit ligula sit amet ligula. Vivamus at velit in ligula interdum ullamcorper. Etiam tempus, ligula sit amet venenatis volutpat, mauris sapien bibendum urna, id malesuada ligula magna sed lectus. Suspendisse potenti. Nunc auctor feugiat justo, vitae tempor elit efficitur et. Vivamus tempor velit vel libero vehicula, nec elementum libero convallis. Curabitur vel risus vel turpis pharetra faucibus eget ut mauris."
    //         },
            
    //         {
    //           id: 1,
    //           title : "Lorem ipsum",
    //           paragraph : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare quam eget justo luctus, sed convallis sapien tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam in eleifend lacus. Sed ut leo magna. Maecenas consectetur mauris et neque condimentum, nec venenatis odio faucibus. Curabitur sed est eget justo vehicula tempor nec a mauris. Proin suscipit auctor urna, nec commodo mi lobortis id. Integer suscipit, nisi vitae dapibus hendrerit, dui quam congue purus, vitae aliquam elit ligula sit amet ligula. Vivamus at velit in ligula interdum ullamcorper. Etiam tempus, ligula sit amet venenatis volutpat, mauris sapien bibendum urna, id malesuada ligula magna sed lectus. Suspendisse potenti. Nunc auctor feugiat justo, vitae tempor elit efficitur et. Vivamus tempor velit vel libero vehicula, nec elementum libero convallis. Curabitur vel risus vel turpis pharetra faucibus eget ut mauris."
    //         },
            
    //         {
    //           id: 2,
    //           title : "Lorem ipsum",
    //           paragraph : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare quam eget justo luctus, sed convallis sapien tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam in eleifend lacus. Sed ut leo magna. Maecenas consectetur mauris et neque condimentum, nec venenatis odio faucibus. Curabitur sed est eget justo vehicula tempor nec a mauris. Proin suscipit auctor urna, nec commodo mi lobortis id. Integer suscipit, nisi vitae dapibus hendrerit, dui quam congue purus, vitae aliquam elit ligula sit amet ligula. Vivamus at velit in ligula interdum ullamcorper. Etiam tempus, ligula sit amet venenatis volutpat, mauris sapien bibendum urna, id malesuada ligula magna sed lectus. Suspendisse potenti. Nunc auctor feugiat justo, vitae tempor elit efficitur et. Vivamus tempor velit vel libero vehicula, nec elementum libero convallis. Curabitur vel risus vel turpis pharetra faucibus eget ut mauris."
    //         },
            
    //         {
    //           id: 3,
    //           title : "Lorem ipsum",
    //           paragraph : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare quam eget justo luctus, sed convallis sapien tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam in eleifend lacus. Sed ut leo magna. Maecenas consectetur mauris et neque condimentum, nec venenatis odio faucibus. Curabitur sed est eget justo vehicula tempor nec a mauris. Proin suscipit auctor urna, nec commodo mi lobortis id. Integer suscipit, nisi vitae dapibus hendrerit, dui quam congue purus, vitae aliquam elit ligula sit amet ligula. Vivamus at velit in ligula interdum ullamcorper. Etiam tempus, ligula sit amet venenatis volutpat, mauris sapien bibendum urna, id malesuada ligula magna sed lectus. Suspendisse potenti. Nunc auctor feugiat justo, vitae tempor elit efficitur et. Vivamus tempor velit vel libero vehicula, nec elementum libero convallis. Curabitur vel risus vel turpis pharetra faucibus eget ut mauris."
    //         },
            
    //         {
    //           id: 4,
    //           title : "Lorem ipsum",
    //           paragraph : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare quam eget justo luctus, sed convallis sapien tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam in eleifend lacus. Sed ut leo magna. Maecenas consectetur mauris et neque condimentum, nec venenatis odio faucibus. Curabitur sed est eget justo vehicula tempor nec a mauris. Proin suscipit auctor urna, nec commodo mi lobortis id. Integer suscipit, nisi vitae dapibus hendrerit, dui quam congue purus, vitae aliquam elit ligula sit amet ligula. Vivamus at velit in ligula interdum ullamcorper. Etiam tempus, ligula sit amet venenatis volutpat, mauris sapien bibendum urna, id malesuada ligula magna sed lectus. Suspendisse potenti. Nunc auctor feugiat justo, vitae tempor elit efficitur et. Vivamus tempor velit vel libero vehicula, nec elementum libero convallis. Curabitur vel risus vel turpis pharetra faucibus eget ut mauris."
    //         }
    //     ]
    // const teamArray = [
    //         {
    //             id: 0,
    //             name: "John Doe",
    //             role: "Commercial",
    //             img: "./src/assets/img-team-member.jpg"
    //         },
            
    //         {
    //             id: 1,
    //             name: "John Doe",
    //             role: "Gameplay developper C# Unity",
    //             img: "./src/assets/img-team-member.jpg"
    //         },
            
    //         {
    //             id: 2,
    //             name: "John Doe",
    //             role: "Lead Gameplay developper C# Unity",
    //             img: "./src/assets/img-team-member.jpg"
    //         }
    //     ]
    
    
    useEffect(() => {
        
        // Scroll remis à zéro
        scrollTo(0,0)
        
        document.body.style.overflow = ""
        
        const fetchStudioPage = async () => {
            
            try {
                
                const serverRes = await axios.get(`/api/studio/get/${studioPageId}
`)
                setEditInputValue(serverRes.data)
                
            } catch (e) {}
            
        }
        
        fetchStudioPage()
        
    }, [])
    
    
    return (
        <main className="studio-page-main">
        
            <h1 className="studio-page-title">{editInputValue.title}{user && user.userToken && <i  className="fa-solid fa-pen admin-studio-update-pen"></i>}</h1>
            
            {/****** Contenu de la page **********/}
            <article className="studio-page-article">
                {editInputValue.paragTitle.map((oneParag, index) => (
                    
                    <>
                    {/**** Section avec un paragraphe ****/}
                    <section key={oneParag.id} className="studio-page-section">
                        <h2>{oneParag}</h2>{user && user.userToken && <i  className="fa-solid fa-pen admin-studio-update-pen"></i>}
                        <p className="studio-page-paragraph">{editInputValue.paragText[index]}</p>
                    </section>
                    </>
                    
                ))}
                
            {/***** Section présentation de l'équipe *****/}
                <section>
                    <h2> Notre équipe </h2>
                    <div className="studio-page-team-flex">
                        {editInputValue.teamMember.map((oneMember, index) => (
                            <section className="studio-page-team-cards" key={index}>
                                {user && user.userToken && <i  className="fa-solid fa-pen admin-studio-update-memberImg-pen"></i>}
                                <img className="img-responsive" src={import.meta.env.VITE_API_URL+oneMember.memberImg} alt={`photo de ${oneMember.name}`} />
                                <h3 className="studio-page-edit-title">{oneMember.name}{user && user.userToken && <i  className="fa-solid fa-pen admin-studio-update-pen"></i>}</h3>
                                <p>{oneMember.role}</p>
                            </section>
                        ))}
                    </div>
                </section>
                
            </article>
            
        </main>
    )
}

export default Studio
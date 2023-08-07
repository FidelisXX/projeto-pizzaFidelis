import Head from 'next/head'
import {Header} from '../../components/Header'
import styles from './styles.module.scss'
import {setupAPIClient} from '../../services/api'
import {canSSRAuth} from '../../utils/canSSRAuth'
import {FiUpload} from 'react-icons/fi'
import {useState, ChangeEvent, FormEvent} from 'react'
import {toast} from 'react-toastify'

type ItemProps = {
    id: string,
    name: string,
}
interface CategoryProps{
    categoryList: ItemProps[];
}

export default function Product({categoryList}: CategoryProps){
   
    const [name, setName] =useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    const [categories, setCategories] = useState(categoryList || [])
    const [categoySelected, setCategorySelected] = useState(0)

    function handleFile(event: ChangeEvent<HTMLInputElement> ){
                if(!event.target.files){
                    return;
                }
                const image = event.target.files[0];
                if(!image){
                    return;
                }

                if(image.type ==='image/jpeg' || image.type === 'image/png'){
                    setImageAvatar(image);
                    setAvatarUrl(URL.createObjectURL(event.target.files[0]))
                }
            }

                //quando seleciona nova categoria na lista
            function handleChangeCategory(event){
                console.log("Categoria selecionada", categories[event.target.value])
                setCategorySelected(event.target.value)
            }

            async function handleRegister(event: FormEvent){
                    event.preventDefault();
                    try{
                        const data = new FormData();

                        data.append('name', name);
                        data.append('price', price);
                        data.append('description', description);
                        data.append('category_id', categories[categoySelected].id)
                        data.append('file', imageAvatar);

                        if(name === '' || price === '' || description === '' || imageAvatar === null ){
                            toast.error('Preencha todos os campos')
                            return;
                        }
                     

                        const apiClient = setupAPIClient();
                        
                        await apiClient.post('/product', data);

                        toast.success('Produto cadastrado com sucesso!')

                    }catch(err){
                        console.log("caindo aqui", err)
                        toast.error('Erro ao cadastrar produto')
                  }
            }
            

    return(
        <>
        <Head>
            <title>Novo produto - Pizza Fidelis</title>
        </Head>
        <div>
        <Header/>
        <main className={styles.container}>
            <h1>Novo produto</h1>

            <form className={styles.form} onSubmit={handleRegister}>

            <label className={styles.labelAvatar} >
                    <span>
                        <FiUpload size={30} color="#fff"/>
                    </span>

                    <input type="file" accept="image/png, image/jpeg" onChange={handleFile}/>

                    {avatarUrl && (
                        <img 
                        className={styles.preview}
                        src={avatarUrl}
                        alt="foto do produto"
                        width={250}
                        height={250}/>
                    )}

                </label>

                <select value={categoySelected} onChange={handleChangeCategory}>
                    {categories.map((item, index) => {
                        return(
                            <option key={item.id} value={index}>
                                {item.name}
                            </option>
                        )
                    })}
                </select>
                <input 
                type="text"
                 placeholder="Digite o nome do produto"
                 className={styles.input}
                 value={name}
                 onChange={(e)=> setName(e.target.value)}/>

                <input 
                type="text"
                 placeholder="Preço do produto"
                 className={styles.input}
                 value={price}
                 onChange={(e)=> setPrice(e.target.value)}/>

                 <textarea
                 placeholder="Descreva seu produto..."
                 className={styles.input}
                 value={description}
                 onChange={(e)=> setDescription(e.target.value)}/>

                 <button 
                 type="submit"
                 className={styles.button}>
                       Cadastrar
                 </button>
            </form>
        </main>

        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx)=>{
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/category');
    
    return{
        props:{ 
            categoryList: response.data
           }
        }
})
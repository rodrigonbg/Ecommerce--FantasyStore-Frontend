import './Profile.scss'
import React from 'react'
import { UserContext } from '../../context/UserContext/UserContext'
import {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import InfoUser_Card from '../../components/InfoUser_Card/InfoUser_Card'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import LogIn_form from '../../components/LogIn_form/LogIn_form'
import SectionTitleH2 from '../../components/SectionTitleH2/SectionTitleH2'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import UploadProduct from '../../components/UploadProduct/UploadProduct'
import UserProducts from '../../components/UserProducts/UserProducts'
import UploadDocuments from '../../components/UploadDocuments/UploadDocuments'
import UserTickets from '../../components/UserTickets/UserTickets'
import Users from '../../components/Users/Users'
  
const Profile = () => {
    const [radioValue, setRadioValue] = useState('1');
    const [option, setOption] = useState();

    const {validActiveSession, user, nombre, apellido, rol} = useContext(UserContext)
    const [errorUser, setErrorUser] = useState(null);
    const [reload, setReload] = useState(0);

    const radios = [
        { name: 'Infomacion del usuario', value: '1' },
        { name: 'Subir un producto', value: '2' },
        { name: rol==='admin'? 'Productos de Fantasy Store' : 'Mis productos', value: '3' },
        { name: rol==='admin'?'Usuarios registrados' :'Mis Compras' , value: rol==='admin'? '6' :'4' },
        { name:  rol==='admin'? 'Tickets': 'Cargar Documentos', value: rol==='admin'? '7' :'5' },
    ];

    useEffect(()=>{
        const valid= async()=>{
            await validActiveSession()
        }
        valid()

        if(!user){
            setErrorUser((
                <LogIn_form>
                    <SectionTitleH2 text={'Ingrese para poder ver su perfil'}/>
                </LogIn_form>
            ))
        }else{
            setErrorUser(null)
        }

    },[user, reload, rol])


    useEffect(()=>{

        switch (radioValue) {
            
            case '1':
                setOption(<InfoUser_Card/>)
                break;

            case '2':
                setOption(<>
                            <UploadProduct/>                 
                            <div className='setDocsLink'>
                                {rol === 'usuario' && <button onClick={()=>{setRadioValue('5')}} className="linkDocs">{'Ser premium'}</button>}
                            </div>
                        </>)
                break;
                
            case '3':
                setOption(<UserProducts />)
                break;

            case '4':
                setOption(<UserTickets/>)
                break;

            case '5':
                setOption(<UploadDocuments setReload={setReload}/>)
                break;

            case '6':
                setOption(<Users/>)
                break;

            case '7':
                setOption(<UserTickets/>)
                break;

            default:
                setOption((<>Seleccione una opcion válida</>))
                break;
          }

    },[radioValue, user])

  return (
    <div>
        {
        errorUser ? 
            errorUser 
            : 
            <div>

                <Link to={'/'} className="linkBack">{'Volver al Home'}</Link>

                <SectionTitle text={`${nombre} ${apellido}`}/>
                
                <section>
                    <ButtonGroup>
                        {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant={'outline-success'}
                                name="radio"
                                value={radio.value}
                                checked={radioValue === radio.value}
                                onChange={(e) => setRadioValue(e.currentTarget.value)}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </section>

                <section>
                    {option}
                </section>

            </div>
        }

    </div>
  )
}

export default Profile
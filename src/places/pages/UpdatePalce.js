import React ,{useState , useEffect} from "react";
import './NewPlace.css'
import { useParams } from 'react-router-dom';
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validator";
import { useForm } from "../../shared/hooks/FormHooks";
import Card from "../../shared/components/UIElements/Card";
const DUMMY_PLACES = [
    {
      id: 'p1',
      title: 'Empire State Building',
      description: 'One of the most famous sky scrapers in the world!',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
      address: '20 W 34th St, New York, NY 10001',
      location: {
        lat: 40.7484405,
        lng: -73.9878584
      },
      creator: 'u1'
    },
    {
      id: 'p2',
      title: 'Emp. State Building',
      description: 'One of the most famous sky scrapers in the world!',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
      address: '20 W 34th St, New York, NY 10001',
      location: {
        lat: 40.7484405,
        lng: -73.9878584
      },
      creator: 'u2'
    }
  ];

const UpdatePalce=()=>{
    const placeId = useParams().placeId;
const [isLoading , setLoading] =useState(true)
    const [formState, InputHandler ,setFormData] =useForm(
        {
            title:{
                value :""    ,
                isValid : false
            },
            description:{
                value :"" ,
                isValid:false
            }
        }
        ,false
    );
    const identifiedPalce = DUMMY_PLACES.find(p=>p.id===placeId);
    useEffect(()=>{
      if(identifiedPalce){
        setFormData(

          {  title:{
                value :identifiedPalce.title    ,
                isValid : true
            },
            description:{
                value :identifiedPalce.description ,
                isValid:true
            }
        }
        ,true)
      }
  
    setLoading(false)
    },[setFormData,identifiedPalce])

    if(!identifiedPalce){
        
        return(  <div className="center">
        <Card>couldn't find a place</Card>

       </div>);
     

    }
    if(isLoading){
      return(  <div className="center">
      <h2>Loading ...</h2>

     </div>);
    }
    return  <form className="place-form">
<Input id="title"
type="text"
element ="input"
label="title"
validators ={[VALIDATOR_REQUIRE()]}
errorText="please enter a valid texrt"
onInput ={InputHandler}
intialValue= {formState.inputs.title.value}
intialValid={formState.inputs.title.isValid}
/>
<Input id="description"
type="text"
element ="texterea"
label="description"
validators ={[VALIDATOR_MINLENGTH(5)]}
errorText="please enter a valid description with min(5) char"
onInput ={InputHandler}
intialValue= {formState.inputs.description.value}
intialValid={formState.inputs.description.isValid}
/>
<Button type='submit'  disabled ={!formState.isValid}>Update Palce</Button>
    </form>
};



export default UpdatePalce;
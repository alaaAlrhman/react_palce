import React,{useState , useContext} from 'react';
import Model from '../../shared/components/UIElements/Model';
import Card from '../../shared/components/UIElements/Card';
import './PlaceItem.css';
import Button from '../../shared/components/FormElements/Button'
import { authCotext } from '../../shared/context/auth-context';
const PlaceItem = props => {
  const auth = useContext(authCotext)
  const [showDeletectionModel , setDeletionModel] =useState(false);

  const [showMap , SetShowMap] =useState(false);
  const OpenMapHandler =()=>SetShowMap(true)
  const CloseMapHandler =()=>SetShowMap(false)
  const showDeletion=()=>{setDeletionModel(true)}
  const cancelDeletion=()=>{setDeletionModel(false)}
  const confirmDeletion=()=>{
    setDeletionModel(false)
    console.log("deleting..")
  }
  return (
    <React.Fragment>
      <Model  show={showMap}
      onCancle= {CloseMapHandler}
      header ={props.address}
      contentClass= "palce_item__model-content"
      footerClass="place_item__model-actions"
      footer={<Button onClick={CloseMapHandler}>Close</Button>}
      >
        <div className="map-container">
          <h2>This is map</h2>
        </div>
      </Model>
      
      <Model
      show={showDeletectionModel}
      onCancle={cancelDeletion}
      header="R U sure?"
      footerClass="place_iten__model.actions"
      footer ={
        <React.Fragment>
          <Button inverse onClick={cancelDeletion}>Cancel</Button>
          <Button danger onClick={confirmDeletion}> Delete </Button>
        </React.Fragment>
      }
      >
      <p> do u want to proceed and delete this place </p>
        
      </Model>
     <li className="place-item">
      <Card className="place-item__content">
        <div className="place-item__image">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="place-item__info">
          <h2>{props.title}</h2>
          <h3>{props.address}</h3>
          <p>{props.description}</p>
        </div>
        <div className="place-item__actions">
          <Button inverse onClick={OpenMapHandler}>VIEW ON MAP</Button>
         {auth.isLoggedIn && <Button to={`/place/${props.id}`}>EDIT</Button>}
         {auth.isLoggedIn && <Button danger onClick={showDeletion}>DELETE</Button>}
        </div>
      </Card>
    </li>
    </React.Fragment>
  );
};

export default PlaceItem;

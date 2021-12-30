import React ,{useCallback,useReducer}from 'react';
import './NewPlace.css'
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validator';
import Button from '../../shared/components/FormElements/Button'

import { useForm } from '../../shared/hooks/FormHooks';
const NewPlace = () => {
  // return <h2>NewPlace Works!</h2>

const [formState, InputHandler]=useForm( {
  title: {
    value: '',
    isValid: false
  },
  description: {
    value: '',
    isValid: false
  }
,
  address: {
    value: '',
    isValid: false
  }
},false)

const submitHandler=event=>{
  event.preventDefault()
  
}

  return (
  <form className="place-form" onSubmit={submitHandler}>
  <Input 
  id="title"
  element="input" 
  type="text" 
  label="Title" 
  validators={[VALIDATOR_REQUIRE()]} 
  errorText="please enter a valid text" 
  onInput ={InputHandler}
  />

<Input
id="description"
element="texterea" 
  type="text" 
  label="description" 
  validators={[VALIDATOR_MINLENGTH(5)]} 
  errorText="please enter a valid description (at least 5 charcters )" 
  onInput ={InputHandler}/>

<Input
id="address"
element="input" 
  type="text" 
  label="Address" 
  validators={[VALIDATOR_REQUIRE()]} 
  errorText="please enter a valid Address )" 
  onInput ={InputHandler}/>
  <Button type="submit" disabled ={!formState.isValid}>Add Palce</Button>
  </form>
  )
};

export default NewPlace;
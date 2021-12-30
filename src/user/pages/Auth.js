import React, {
    useState,
    useContext
} from "react";
import Input from "../../shared/components/FormElements/Input";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from "../../shared/util/validator";
import {
    useForm,
} from "../../shared/hooks/FormHooks";
import Button from "../../shared/components/FormElements/Button";
import Card from '../../shared/components/UIElements/Card'
import './Auth.css'
import { authCotext } from "../../shared/context/auth-context";

const Auth = () => {
  const auth = useContext(authCotext);
    const [isLoadingMode, setIsLoadingMode ] = useState(true);

    const [formState, inputHandler,setFormData ] = useForm({
        email: {
            value: '',
            isValid: false
        },

        password: {
            value: '',
            isValid: false
        }
    }, false)
    

    const switchModeHandler = () => {
        if (!isLoadingMode) {
        setFormData(
            {

            ...formState.inputs,
            name: undefined
                },
                 formState.inputs.email.isValid&&
                  formState.inputs.password.isValid
                  )
        } 
            else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false)
             }
        
        setIsLoadingMode(pervMode => !pervMode);
        console.log(isLoadingMode)
    }

    const authSubmitHandler = event => {
      auth.login();
        event.preventDefault()
    }

    
        return (
            <Card className="authentication">
              <h2>Login Required</h2>
              <hr />
              <form onSubmit={authSubmitHandler}>
                {!isLoadingMode && (
                  <Input
                    element="input"
                    id="name"
                    type="text"
                    label="Your Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a name."
                    onInput={inputHandler}
                  />
                )}
                <Input
                  element="input"
                  id="email"
                  type="email"
                  label="E-Mail"
                  validators={[VALIDATOR_EMAIL()]}
                  errorText="Please enter a valid email address."
                  onInput={inputHandler}
                />
                <Input
                  element="input"
                  id="password"
                  type="password"
                  label="Password"
                  validators={[VALIDATOR_MINLENGTH(5)]}
                  errorText="Please enter a valid password, at least 5 characters."
                  onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                  {isLoadingMode ? 'LOGIN' : 'SIGNUP'}
                </Button>
              </form>
              <Button inverse onClick={switchModeHandler}>
                SWITCH TO {isLoadingMode ? 'SIGNUP' : 'LOGIN'}
              </Button>
            </Card>
          );
}
export default Auth;
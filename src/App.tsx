import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation, useParams } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Hospital from './components/Hospital';
// TODO change to real repository
import styled from 'styled-components';

import {
  Hospital as HospitalI,
  Repository as RepositoryI
} from './types';

import HospitalList from './components/HospitalList';
import HospitalForm from './components/HospitalForm';
import Client from './client/client';
import { FormattedMessage } from "react-intl";

type AppProps = {
  className?: string
}

const client : RepositoryI = new Client();

const App = ({ className } : AppProps) => {
  const [hospitals, setHospitals] = useState<HospitalI[] | undefined>()
  useEffect(() => {
    client.getHospitals()
    .then(setHospitals)
    .catch((error) => console.log("Cannot fetch hospitals"));
  }, []);

  return (
    <div className={className}>
      <HospitalForm />
      <FormattedMessage
        id="app.greeting"
        description="Greeting to welcome the user to the app"
        defaultMessage="Hello, {name}!"
        values={{
          name: 'Alex',
        }}>
        {(txt) =>
          <p>{txt}</p>
        }
      </FormattedMessage>
      <Router>
        <Switch>
          <Route path='/hospital/:hospitalId'>
            <HospitalRoute />
          </Route>
          <Route path='/'>
            {hospitals && <HospitalList hospitals={hospitals}/>}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

function HospitalRoute() {
  const [hospital, setHospital] = useState<HospitalI>();
  const hospitalFromState : HospitalI = useLocation().state as HospitalI;
  let hospitalId: number = parseInt((useParams() as { hospitalId: string }).hospitalId);

  client.getHospitalById(hospitalId)
    .then(setHospital)
    .catch((error) => console.log('Invalid ID'));
  
  if(hospitalFromState !== undefined) {
    return <Hospital {...hospitalFromState} />;
  }

  return (
    <div>
      {hospital && <Hospital {...hospital} />}
    </div>
  );

}

const StyledApp = styled(App)`
  text-align: center;
`;

export default StyledApp;

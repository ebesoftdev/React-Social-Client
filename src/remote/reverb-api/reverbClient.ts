import axios from 'axios';
import { store } from '../../app/store'

const reverbClient = axios.create( {
  // baseURL: 'http://alreverb3staging-env.eba-r8euexa2.us-east-1.elasticbeanstalk.com',
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  },
} );

const reverbClientWithAuth = axios.create( {
  // baseURL: 'http://alreverb3staging-env.eba-r8euexa2.us-east-1.elasticbeanstalk.com',
  baseURL: 'http://localhost:5000',

  headers: {
    'Content-Type': 'application/json',
    'Authorization': ""
  },
  // TODO: is withCredentials necessary?
  withCredentials: true,
} );

const reverbClientUploadFileWithAuth = axios.create( {
    // baseURL: 'http://alreverb3staging-env.eba-r8euexa2.us-east-1.elasticbeanstalk.com',
    baseURL: 'http://localhost:5000',

    headers: {
      "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
      'Authorization': ""
    },
    withCredentials: true,
  } );

reverbClientWithAuth.interceptors.request.use( function ( config: any )
{
  const token = "" + store.getState().auth[0].token;
  config.headers["Authorization"] = token;
  return config;
} );

reverbClientUploadFileWithAuth.interceptors.request.use( function ( config: any )
{
  const token = "" + store.getState().auth[0].token;
  config.headers["Authorization"] = token;
  return config;
} );

export { reverbClient, reverbClientWithAuth , reverbClientUploadFileWithAuth};
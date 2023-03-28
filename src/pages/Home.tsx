import { useAppSelector } from '../app/hooks';
// import Landing from './Landing';
// import Tasks from './Tasks';



const Home = () => {

   const isLoggedIn = useAppSelector( state => state.auth.isLoggedIn );

   // TODO: Usar esta
   // return ( isLoggedIn ) ? <Tasks /> :  <Landing />
   return <h1>Este es el home - { ( isLoggedIn ) ? 'true' : 'false' }</h1>
}

export default Home
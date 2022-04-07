import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import LoadingComponent from '../components/Loading.component'
import styles from '../styles/Home.module.css'
import PrivateRoute from "../HOC/PrivateRoute";

const Home: NextPage = () => {
    return (
        <>
            <h1>Home Page</h1>
        </>
    )
}

export default PrivateRoute(Home)
// export default (Home)

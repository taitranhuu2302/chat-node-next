import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import LoadingComponent from '../components/Loading.component'
import styles from '../styles/Home.module.css'
import withAuth from '../HOC/withAuth'

const Home: NextPage = () => {
    return (
        <>
            <h1>Home Page</h1>
        </>
    )
}

export default withAuth(Home)
// export default (Home)

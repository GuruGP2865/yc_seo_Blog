import { Fragment } from 'react'
import { useEffect, useMemo, useState } from 'react';
import Router from 'next/router';
import { isAuth } from '../../actions/auth';
import { useRouter } from "next/router"

const Admin = ({ children }) => {
    const router = useRouter();
    const [ auth, setAuth ] = useState(null);

    useEffect(() => {
        if (!isAuth()) {
            Router.push(`/signin`);
        } else if (isAuth().role === "Admin") {
           
            setAuth(isAuth()._id)
        } else  {
             Router.push(`/`);
        }

        return() => {
             if (!isAuth()) {
            Router.push(`/signin`);
        } else if (isAuth().role !== "Admin") {
            Router.push(`/`);
        }
        }
    }, []);

    useMemo(() => {
        if (typeof window !== 'undefined') {
          if (!isAuth()) {
            router.push(`/signin`);
        } else if (isAuth().role !== "Admin") {
            router.push(`/`);
        }
        }
        
    }
    , []);

    const success = () => {
        if (auth !== null) {
            return <Fragment>{children}</Fragment>
        } else {
            return <Fragment></Fragment>
        }
    }

    return <Fragment>{success()}</Fragment>;
};

export default Admin;

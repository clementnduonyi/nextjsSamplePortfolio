import React from 'react';
import {Container} from "reactstrap";
import Head from 'next/head'
import { useRouter } from "next/router";




const BasePage = props => {
    const router = useRouter()
    const {children,  
            header, 
            className="", 

            title= "Portfolio - Clement Nduonyi",

            metaDescription="My name is Clement Nduonyi, an experienced web developer and tech freelancer. I have applied knowledge of some cutting edge web development technologies including Javascript, Ruby, Nodejs, Ruby-on-rails, Reactjs, Nextjs, Html5, CSS3, Bootstrap, Bulma ",

            noWrapper,
            indexPage,
            cannonicalPath} = props;
    const pageType = indexPage ? "indexPage" : "base-page";
    const Wrapper = noWrapper ? React.Fragment : Container;
    return(
        <>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" key="description" content={metaDescription} />
                <meta name="title" key="title"content={title} />
                <meta property="og:title" key="og:title" content={title} />
                <meta property="og:locale" key="og:locale" content='en_NG' />
                <meta property="og:url" key="og:url" content={`${process.env.BASE_URL}${router.asPath}`}/>
                <meta property="og:type" key="og:type" content="website" />
                <meta property="og:title" key="og:title" content={metaDescription} />
                <meta property="og:image" key="og:image" content={`${process.env.BASE_URL}/images/section-1.pn`} />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap" rel="stylesheet"></link>
                <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
                <link 
                rel="cannonical" 
                href={`${process.env.BASE_URL}${cannonicalPath ? cannonicalPath : router.asPath}`} />
                
            </Head>
            <div className={`${pageType} ${className}`}>
                <Wrapper>
                    {
                        header &&
                        <div className="page-header">
                            <h1 className="page-header-title">{header}</h1>
                        </div>
                    }
                    {children}
                </Wrapper>
                
            </div>
        </>
    )
}

export default BasePage;



import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'
import { ServerStyleSheets } from '@material-ui/styles'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const theme = responsiveFontSizes(createMuiTheme())

class MyDocument extends Document {
  

   setGoogleTags() {
    if (publicRuntimeConfig.PRODUCTION) {
      return {
        __html: ``
      };
    }
  }


  render() {
    return (
      <Html lang="en" >
        <Head>
          <meta charSet="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="/static/css/header.css" />
          {/*<!--Tailwind css cdn-->*/}
         <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"rel="stylesheet"/>
         <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
    />
      
          
          <script dangerouslySetInnerHTML={this.setGoogleTags()} />
    
           
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
//<script async src="https://www.googletagmanager.com/gtag/js?id=UA-147955896-1"></script>

MyDocument.getInitialProps = async ctx => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>
    ]
  }
}

export default MyDocument
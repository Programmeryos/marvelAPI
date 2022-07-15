import { Helmet } from 'react-helmet';

import ComicsList from '../comicsList/ComicsList';
import AppBanner from '../appBanner/AppBanner';

function ComicsPage() {
    return(
        <>
            <Helmet>
                <meta 
                    charSet="utf-8"
                    name="description"
                    content="All marvel comics" />

                <title>Comics page</title>
            </Helmet>
            <AppBanner/>
            <ComicsList/>
        </>
    )
}

export default ComicsPage;
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/spinner';

const Page404 = lazy(()=> import('../pages/404')),
    MainPage = lazy(()=> import('../pages/MainPage')),
    ComicsPage = lazy(()=> import('../pages/ComicsPage')),
    SingleComicsPage = lazy(()=> import('../pages/SingleComicsPage'));


function App() {
    return (
        <Suspense fallback={<Spinner/>}>
            <Router>
                <div className="app">
                    <AppHeader/>
                    <main>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/comics/:comicId" element={<SingleComicsPage/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </main>
                </div>
            </Router>
        </Suspense>
    )
        

}

export default App;
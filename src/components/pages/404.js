import ErrorMessange from "../errorMessange/errorMessange";
import { Link } from "react-router-dom";

import './404.scss';

const Page404 = () => {
    return (
        <div>
            <ErrorMessange/>
            <p className="title"><span>Page</span> dosn`t founded</p>
            <div className="center">
                <Link to='/' className="title back">Back to main page</Link>
            </div>
        </div>
    )
}

export default Page404;
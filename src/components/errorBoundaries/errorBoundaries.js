import { Component } from "react/cjs/react.production.min";
import ErrorMessange from "../errorMessange/errorMessange";

class ErrorBoundaries extends Component{
    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({error: true})
    }

    render() {
        if (this.state.error) {
            return (
                <ErrorMessange/>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundaries
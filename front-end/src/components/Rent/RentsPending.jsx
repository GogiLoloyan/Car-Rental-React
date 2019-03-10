import React, {Component} from 'react';
import Rent from "./Rent";
import services from '../../services'
import Loading from "../Generic/Loading";


class RentsPending extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true
        };

        this.updateList = this.updateList.bind(this)
    }

    componentDidMount() {
        services.rentService.pendingRents()
            .then(data => {
                this.setState({
                    data,
                    loading: false
                })
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.loading){
            services.rentService.pendingRents()
                .then(data => {
                    this.setState({
                        data,
                        loading: false
                    })
                })
        }
    }


    render() {
        if (this.state.loading) {
            return <Loading/>
        }

        return (
            <div className="container col-lg-8 my-5 jumbotron">
                {
                    this.state.data && this.state.data.length
                        ? this.state.data.map(r => <Rent update={this.updateList} key={r.id} data={r}/>)
                        : <h1>No rents so far :(</h1>
                }
            </div>
        )
    }

}

export default RentsPending;
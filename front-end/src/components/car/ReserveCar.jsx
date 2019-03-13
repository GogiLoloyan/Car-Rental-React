import React, {Component} from 'react';
import {rentService, carService} from '../../services'
import CarInformation from "./car-details/CarInformation";
import {Redirect, withRouter} from "react-router";
import {DatesConsumer} from "../../context/DatesContext";
import toastr from "toastr";


class ReserveCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            id: '',
            brand: '',
            model: '',
            power: '',
            color: '',
            description: '',
            imageUrl: '',
            litersPerHundredKilometers: '',
            pricePerDay: ''
        };

        this.onClick = this.onClick.bind(this);
    }


    onClick() {

        const {startDate, endDate} = this.props.dates;

        rentService.reserve(this.state.id, {startDate,endDate})
            .then(data => {
                this.setState({
                    submitted: true
                })
            })
            .catch((e) => {
                console.log(e);
            })
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        carService.getCarById(id)
            .then(res => {
                if (res.success === false) {
                    toastr.error(res.message);
                    this.props.history.push("/cars/all")
                } else {
                    this.setState({
                        ...res
                    });
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    render() {
        if (this.state.submitted) {
            return <Redirect to="/cars/all"/>
        }

        return (
            <div className='container col-lg-11'>
                <div className='row justify-content-center'>
                    <CarInformation data={this.state}/>
                </div>
                <hr/>
                <div className="row justify-content-center my-3">
                    <button className="btn btn-info mx-3 text-white w-25"
                         onClick={this.onClick}>Reserve</button>
                </div>
            </div>
        )
    }

}

const ReserveCarWithContext = (props) => {

    return (
        <DatesConsumer>
            {
                ({dates}) =>(
                    <ReserveCar {...props} dates={dates} />
                )
            }
        </DatesConsumer>
    )

};

export default withRouter(ReserveCarWithContext);
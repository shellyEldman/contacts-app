import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Modal, Button} from "react-bootstrap";

const Item = ({name, address, phone, street, city, IRole, img}) => {
    const [deleteItem, setDelete] = useState(false);
    const [itemName, setName] = useState(name);
    const [itemPhone, setPhone] = useState(phone);
    const [itemStreet, setStreet] = useState(street);
    const [itemCity, setCity] = useState(city);
    const [itemRole, setRole] = useState(IRole);
    const [showModal, setShow] = useState(false);
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');

    const [modalName, setModalName] = useState(itemName);
    const [modaStreet, setModalStreet] = useState(itemStreet);
    const [modalCity, setModalCity] = useState(itemCity);
    const [modalRole, setModalRole] = useState(itemRole);
    const [modalPhone, setModalPhone] = useState(itemPhone);
    const [modalPhoneWrong, setWrong] = useState(false);

    useEffect(() => {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=paris&key=AIzaSyDKvvBgAkSCugEbXckutuAFuqPzthsCnJ8`)
            .then(res => {
                setLat(res.data.results[0].geometry.location.lat);
                setLong(res.data.results[0].geometry.location.lng);
            })
    }, []);

    const handleEdit = () => {
        if (checkPhone()) {
            setName(modalName);
            setCity(modalCity);
            setStreet(modaStreet);
            setRole(modalRole);
            setPhone(modalPhone);
            setWrong(false);
            setShow(false);
        } else  {
            setWrong(true);
        }
    };

    const checkPhone = () => {
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return phoneRegex.test(modalPhone);
    };

    const handleClose = () => {
        setModalName(itemName);
        setModalPhone(itemPhone);
        setModalCity(itemCity);
        setModalStreet(itemStreet);
        setModalRole(itemRole);
        setShow(false);
    };

    return (
        <div className={`col-xl-4 ${deleteItem ? 'd-none' : ''}`}>
            <div className="card mb-3 px-3 pt-2 pt-xl-0">
                <div className="row no-gutters d-flex justify-content-center align-items-center">
                    <div className="col-4 d-flex flex-column justify-content-center align-items-center">
                        <img src={img} style={{borderRadius: '50%'}} className="card-img" alt="avatar"/>
                        <p className="">
                            <small className="text-muted text-center">{itemRole}</small>
                        </p>
                    </div>
                    <div className="col-8 pl-5 pl-xl-0">
                        <div className="card-body">
                            <h5 className="card-title my-1">{itemName}</h5>
                            <p className="card-text my-0">
                                <small className="text-muted"><i className="fas fa-map-marker-alt"/> {address}
                                </small>
                            </p>
                            <p className="card-text my-0">
                                <small className="text-muted">lat: {lat}</small>
                            </p>
                            <p className="card-text mt-0 mb-1">
                                <small className="text-muted">lng: {long}</small>
                            </p>
                            <p className="card-text mb-0 mt-1">Twitter. Inc.</p>
                            <p className="card-text my-0 py-0">
                                <small className="text-muted">{itemStreet}</small>
                            </p>
                            <p className="card-text my-0 py-0">
                                <small className="text-muted">{itemCity}</small>
                            </p>
                            <p className="card-text my-0 py-0">
                                <small className="text-muted">P: {itemPhone}</small>
                            </p>
                        </div>
                        <i onClick={() => setDelete(true)} className="fas fa-trash-alt float-right pb-2"/>
                        <i onClick={() => setShow(true)} className="fas fa-pen float-right pb-2 mr-2"/>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit - {itemName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="form-group">
                        <label htmlFor="exampleInputName">Name</label>
                        <input onChange={(e) => setModalName(e.target.value)} type="text" className="form-control" id="exampleInputName"
                               placeholder={itemName} value={modalName}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputStreet">Street</label>
                        <input onChange={(e) => setModalStreet(e.target.value)} type="text" className="form-control" id="exampleInputStreet"
                               placeholder={itemStreet} value={modaStreet}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputCity">City</label>
                        <input onChange={(e) => setModalCity(e.target.value)} type="text" className="form-control" id="exampleInputCity"
                               placeholder={itemCity} value={modalCity}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputRole">Role</label>
                        <input onChange={(e) => setModalRole(e.target.value)} type="text" className="form-control" id="exampleInputRole"
                               placeholder={itemRole} value={modalRole}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPhone">Phone</label>
                        <input onChange={(e) => setModalPhone(e.target.value)} type="text" className={`form-control ${modalPhoneWrong ? 'border-danger' : ''}`} id="exampleInputPhone"
                               placeholder={itemPhone} value={modalPhone}/>
                    </div>

                    {modalPhoneWrong && <p className="text-danger">Phone Number is Invalid!</p>}


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={() => handleEdit()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Item;
import React, {useState} from 'react';
import './App.css';
import {Modal, Button} from "react-bootstrap";
import john from './images/john-smith.jpg';
import alex from './images/alex jonathan.jpg';
import janeth from './images/janeth carton.jpg';
import michael from './images/michael zimber.jpg';
import monica from './images/monica smith.jpg';
import sandre from './images/sandra smith.jpg';
import Item from './item';

function App() {
    const [newContact, setNewContact] = useState([]);

    const [showModal, setShow] = useState(false);
    const [modalName, setName] = useState('');
    const [modalCity, setCity] = useState('');
    const [modalStreet, setStreet] = useState('');
    const [modalRole, setRole] = useState('');
    const [modalPhone, setPhone] = useState('');

    const [modalPhoneWrong, setWrong] = useState(false);


    const handleClose = () => {
        setName('');
        setCity('');
        setStreet('');
        setRole('');
        setPhone('');
        setShow(false);
    };

    const checkPhone = () => {
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return phoneRegex.test(modalPhone);
    };

    const handleSave = () => {
        if (checkPhone()) {
            const addNew = [
                ...newContact,
                {
                    name: modalName,
                    street: modalStreet,
                    city: modalCity,
                    phone: modalPhone,
                    role: modalRole
                }
            ];
            setNewContact(addNew);
            setShow(false);
        } else {
            setWrong(true);
        }
    };

    return (
        <div className="App pl-3 pr-5 py-3  bg-light">
            <div className="row">
                <Item name="Alex Johnatan" street="795 Folsom Ave, Suite 600" city="San Francisco, CA 84639"
                      phone="(123)456-7784" IRole="Graphic designer" address="Riviera state 32/106" img={john}/>
                <Item name="John Smith" street="795 Folsom Ave, Suite 600" city="San Francisco, CA 84639"
                      phone="(123)456-7784" IRole="CEO" address="Riviera state 32/106" img={alex}/>
                <Item name="Monica Smith" street="795 Folsom Ave, Suite 600" city="San Francisco, CA 84639"
                      phone="(123)456-7784" IRole="marketing manager" address="Riviera state 32/106" img={monica}/>
                <Item name="Michael Zimber" street="795 Folsom Ave, Suite 600" city="San Francisco, CA 84639"
                      phone="(123)456-7784" IRole="Sales manager" address="Riviera state 32/106" img={michael}/>
                <Item name="Sandra Smith" street="795 Folsom Ave, Suite 600" city="San Francisco, CA 84639"
                      phone="(123)456-7784" IRole="Graphic designer" address="Riviera state 32/106" img={sandre}/>
                <Item name="Janeth Carton" street="795 Folsom Ave, Suite 600" city="San Francisco, CA 84639"
                      phone="(123)456-7784" IRole="Graphic designer" address="Riviera state 32/106" img={janeth}/>
                <Item name="Janeth Carton" street="795 Folsom Ave, Suite 600" city="San Francisco, CA 84639"
                      phone="(123)456-7784" IRole="Graphic designer" address="Riviera state 32/106" img={janeth}/>

                {newContact && newContact.map((contact, index) => {
                    return (
                        <Item key={index} name={contact.name} street={contact.street} city={contact.city}
                              phone={contact.phone} IRole={contact.role} address="Riviera state 32/106" img={alex}/>
                    );
                })}

                <div className="col-lg-4">
                    <div className="card mb-3 px-3 d-flex justify-content-center align-items-center" style={{height: '265px'}}>
                        <i onClick={() => setShow(true)} className="fas fa-plus-circle"/>
                    </div>
                </div>


                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ann New Contact</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="form-group">
                            <label htmlFor="exampleInputName">Name</label>
                            <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="exampleInputName"
                                   placeholder={modalName} value={modalName}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputStreet">Street</label>
                            <input onChange={(e) => setStreet(e.target.value)} type="text" className="form-control" id="exampleInputStreet"
                                   placeholder={modalStreet} value={modalStreet}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputCity">City</label>
                            <input onChange={(e) => setCity(e.target.value)} type="text" className="form-control" id="exampleInputCity"
                                   placeholder={modalCity} value={modalCity}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputRole">Role</label>
                            <input onChange={(e) => setRole(e.target.value)} type="text" className="form-control" id="exampleInputRole"
                                   placeholder={modalRole} value={modalRole}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputPhone">Phone</label>
                            <input onChange={(e) => setPhone(e.target.value)} type="text" className={`form-control ${modalPhoneWrong ? 'border-danger' : ''}`} id="exampleInputPhone"
                                   placeholder={modalPhone} value={modalPhone}/>
                        </div>

                        {modalPhoneWrong && <p className="text-danger">Phone Number is Invalid!</p>}


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="success" onClick={() => handleSave()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    );
}

export default App;

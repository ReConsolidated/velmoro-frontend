import React, { useState, useEffect } from 'react';
import { getAllHotels, createHotel, updateHotel, deleteHotel } from '../../services/hotelService.js';
import { Button, Modal, TextInput, Label, Card } from 'flowbite-react';

const HotelManagement = () => {
    const [hotels, setHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [hotelData, setHotelData] = useState({
        displayName: '',
        urlName: '',
        emailAddress: '',
        workStartHour: '',  // Dodano workStartHour
        workEndHour: ''     // Dodano workEndHour
    });

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        try {
            const data = await getAllHotels();
            setHotels(data);
        } catch (error) {
            console.error('Failed to fetch hotels:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setHotelData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            if (selectedHotel) {
                await updateHotel(selectedHotel.id, hotelData);
            } else {
                await createHotel(hotelData);
            }
            fetchHotels();
            handleCloseModal();
        } catch (error) {
            console.error('Error saving hotel:', error);
        }
    };

    const handleEdit = (hotel) => {
        setSelectedHotel(hotel);
        setHotelData(hotel);
        setModalOpen(true);
    };

    const handleDelete = async (hotelId) => {
        try {
            await deleteHotel(hotelId);
            fetchHotels();
        } catch (error) {
            console.error('Error deleting hotel:', error);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedHotel(null);
        setHotelData({
            displayName: '',
            urlName: '',
            emailAddress: '',
            workStartHour: '',  // Zresetuj workStartHour
            workEndHour: ''     // Zresetuj workEndHour
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Manage Hotels</h1>
            <Button onClick={() => setModalOpen(true)} className="mb-4 text-black p-4 text-xl">Add New Hotel</Button>
            <div className="space-y-6">
                {hotels.map(hotel => (
                    <Card key={hotel.id} className="border rounded-lg shadow-md">
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{hotel.displayName}</h2>
                            <p className="text-lg font-medium text-gray-800 mb-4">URL Name: {hotel.urlName}</p>
                            <p className="text-lg font-medium text-gray-800 mb-4">Email: {hotel.emailAddress}</p>
                            <p className="text-lg font-medium text-gray-800 mb-4">Work Start Hour: {hotel.workStartHour}</p>
                            <p className="text-lg font-medium text-gray-800 mb-4">Work End Hour: {hotel.workEndHour}</p>
                            <div className="flex">
                                <Button onClick={() => handleEdit(hotel)} className="bg-blue-500 text-white hover:bg-blue-600 w-24 text-xl p-2 m-2">Edit</Button>
                                <Button onClick={() => handleDelete(hotel.id)} className="bg-red-500 text-white hover:bg-red-600 w-24 text-xl p-2 m-2">Delete</Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Modal show={modalOpen} onClose={handleCloseModal} className="bg-white shadow-lg rounded-lg p-3">
                <Modal.Header className="bg-white shadow-sm p-3">
                    {selectedHotel ? 'Edit Hotel' : 'Add New Hotel'}
                </Modal.Header>
                <Modal.Body className="bg-white shadow-sm p-3">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="displayName" value="Display Name" />
                            <TextInput
                                id="displayName"
                                name="displayName"
                                value={hotelData.displayName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="urlName" value="URL Name" />
                            <TextInput
                                id="urlName"
                                name="urlName"
                                value={hotelData.urlName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="emailAddress" value="Email Address" />
                            <TextInput
                                id="emailAddress"
                                name="emailAddress"
                                value={hotelData.emailAddress}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="workStartHour" value="Work Start Hour" />
                            <TextInput
                                id="workStartHour"
                                name="workStartHour"
                                value={hotelData.workStartHour}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="workEndHour" value="Work End Hour" />
                            <TextInput
                                id="workEndHour"
                                name="workEndHour"
                                value={hotelData.workEndHour}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="bg-white shadow-sm">
                    <Button onClick={handleSubmit} className="bg-blue-500 text-white hover:bg-blue-600 p-2 text-xl">
                        {selectedHotel ? 'Update Hotel' : 'Add Hotel'}
                    </Button>
                    <Button onClick={handleCloseModal} className="bg-gray-500 text-white hover:bg-gray-600 p-2 text-xl">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default HotelManagement;

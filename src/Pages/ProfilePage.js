import React, { useRef, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import holder from './holder.jpg';


export default function ProfilePage() {
    const [uploadPhoto, setUploadPhoto] = useState(); // Here's the problem. Please Look into it!
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpload = () => {
        if(inputRef.current){
            inputRef.current.click();
        }
    };

    const handleDisplayFileDetails = () => {
        if(inputRef.current){
            if(inputRef.current.files){
                setUploadPhoto(URL.createObjectURL(inputRef.current.files[0]));
            }
        }
      };

    return (
        <Card  className='w-100'>
            <Card.Img src={uploadPhoto ? uploadPhoto : holder} alt="By Ben from Unsplash" />
            <div className='d-flex justify-content-end m-3 mb-0'>
                <label >Choose Photo: </label>
                <input ref={inputRef} 
                    onChange={handleDisplayFileDetails} 
                    className="d-none" 
                    type="file" 
                    accept="image/*" 
                />
                <Button variant="primary" onClick={handleUpload}>Update Photo</Button>
            </div>
            <Card.Body>
                <h3 className='text-center'>User Name </h3>
                <hr />
                <div className='mt-2 mb-2'>
                    <Card.Title>Name:</Card.Title><p>Name Here</p>
                    <Card.Title>Email:</Card.Title><p>Email Here</p>
                    <Card.Title>Phone:</Card.Title><p>Phone Number Here</p>
                </div>
                <hr />
                <div className='d-flex justify-content-end'>
                    <Button variant="primary">Update Profile</Button>
                </div>
            </Card.Body>
        </Card>
    );
}
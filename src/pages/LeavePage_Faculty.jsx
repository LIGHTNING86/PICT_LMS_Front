import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar3 from '../components/Navbar_Faculty';

export default function LeavePage_Faculty() {
  return (
    <div className="w-screen min-h-screen text-white">
        <Form>
            <div>
                <Navbar3 />
            </div>
            <div className="bg-slate-100 rounded-lg p-8 ml-10 mr-10 mb-10 mt-4 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50">
                <div>
                    <span className='text-white text-3xl font-bold'>Leave Application Form - Faculty</span>

                    <div className='mt-4'>
                        <Form.Label>Type of Leave</Form.Label>
                        {['radio'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                            inline
                            label="CL"
                            name="group1"
                            type={type}
                            id={`inline-${type}-1`}
                        />
                        <Form.Check
                            inline
                            label="ML"
                            name="group1"
                            type={type}
                            id={`inline-${type}-2`}
                        />
                        <Form.Check
                            inline
                            label="EL"
                            name="group1"
                            type={type}
                            id={`inline-${type}-3`}
                        />
                        <Form.Check
                            inline
                            label="C - Off"
                            name="group1"
                            type={type}
                            id={`inline-${type}-3`}
                        />
                        <Form.Check
                            inline
                            label="O.D."
                            name="group1"
                            type={type}
                            id={`inline-${type}-3`}
                        />
                        <Form.Check
                            inline
                            label="LWP"
                            name="group1"
                            type={type}
                            id={`inline-${type}-3`}
                        />
                        </div>
                    ))}
                </div>

                </div>

                    <div className='grid grid-cols-2'>
                        <div className='text-white mr-2'>
                            
                        
                            <Form.Group className="mb-3" controlId="startDate">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control type="date" placeholder="Select Leave Start Date" />
                                {/* <Form.Text className='text-white'>
                                We'll never share your email with anyone else.
                                </Form.Text> */}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="leaveReasons">
                                <Form.Label>Reason(s) for Leave</Form.Label>
                                <Form.Control as="textarea" placeholder="Enter the reason(s) for the leave" style={{height: "120px"}}/>
                            </Form.Group>

                        </div>

                        <div className='text-white ml-2'>
                            
                                <Form.Group className="mb-3" controlId="endDate">
                                    <Form.Label>End Date</Form.Label>
                                    <Form.Control type="date" placeholder="Select Leave End Date" />
                                    
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="leaveAddress">
                                    <Form.Label>Leave Address</Form.Label>
                                    <Form.Control as="textarea" placeholder="Enter the address of leave location" style={{height: "120px"}}/>
                                </Form.Group>
                            
                        </div>
                    
                        
                </div>
                
                <Form.Group className="mb-3" controlId="contactNo">
                    <Form.Label>On-leave Contact No.</Form.Label>
                    <Form.Control type="number" placeholder="Enter Contact No." />
                </Form.Group>
                
                <div>
                    <Button variant="primary" type="">Submit</Button>
                    <Button variant="danger" type="" className='ml-2'>Reset</Button>
                </div>
            </div>
        </Form>
    </div>
  )
}

'use client'

import {updateUser } from "@/lib/settings";
import { getUserDetails } from "@/lib/userDetails";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('********');
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");
    const [interest, setInterests] = useState([]);
    const [allowOffers, setAllowOffers] = useState(false);

    const UpdateUser = async () => {
        await updateUser(Cookies.get("token"), {
            name,
            email,
            password,
            age,
            city,
            interest,
            allowOffers
        });

        toast.success("User updated successfully");
    }

    const DeleteUser = async () => {
        toast.success("User deleted successfully");
    }


    useEffect(() => {
        const userDetails = async () => {
            try {
                const data = await getUserDetails(Cookies.get("token"));
                setName(data.name);
                setEmail(data.email);
                setAge(data.age);
                setCity(data.city);
                setInterests(data.interest),
                setAllowOffers(data.allowOffers);
            } catch (error) {
                toast.error(error);
            }
        }
        userDetails();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <ToastContainer />
            <Card className='m-8 w-full max-w-lg'>
                <CardHeader>
                    <CardTitle>User settings</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <label>Name</label>
                        <Input placeholder={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label>Email</label>
                        <Input placeholder={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label>Password</label>
                        <Input placeholder={password} type='password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label>Age</label>
                        <Input placeholder={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label>City</label>
                        <Input placeholder={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label>Interests</label>
                        <Input placeholder={interest.join(", ")} onChange={(e) => setInterests(e.target.value.split(", "))} />
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="mr-2">Allow offers</label>
                        <Input type='checkbox' checked={allowOffers} onChange={(e) => setAllowOffers(e.target.checked)} className="form-checkbox h-5 w-5"/>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className='mr-4' onClick={UpdateUser}>Update user</Button>
                    <Button className='bg-red-500 hover:bg-red-800' onClick={DeleteUser}>Delete user</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default ProfilePage;

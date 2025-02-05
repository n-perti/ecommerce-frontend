import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./dialog";
import { getUserInterested } from "../../lib/webCommerce";

const UserInterestedDialog = ({ isOpen, onClose, token, commerceCIF }) => {
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        if (isOpen) {
            getUserInterested(token, commerceCIF)
                .then((data) => {
                    setEmails(data);
                })
                .catch((error) => {
                    console.error("Error fetching user interested:", error);
                });
        }
    }, [isOpen, token, commerceCIF]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Users Interested</DialogTitle>
                    <DialogDescription>
                        List of users interested in your web commerce.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    {emails.length === 0 ? (
                        <p>No interested users.</p>
                    ) : (
                        emails.map((email, index) => (
                            <div key={index}>
                                <p>{email}</p>
                            </div>
                        ))
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UserInterestedDialog;

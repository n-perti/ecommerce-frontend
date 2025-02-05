'use client'

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createCommerce } from '@/lib/commerces';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const merchantSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  cif: Yup.string()
    .min(8, 'CIF must be at least 8 characters')
    .max(9, 'CIF must be at most 9 characters')
    .required('CIF is required'),
  address: Yup.string().required('Address is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  pageId: Yup.number().required('Page ID is required'),
});

const FormField = ({ name, label, type = 'text', errors, touched }) => (
  <div className="space-y-2">
    <Label htmlFor={name} className="text-sm font-medium text-gray-700">
      {label}
    </Label>
    <Field
      as={Input}
      id={name}
      name={name}
      type={type}
      className={`w-full ${touched[name] && errors[name] ? 'border-red-500' : ''}`}
    />
    {touched[name] && errors[name] && (
      <p className="text-sm text-red-500">{errors[name]}</p>
    )}
  </div>
);

const CreateMerchantDialog = ({ open, onOpenChange, onMerchantCreated }) => {
  const initialValues = {
    name: '',
    cif: '',
    address: '',
    email: '',
    phone: '',
    pageId: 1,
    token: '',
  };

  const handleSubmit = async (values, { resetForm }) => {
    await createCommerce(Cookies.get('token'), values);
    await onMerchantCreated();
    resetForm();
    onOpenChange(false);
    toast.success('Merchant created successfully');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Merchant</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new merchant.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={merchantSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <FormField name="name" label="Name" errors={errors} touched={touched} />
              <FormField name="cif" label="CIF" errors={errors} touched={touched} />
              <FormField name="address" label="Address" errors={errors} touched={touched} />
              <FormField name="email" label="Email" type="email" errors={errors} touched={touched} />
              <FormField name="phone" label="Phone" errors={errors} touched={touched} />
              <FormField name="pageId" label="Page ID" type="number" errors={errors} touched={touched} />

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create</Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMerchantDialog;


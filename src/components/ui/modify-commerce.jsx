'use client'

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { modifyCommerce } from '@/lib/commerces';
import Cookies from 'js-cookie';

const merchantSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  cif: Yup.string().required('CIF is required'),
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

const ModifyMerchantDailog = ({ open, onOpenChange, onMerchantModified, commerceDetails }) => {
  const initialValues = {
    name: commerceDetails.name,
    cif: commerceDetails.cif,
    address: commerceDetails.address,
    email: commerceDetails.email,
    phone: commerceDetails.phone,
    pageId: commerceDetails.pageId,
  };

  const handleSubmit = async (values, { resetForm }) => {
    await modifyCommerce(Cookies.get('token'), values, commerceDetails.cif);
    await onMerchantModified();
    resetForm();
    toast.success('Commerce modified successfully');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modify Merchant</DialogTitle>
          <DialogDescription>
            Update the details below to modify the merchant.
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
                <Button type="submit">Modify</Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ModifyMerchantDailog;


"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createWebCommerce } from '@/lib/webCommerce';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const FormField = ({ name, label, type = 'text', errors, touched, readOnly = false, as = Input }) => (
  <div className="space-y-2">
    <Label htmlFor={name}>{label}</Label>
    <Field
      as={as}
      id={name}
      name={name}
      type={type}
      readOnly={readOnly}
      className={`w-full ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''} ${touched[name] && errors[name] ? 'border-red-500' : ''}`}
    />
    {touched[name] && errors[name] && (
      <p className="text-sm text-red-500">{errors[name]}</p>
    )}
  </div>
);

const CreateWebCommerceDialog = ({ open, onOpenChange, onWebCommerceCreated }) => {
  const cif = Cookies.get('commerceCIF');

  const initialValues = {
    title: '',
    commerceCIF: cif,
    city: '',
    activity: '',
    summary: '',
    text: [''], // Initial value for the array of text
  };

  const webCommerceSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    commerceCIF: Yup.string().required('CIF is required'),
    city: Yup.string().required('City is required'),
    activity: Yup.string().required('Activity is required'),
    summary: Yup.string().required('Summary is required'),
    text: Yup.array().of(Yup.string().required('Text is required')), // Validation for the array of text
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      console.log(values);
      console.log(Cookies.get('commerceToken'));
      await createWebCommerce(Cookies.get('commerceToken'), values);
      resetForm();
      onOpenChange(false);
      toast.success('WebCommerce created successfully');
      onWebCommerceCreated();
    } catch (error) {
      toast.error('Failed to create WebCommerce');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create WebCommerce</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new WebCommerce.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={webCommerceSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <FormField name="title" label="Title" errors={errors} touched={touched} />
              <FormField
                name="commerceCIF"
                label="CIF"
                errors={errors}
                touched={touched}
                readOnly={true}
              />
              <FormField name="city" label="City" errors={errors} touched={touched} />
              <FormField name="activity" label="Activity" errors={errors} touched={touched} />
              <FormField
                name="summary"
                label="Summary"
                errors={errors}
                touched={touched}
                as={Textarea}
              />
              <FieldArray name="text">
                {({ push, remove, form }) => (
                  <div className="space-y-2">
                    <Label>Text</Label>
                    {form.values.text.map((text, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Field
                          as={Textarea}
                          name={`text[${index}]`}
                          className={`w-full border rounded-md ${touched.text && touched.text[index] && errors.text && errors.text[index] ? 'border-red-500' : ''}`}
                        />
                        <Button type="button" onClick={() => remove(index)}>Remove</Button>
                      </div>
                    ))}
                    <Button type="button" onClick={() => push('')}>Add Text</Button>
                  </div>
                )}
              </FieldArray>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit">Create</Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWebCommerceDialog;
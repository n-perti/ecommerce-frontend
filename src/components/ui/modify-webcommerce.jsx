"use client";

import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getWebCommerceByCIF, updateWebCommerce } from '@/lib/webCommerce';
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
      className={`w-full ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''} ${
        touched[name] && errors[name] ? 'border-red-500' : ''
      }`}
    />
    {touched[name] && errors[name] && (
      <p className="text-sm text-red-500">{errors[name]}</p>
    )}
  </div>
);

const ModifyWebCommerceDialog = ({ open, onOpenChange, onWebCommerceUpdated }) => {
  const [initialValues, setInitialValues] = useState({});
  const cif = Cookies.get('commerceCIF');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWebCommerceByCIF(Cookies.get('commerceCIF'));
        console.log(data);
        setInitialValues({
          title: data.title || '',
          commerceCIF: cif,
          city: data.city || '',
          activity: data.activity || '',
          summary: data.summary || '',
          text: data.text || [''],
          isArchived: data.isArchived || false,
        });
      } catch (error) {
        toast.error('Failed to fetch WebCommerce');
      }
    };
    fetchData();
  }, []);

  const webCommerceSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    commerceCIF: Yup.string().required('CIF is required'),
    city: Yup.string().required('City is required'),
    activity: Yup.string().required('Activity is required'),
    summary: Yup.string().required('Summary is required'),
    text: Yup.array().of(Yup.string().required('Text is required')),
    isArchived: Yup.boolean(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await updateWebCommerce(Cookies.get('commerceToken'), values);
      resetForm();
      onOpenChange(false);
      toast.success('WebCommerce updated successfully');
      onWebCommerceUpdated();
    } catch (error) {
      toast.error('Failed to update WebCommerce');
    }
  };

  if (!initialValues) {
    return null; // Mostrar un indicador de carga si es necesario
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modify WebCommerce</DialogTitle>
          <DialogDescription>
            Modify the details below to update the WebCommerce.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={webCommerceSchema}
          onSubmit={handleSubmit}
          enableReinitialize
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
                    {(form.values.text || []).map((text, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Field
                          as={Textarea}
                          name={`text[${index}]`}
                          className={`w-full border rounded-md ${
                            touched.text &&
                            touched.text[index] &&
                            errors.text &&
                            errors.text[index]
                              ? 'border-red-500'
                              : ''
                          }`}
                        />
                        <Button type="button" onClick={() => remove(index)}>
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button type="button" onClick={() => push('')}>
                      Add Text
                    </Button>
                  </div>
                )}
              </FieldArray>
              <div className="space-y-2">
                <Label htmlFor="isArchived">Archived</Label>
                <Field
                  type="checkbox"
                  id="isArchived"
                  name="isArchived"
                  className="w-4 h-4"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ModifyWebCommerceDialog;
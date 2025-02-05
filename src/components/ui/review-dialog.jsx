import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const reviewSchema = Yup.object().shape({
    rating: Yup.number()
        .min(0, 'Rating must be at least 0')
        .max(5, 'Rating must be at most 5')
        .required('Rating is required'),
    review: Yup.string().required('Comment is required'),
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

const ReviewDialog = ({ open, onOpenChange, onReviewCreated }) => {
    const initialValues = {
        rating: 0,
        review: '',
    };

    const handleSubmit = async (values, { resetForm }) => {
        await onReviewCreated(values);
        resetForm();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Review</DialogTitle>
                    <DialogDescription>
                        Fill out the form below to create a review.
                    </DialogDescription>
                </DialogHeader>
                <Formik
                    initialValues={initialValues}
                    validationSchema={reviewSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="space-y-4">
                            <FormField name="rating" label="Rating" type="number" errors={errors} touched={touched} />
                            <FormField name="review" label="Review" errors={errors} touched={touched} />
                            <div className="flex justify-end space-x-4">
                                <Button type="button" onClick={() => onOpenChange(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">Create Review</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}

export default ReviewDialog;
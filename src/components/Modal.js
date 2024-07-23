import React from 'react';
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

Modal.setAppElement('#root');

const ModalComponent = ({ isOpen, onRequestClose, initialValues, handleSubmit, fields }) => {
  const validationSchema = Yup.object(
    fields.reduce((acc, field) => {
      let schema;
      switch (field.type) {
        case 'text':
          schema = Yup.string().required('Required');
          break;
        case 'email':
          schema = Yup.string().email('Invalid email address').required('Required');
          break;
        case 'number':
          schema = Yup.number().required('Required');
          break;
        case 'select':
          schema = Yup.string().required('Required');
          break;
        default:
          schema = Yup.string().required('Required');
      }
      acc[field.name] = schema;
      return acc;
    }, {})
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Form Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
          onRequestClose();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {fields.map((field) => (
              <div key={field.name}>
                <label>{field.label}</label>
                {field.type === 'select' ? (
                  <Field as="select" name={field.name}>
                    <option value="">Select...</option>
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                ) : (
                  <Field type={field.type} name={field.name} />
                )}
                <ErrorMessage name={field.name} component="div" className="error" />
              </div>
            ))}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ModalComponent;

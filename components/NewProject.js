import React from 'react'
import useStore from "../Store/Store"
import { Formik, Form, Field } from "formik";
import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";

export default function NewProject() {
  const addProject = useStore((state) => state.addProject);
  const isVisible = useStore((state) => state.isVisible_NewProject);
  const setIsVisible = useStore((state) => state.setIsVisible_NewProject);

  function handleCancel() {
    setIsVisible(false);
  }

  return (
    <>
      {!isVisible ? null : (
        <div className="overlay">
          <div className="overlay-content">
            <h1>New Project</h1>
            <Formik
              initialValues={{ name: "", customId: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.name) {
                  errors.name = "Project's name is requierd";
                }
                if (!values.customId) {
                  errors.customId = "Project's Custom ID is requierd";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                addProject(values.name, values.customId);

                setSubmitting(false);
                setIsVisible(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field name="name">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input
                          {...field}
                          id="name"
                          placeholder="Project's name"
                          autoComplete="off"
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="customId">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.customId && form.touched.customId}
                      >
                        <FormLabel htmlFor="customId">Custom Id</FormLabel>
                        <Input
                          {...field}
                          id="customId"
                          placeholder="Custom Id"
                          autoComplete="off"
                        />
                        <FormErrorMessage>
                          {form.errors.customId}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Flex justifyContent="flex-end" mt={4}>
                    <Button
                      type="submit"
                      colorScheme="blue"
                      isDisabled={isSubmitting}
                    >
                      Submit
                    </Button>
                    <Button
                      onClick={handleCancel}
                      colorScheme="red"
                      variant="outline"
                      isDisabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}

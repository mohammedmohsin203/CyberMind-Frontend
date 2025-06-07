'use client';

import {
    Modal,
    TextInput,
    Textarea,
    Select,
    Button,
    Stack,
    SimpleGrid,
    FileInput,
} from '@mantine/core';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function JobCreateModal({ opened, onClose }) {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const [image, setImage] = useState(null);

    const onSubmit = async (data) => {
        const min = parseInt(data.minSalary, 10);
        const max = parseInt(data.maxSalary, 10);

        if (max < min) {
            alert('Maximum salary must be greater than or equal to minimum salary.');
            return;
        }

        const formData = new FormData();
        formData.append('salaryRange', `${min} - ${max}`);

        for (const key in data) {
            if (key !== 'salaryRange') {
                formData.append(key, data[key]);
            }
        }

        formData.append('minSalary', min.toString());
        formData.append('maxSalary', max.toString());

        if (image) {
            formData.append('image', image);
        }

        try {
            const res = await fetch('http://localhost:3001/jobs', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Failed to post job');

            alert('Job created!');
            reset();
            setImage(null);
            onClose();
            location.reload()
        } catch (err) {
            console.error(err);
            alert('Failed to create job');
        }
    };

    return (
        <Modal opened={opened} onClose={onClose} title="Create New Job" centered size="xl" className="w-full font-bold">
            <form onSubmit={handleSubmit(onSubmit)} className="text-left">
                <Stack spacing="xs">
                    <SimpleGrid cols={2} spacing="xs">
                        <TextInput label="Job Title" {...register('jobTitle', {required: true})} />
                        <TextInput label="Company Name" {...register('companyName', {required: true})} />
                        <TextInput label="Location" {...register('location', {required: true})} />
                        <Select
                            label="Job Type"
                            data={['Full-time', 'Part-time', 'Contract', 'Internship']}
                            onChange={(val) => setValue('jobType', val)}
                            placeholder="Select type"
                            required
                        />
                        <div style={{display: 'flex', flexDirection: 'row', gap: '0.5rem'}}>
                            <TextInput
                                label="Salary Range"
                                placeholder="₹ 50000"
                                type="number"
                                {...register('minSalary', {
                                    required: 'Minimum salary is required',
                                    min: {value: 0, message: 'Salary must be positive'},
                                })}
                                error={errors.minSalary?.message || null}
                            />

                            <TextInput
                                label=" "
                                placeholder="₹ 120000"
                                type="number"
                                {...register('maxSalary', {
                                    required: 'Maximum salary is required',
                                    min: {value: 0, message: 'Salary must be positive'},
                                })}
                                error={errors.maxSalary?.message || null}
                            />
                        </div>
                        <TextInput
                            label="Application Deadline"
                            placeholder="YYYY-MM-DD"
                            {...register('applicationDeadline')}
                        />
                        <FileInput
                            label="Upload Job Image"
                            placeholder="Upload image"
                            accept="image/*"
                            onChange={setImage}
                        />
                    </SimpleGrid>

                    {/*<Textarea*/}
                    {/*    label="Job Description"*/}
                    {/*    minRows={2}*/}
                    {/*    {...register('jobDescription', {required: true})}*/}
                    {/*/>*/}
                    {/*<Textarea*/}
                    {/*    label="Requirements"*/}
                    {/*    minRows={2}*/}
                    {/*    {...register('requirements', {required: true})}*/}
                    {/*/>*/}
                    <Textarea
                        label="Job Description"
                        placeholder="Please share a description to let the candidate know more about the job role"
                        minRows={5}
                        {...register('responsibilities', {required: true})}
                    />
                    <div className="flex justify-between m-2">
                        <Button type="submit" color="black" variant="outline">
                            Save Draft »
                        </Button>
                        <Button type="submit" color="blue">
                            Publish →
                        </Button>
                    </div>
                </Stack>
            </form>
        </Modal>
    );
}
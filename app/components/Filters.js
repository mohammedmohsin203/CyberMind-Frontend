import { useEffect, useState } from 'react';
import { Select, RangeSlider } from '@mantine/core';
import { IconMapPin, IconSearch, IconBriefcase } from '@tabler/icons-react';
import axios from 'axios';

export default function Filters({
                                    title,
                                    setTitle,
                                    location,
                                    setLocation,
                                    jobType,
                                    setJobType,
                                    range,
                                    setRange,
                                    minSalary,
                                    maxSalary,
                                }) {
    const [jobTitles, setJobTitles] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const res = await axios.get('https://cybermind-backend-51x7.onrender.com/jobs/filters');
                setJobTitles(res.data.jobTitles || []);
                setLocations(res.data.locations || []);
            } catch (error) {
                console.error('Error fetching filters:', error);
            }
        };

        fetchFilters();
    }, []);

    return (
        <div
            className="fixed top-20 left-0 right-0 z-50 w-full bg-white shadow px-8 py-8 flex justify-between items-center gap-x-6"
            role="group"
        >
            {/* Job Title Filter */}
            <div className="flex items-center gap-2 w-full">
                <IconSearch size={20} className="text-gray-400" />
                <Select
                    variant="unstyled"
                    size="md"
                    placeholder="Search by Job Title"
                    data={jobTitles}
                    searchable
                    value={title}
                    onChange={setTitle}
                    className="w-full"
                />
            </div>

            <span className="text-gray-300 text-xl font-extralight">|</span>

            {/* Location Filter */}
            <div className="flex items-center gap-2 w-full">
                <IconMapPin size={20} className="text-gray-400" />
                <Select
                    variant="unstyled"
                    size="md"
                    placeholder="Preferred Location"
                    data={locations}
                    searchable
                    value={location}
                    onChange={setLocation}
                    className="w-full"
                />
            </div>

            <span className="text-gray-300 text-xl font-extralight">|</span>

            {/* Job Type Filter */}
            <div className="flex items-center gap-2 w-full">
                <IconBriefcase size={20} className="text-gray-400" />
                <Select
                    variant="unstyled"
                    size="md"
                    placeholder="Job Type"
                    data={['Full-time', 'Part-time', 'Contract', 'Internship']}
                    searchable
                    value={jobType}
                    onChange={setJobType}
                    className="w-full"
                />
            </div>

            <span className="text-gray-300 text-xl font-extralight">|</span>

            {/* Salary Filter */}
            <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between text-sm font-medium text-gray-700">
                    <span>Salary Per Month</span>
                    <span>
            ₹ {Math.round(range[0] / 1000)}k - ₹{Math.round(range[1] / 1000)}k
          </span>
                </div>
                <RangeSlider
                    min={minSalary || 0}
                    max={maxSalary || 200000}
                    value={[
                        Math.max(minSalary || 0, range[0]),
                        Math.min(maxSalary || 200000, range[1]),
                    ]}
                    onChange={(val) => {
                        const clamped = [
                            Math.max(minSalary || 0, val[0]),
                            Math.min(maxSalary || 200000, val[1]),
                        ];
                        setRange(clamped);
                    }}
                    label={null}
                    color="black"
                    size="xs"
                />
            </div>
        </div>
    );
}

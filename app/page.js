'use client';

import { useState, useEffect } from 'react';
import Filters from './components/Filters';
import { FloatingNavDemo } from './components/Navbar';
import JobCreateModal from "./jobs/create/JobCreateModal";
import JobModal from "./jobs/JobModal";

export default function Home() {
    const [modalOpen, setModalOpen] = useState(false);

    // Filter states
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [jobType, setJobType] = useState('');
    const [range, setRange] = useState([0, 2000000]);
    const [minSalary, setMinSalary] = useState(0);
    const [maxSalary, setMaxSalary] = useState(0);


    // Jobs data
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    const safeSetRange = (newRange) => {
        if (
            Array.isArray(newRange) &&
            newRange.length === 2 &&
            newRange.every((v) => typeof v === 'number' && !isNaN(v))
        ) {
            setRange(newRange);
        } else {
            console.warn('Invalid range ignored:', newRange);
        }
    };
    useEffect(() => {
        if (range[0] === 0 && range[1] === 0) return; // avoid loop

        async function fetchJobs() {
            setLoading(true);
            const query = new URLSearchParams({
                ...(title && { jobTitle: title }),
                ...(location && { location }),
                ...(jobType && { jobType }),
                ...(range[0] !== 0 && { minSalary: range[0].toString() }),
                ...(range[1] !== 0 && { maxSalary: range[1].toString() }),
            });

            try {
                const res = await fetch(`https://cybermind-backend-51x7.onrender.com/jobs?${query.toString()}`);
                const data = await res.json();
                setJobs(Array.isArray(data) ? data : data.jobs || []);
            } catch (err) {
                console.error('Fetch error:', err);
                setJobs([]);
            } finally {
                setLoading(false);
            }
        }

        fetchJobs();
    }, [title, location, jobType, range]);


    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
            {/* Fixed top nav */}
            <div style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: '#fff' }}>
                <FloatingNavDemo onOpenModal={() => setModalOpen(true)} />
                <div
                    style={{
                        boxShadow: '0 2px 2px rgba(0,0,0,0.1)',
                        backgroundColor: '#fff',
                        padding: '2rem',
                        marginTop: '5rem',
                    }}
                    className="sticky z-50 top-50"
                >
                    {/* Controlled Filters */}
                    <Filters
                        title={title}
                        setTitle={setTitle}
                        location={location}
                        setLocation={setLocation}
                        jobType={jobType}
                        setJobType={setJobType}
                        range={range}
                        setRange={safeSetRange}
                        minSalary={minSalary}
                        maxSalary={maxSalary}
                    />
                </div>
            </div>

            <div style={{ marginTop: '2rem' }} className="bg-[#fbfaff]">
                {/* Jobs list */}
                <JobModal jobs={jobs} loading={loading} />
            </div>

            <JobCreateModal
                opened={modalOpen}
                onClose={() => setModalOpen(false)}
                onRefresh={() => {
                    setTimeout(() => {
                        fetchJobs();
                    }, 300);
                }}
            />

        </div>
    );
}

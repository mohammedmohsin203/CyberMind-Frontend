'use client'
import {
    Box,
    Card,
    Grid,
    Group,
    Image,
    Skeleton,
    Stack,
    Text,
    Button,
} from '@mantine/core';
import { useEffect, useRef } from 'react';
import {IconBuilding, IconStack2, IconUserPlus} from "@tabler/icons-react";

function JobCard({ job }) {
    return (
        <Card withBorder shadow="sm" h="100%" w="100%">
            <Stack spacing="xs">
                <div className="flex justify-between flex-row">
                <Box w={100} h={100} style={{ overflow: 'hidden', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white',    boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.25)'}}>
                    {job.imageUrl ? (
                        <Image
                            src={`http://localhost:3001${job.imageUrl}`}
                            alt={`${job.companyName} logo`}
                            width={80}
                            height={80}
                            style={{
                                borderRadius: '50%',     // Make it circular
                                objectFit: 'cover',
                                width: '80px',
                                height: '80px',
                            }}
                        />
                    ) : (
                        <Box w="80px" h="80px" bg="gray.2" radius="xl" />
                    )}
                </Box>
                    <span className="w-[80px] h-[30px] text-center bg-[#B0D9FF] text-black  rounded-lg"> 24hr ago</span></div>


                <Text fw={600} size="xl" className="font-bold">{job.jobTitle}</Text>
                <Text size="md" fw={600} c="dimmed">
                    {job.companyName} • {job.location}
                </Text>

                <Group gap="xs" wrap="wrap">
                    <Text size="xs" c="gray.7" className="flex flex-row items-center gap-x-1 font-bold"><IconUserPlus />1-3 yrs</Text>
                    <Text size="xs" c="gray.7" className="flex flex-row items-center gap-x-1 font-bold"><IconBuilding/>Onsite</Text>
                    <Text size="xs" c="gray.7"  className="flex flex-row items-center gap-x-1 font-bold"><IconStack2/>{job.maxSalary ? (job.maxSalary * 12 / 100000).toFixed(2) + ' LPA' : '—'}</Text>
                </Group>

                <Box>
                    <Text size="sm" fw={500} mb={4}>Responsibilities:</Text>
                    <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                        {job.responsibilities
                            ?.split('\n')
                            .filter(Boolean)
                            .slice(0, 3)
                            .map((point, i) => (
                                <li key={i} style={{ fontSize: '0.875rem', color: '#555', lineHeight: '1.2rem' }}>
                                    {point.length > 80 ? point.slice(0, 80) + '...' : point}
                                </li>
                            ))}
                    </ul>
                </Box>

                <Button fullWidth mt="auto" radius="md" variant="filled" color="blue">
                    Apply Now
                </Button>
            </Stack>
        </Card>
    );
}

function JobSkeleton() {
    return (
        <Card withBorder shadow="sm" radius="md" p="md" h="100%">
            <Skeleton height={100} width="100%" radius="sm" />
            <Skeleton height={20} mt="sm" width="70%" />
            <Skeleton height={14} mt="xs" width="50%" />
            <Skeleton height={14} mt="sm" width="40%" />
            <Skeleton height={50} mt="sm" width="100%" />
        </Card>
    );
}

export default function JobModal({ jobs, loading, fetchMore }) {
    const loaderRef = useRef(null);

    useEffect(() => {
        if (!loaderRef.current || !fetchMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) fetchMore();
            },
            { threshold: 1 }
        );

        observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [fetchMore]);

    return (
        <Box mx="xl" w="90%" pt="xl">
            <Grid gutter="md">
                {(loading ? Array.from({ length: 6 }) : jobs).map((job, i) => (
                    <Grid.Col key={i} span={{ base: 12, sm: 6, md: 3 }}>
                        {loading ? <JobSkeleton /> : <JobCard job={job} />}
                    </Grid.Col>
                ))}
            </Grid>

            {/* Infinite Scroll Observer Element */}
            {!loading && <div ref={loaderRef} style={{ height: '1px' }} />}
        </Box>
    );
}

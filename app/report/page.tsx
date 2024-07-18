import { StatCard } from '@/components/StatCard';
import { DataTable } from '@/components/table/DataTable';
import { columns } from '@/components/table/gameColumns';
import Image from "next/image";
import { getReports } from '@/lib/actions/games.actions';
import { Link } from 'lucide-react';
import React from 'react'

const page = async () => {
    const reports = await getReports();

    return (
        <div className="mx-auto flex max-w-7xl flex-col space-y-14">
            <header className="admin-header">
                <Link href="/" className="cursor-pointer">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        height={32}
                        width={162}
                        alt="logo"
                        className="h-8 w-fit"
                    />
                </Link>

                <p className="text-16-semibold">Admin Dashboard</p>
            </header>

            <main className="admin-main">
                <section className="w-full space-y-4">
                    <h1 className="header">Welcome 👋</h1>
                    <p className="text-dark-700">
                        Manage the reports of patients
                    </p>
                </section>

                <DataTable columns={columns} data={reports.documents} />
            </main>
        </div>
    )
}

export default page
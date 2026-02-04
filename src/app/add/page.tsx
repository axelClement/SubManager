"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AddSubscriptionPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // In a real app, this would add to global state/DB
    };

    if (submitted) {
        return (
            <div className="max-w-md mx-auto min-h-screen p-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="h-20 w-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center">
                    <Check className="h-10 w-10" />
                </div>
                <h1 className="text-2xl font-bold">Subscription Added!</h1>
                <p className="text-muted-foreground">We'll remind you before the next payment.</p>
                <Link href="/">
                    <Button className="mt-4">Back to Dashboard</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-md mx-auto min-h-screen p-6 space-y-6">
            <header className="flex items-center gap-4">
                <Link href="/" className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-bold">Add Subscription</h1>
            </header>

            <Card className="border-white/5 bg-white/5">
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Service Name</label>
                            <Input placeholder="e.g. Disney+" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Monthly Cost (€)</label>
                            <Input type="number" step="0.01" placeholder="8.99" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">First Payment Date</label>
                            <Input type="date" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category</label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                                <option value="streaming">Streaming</option>
                                <option value="utilities">Utilities</option>
                                <option value="mobile">Mobile</option>
                                <option value="internet">Internet</option>
                                <option value="gym">Gym</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 mt-4">
                            Add Subscription
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

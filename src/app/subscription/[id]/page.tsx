"use client";

import { useParams, useRouter } from "next/navigation";
import { MOCK_SUBSCRIPTIONS } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, AlertTriangle, CheckCircle2, DollarSign } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function SubscriptionDetail() {
    const params = useParams();
    const router = useRouter();
    const sub = MOCK_SUBSCRIPTIONS.find(s => s.id === params.id);

    if (!sub) {
        return <div className="p-6 text-center">Subscription not found</div>;
    }

    return (
        <div className="max-w-md mx-auto min-h-screen p-6 space-y-6 pb-20">
            <header className="flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors"
                >
                    <ArrowLeft className="h-6 w-6" />
                </button>
                <h1 className="text-xl font-bold truncate">{sub.name}</h1>
            </header>

            {/* Overview Card */}
            <div className="flex flex-col items-center py-6">
                {sub.logoUrl ? (
                    <img src={sub.logoUrl} alt={sub.name} className="h-24 w-24 rounded-2xl object-contain bg-white p-2 mb-4 shadow-2xl ring-4 ring-white/5" />
                ) : (
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-2xl mb-4 font-bold ring-4 ring-white/5">
                        {sub.serviceName[0]}
                    </div>
                )}
                <h2 className="text-3xl font-bold">{sub.price}€</h2>
                <p className="text-muted-foreground text-sm">per {sub.billingCycle}</p>
                <Badge variant={sub.active ? "glass" : "destructive"} className="mt-2 bg-green-500/20 text-green-200 border-green-500/30">
                    {sub.active ? "Active" : "Inactive"}
                </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-xs text-muted-foreground">Next Payment</p>
                    <p className="font-semibold">{new Date(sub.nextPaymentDate).toLocaleDateString()}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-xs text-muted-foreground">Category</p>
                    <p className="font-semibold capitalize">{sub.category}</p>
                </div>
            </div>

            {/* Cancellation Module */}
            <Card className="border-red-500/20 bg-red-500/5">
                <CardHeader>
                    <CardTitle className="text-red-400 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Cancellation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {sub.cancellationMethod ? (
                        <>
                            <div className="space-y-2">
                                {sub.cancellationMethod.steps.map((step, i) => (
                                    <div key={i} className="flex gap-3 text-sm">
                                        <div className="h-5 w-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs shrink-0">
                                            {i + 1}
                                        </div>
                                        <p className="text-muted-foreground">{step}</p>
                                    </div>
                                ))}
                            </div>
                            {sub.cancellationMethod.link && (
                                <Button className="w-full bg-red-600 hover:bg-red-700 text-white mt-2" asChild>
                                    <a href={sub.cancellationMethod.link} target="_blank" rel="noopener noreferrer">
                                        Cancel on {sub.serviceName} <ExternalLink className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>
                            )}
                            {sub.cancellationMethod.phoneNumber && (
                                <Button variant="outline" className="w-full mt-2" asChild>
                                    <a href={`tel:${sub.cancellationMethod.phoneNumber}`}>
                                        Call {sub.cancellationMethod.phoneNumber}
                                    </a>
                                </Button>
                            )}
                        </>
                    ) : (
                        <p className="text-sm text-muted-foreground">No specific cancellation info available.</p>
                    )}
                </CardContent>
            </Card>

            {/* Alternatives Module */}
            {sub.alternatives && sub.alternatives.length > 0 && (
                <Card className="border-green-500/20 bg-green-500/5">
                    <CardHeader>
                        <CardTitle className="text-green-400 flex items-center gap-2">
                            <DollarSign className="h-5 w-5" />
                            Cheaper Alternatives
                        </CardTitle>
                        <CardDescription>Save money by switching</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {sub.alternatives.map(alt => (
                            <div key={alt.id} className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-semibold text-green-100">{alt.name}</h4>
                                        <p className="text-green-300 font-bold">{alt.price}€ <span className="text-xs font-normal text-muted-foreground">/mo</span></p>
                                    </div>
                                    <Badge className="bg-green-500 text-white hover:bg-green-600">Save {alt.savings}€</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">{alt.description}</p>
                                {alt.link && (
                                    <Button variant="link" className="h-auto p-0 text-green-400 text-xs mt-2" asChild>
                                        <a href={alt.link} target="_blank" rel="noopener noreferrer">
                                            View Offer <ExternalLink className="ml-1 h-3 w-3" />
                                        </a>
                                    </Button>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

        </div>
    );
}

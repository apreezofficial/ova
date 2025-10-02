"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Crown } from "lucide-react";
import { useState } from "react";

export default function SubscriptionPlans() {
  const [currentPlan, setCurrentPlan] = useState("Pro");

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Basic access with limited features",
      features: [
        "Browse content",
        "Limited community access",
        "No dashboard access"
      ]
    },
    {
      name: "Pro",
      price: "$19/mo",
      description: "Full access to dashboard with reports",
      features: [
        "Dashboard access",
        "Generate reports",
        "Priority support"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For organizations with advanced needs",
      features: [
        "Dashboard access",
        "Generate reports",
        "Download PDF reports",
        "Dedicated account manager"
      ]
    }
  ];

  function handleUpgrade(plan: string) {
    setCurrentPlan(plan);
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Manage Subscription</h1>
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => {
            const isCurrent = plan.name === currentPlan;
            return (
              <Card key={plan.name} className={`flex flex-col justify-between hover:shadow-lg transition-shadow ${isCurrent ? "border-primary" : ""}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    {isCurrent && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Crown className="h-3 w-3" />
                        Current Plan
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                  <p className="text-3xl font-bold mt-4">{plan.price}</p>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {!isCurrent && (
                    <Button onClick={() => handleUpgrade(plan.name)} className="mt-6 w-full">
                      Upgrade to {plan.name}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

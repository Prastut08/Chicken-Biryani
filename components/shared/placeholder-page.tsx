"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/dashboard/dashboard-cards";

interface PlaceholderPageProps {
  title: string;
  description: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function PlaceholderPage({ title, description, breadcrumbs }: PlaceholderPageProps) {
  return (
    <>
      <PageHeader title={title} description={description} breadcrumbs={breadcrumbs} />
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted">
              <span className="text-2xl">🚧</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-foreground">Coming Soon</h3>
              <p className="max-w-sm text-sm text-foreground-muted">
                This feature is under development and will be available in a future update.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

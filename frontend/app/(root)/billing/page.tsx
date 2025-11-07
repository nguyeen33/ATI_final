'use client';

import { PageHeader, PageHeaderHeading, PageHeaderDescription } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function BillingPage() {
  return (
    <div className="container py-6">
      <PageHeader>
        <PageHeaderHeading>Billing</PageHeaderHeading>
        <PageHeaderDescription>
          Manage your subscription and billing details.
        </PageHeaderDescription>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-3 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <CardDescription>Perfect for getting started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">$0</div>
            <ul className="space-y-2 text-sm">
              <li>✓ Access to Reading Tests</li>
              <li>✓ Access to Listening Tests</li>
              <li>✓ Basic Progress Tracking</li>
              <li>✓ Email Support</li>
              <li>✓ Basic Grammar Checker</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled>Current Plan</Button>
          </CardFooter>
        </Card>

        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>For serious IELTS preparation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">$15</div>
            <ul className="space-y-2 text-sm">
              <li>✓ All Basic Features</li>
              <li>✓ Unlimited Mock Tests</li>
              <li>✓ Advanced Analytics</li>
              <li>✓ Priority Support</li>
              <li>✓ AI-Powered Writing Feedback</li>
              <li>✓ Speaking Practice Tools</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Upgrade to Pro</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Premium</CardTitle>
            <CardDescription>Maximum IELTS preparation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">$30</div>
            <ul className="space-y-2 text-sm">
              <li>✓ All Pro Features</li>
              <li>✓ 1-on-1 Tutoring Sessions</li>
              <li>✓ Live Speaking Practice</li>
              <li>✓ Custom Study Plans</li>
              <li>✓ Score Guarantee</li>
              <li>✓ Mock Interview Sessions</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">Upgrade to Premium</Button>
          </CardFooter>
          <CardFooter>
            <Button className="w-full" variant="outline">Current Plan</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>For serious test preparation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">$19.99</div>
            <ul className="space-y-2 text-sm">
              <li>✓ All Basic Features</li>
              <li>✓ Advanced Analytics</li>
              <li>✓ Personalized Study Plan</li>
              <li>✓ Priority Support</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Upgrade to Pro</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <CardDescription>For organizations and schools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">Custom</div>
            <ul className="space-y-2 text-sm">
              <li>✓ All Pro Features</li>
              <li>✓ Bulk User Management</li>
              <li>✓ Custom Branding</li>
              <li>✓ API Access</li>
              <li>✓ Dedicated Support</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="secondary">Contact Sales</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
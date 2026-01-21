"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { DashboardLayout } from "@/components/dashboard-layout";
import { PaymentsList } from "@/components/payments/payments-list";
import { Payment } from "@/lib/types";
import { mockPayments, mockNotifications } from "@/lib/mock-data";

export default function PaymentsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const unreadNotifications = mockNotifications.filter((n) => !n.is_read).length;

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user.role === "admin") {
      router.push("/admin");
    }
  }, [user, router]);

  if (!user || user.role === "admin") {
    return null;
  }

  const handleAdd = (payment: Payment) => {
    setPayments([...payments, payment]);
  };

  const handleEdit = (updatedPayment: Payment) => {
    setPayments(
      payments.map((p) =>
        p.payment_id === updatedPayment.payment_id ? updatedPayment : p
      )
    );
  };

  const handleDelete = (paymentId: string) => {
    setPayments(payments.filter((p) => p.payment_id !== paymentId));
  };

  return (
    <DashboardLayout unreadNotifications={unreadNotifications}>
      <PaymentsList
        payments={payments}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </DashboardLayout>
  );
}

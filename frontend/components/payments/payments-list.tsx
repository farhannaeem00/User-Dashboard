"use client";

import React, { useState, useMemo } from "react";
import { Payment } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { CreatePaymentModal } from "./create-payment-modal";
import { EditPaymentModal } from "./edit-payment-modal";
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaymentsListProps {
  payments: Payment[];
  onAdd: (payment: Payment) => void;
  onEdit: (payment: Payment) => void;
  onDelete: (paymentId: string) => void;
}

export function PaymentsList({
  payments,
  onAdd,
  onEdit,
  onDelete,
}: PaymentsListProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const typeMatch = typeFilter === "All" || payment.payment_type === typeFilter;
      const statusMatch =
        statusFilter === "All" || payment.status === statusFilter;
      return typeMatch && statusMatch;
    });
  }, [payments, typeFilter, statusFilter]);

  const totals = useMemo(() => {
    let income = 0;
    let expenses = 0;
    let pending = 0;

    payments.forEach((payment) => {
      if (payment.status === "Completed") {
        if (payment.payment_type === "Income") {
          income += payment.amount;
        } else {
          expenses += payment.amount;
        }
      } else if (payment.status === "Pending") {
        pending += payment.amount;
      }
    });

    return { income, expenses, net: income - expenses, pending };
  }, [payments]);

  const handleEdit = (payment: Payment) => {
    setEditingPayment(payment);
    setIsEditOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    return type === "Income"
      ? "text-green-600"
      : "text-red-600";
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Payments</h1>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          New Payment
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Income</p>
          <p className="text-2xl font-bold text-green-600">
            ${totals.income.toFixed(2)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Expenses</p>
          <p className="text-2xl font-bold text-red-600">
            ${totals.expenses.toFixed(2)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Net</p>
          <p className={`text-2xl font-bold ${totals.net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${totals.net.toFixed(2)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            ${totals.pending.toFixed(2)}
          </p>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <div className="min-w-40">
          <label className="block text-sm font-medium mb-1">Type</label>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              <SelectItem value="Income">Income</SelectItem>
              <SelectItem value="Expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-40">
          <label className="block text-sm font-medium mb-1">Status</label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredPayments.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            {payments.length === 0
              ? "No payments yet. Create one to get started!"
              : "No payments match the selected filters."}
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredPayments.map((payment) => (
            <Card
              key={payment.payment_id}
              className="p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{payment.category}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {payment.notes}
                  </p>

                  <div className="flex gap-2 flex-wrap mb-2">
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {new Date(payment.payment_date).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className={`text-xl font-bold mb-3 ${getTypeColor(payment.payment_type)}`}>
                    {payment.payment_type === "Income" ? "+" : "-"}
                    ${payment.amount.toFixed(2)} {payment.currency}
                  </p>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(payment)}
                      className="gap-1"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteId(payment.payment_id)}
                      className="gap-1 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <CreatePaymentModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onCreate={onAdd}
      />

      {editingPayment && (
        <EditPaymentModal
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          payment={editingPayment}
          onEdit={onEdit}
        />
      )}

      {deleteId && (
        <DeleteConfirmDialog
          open={deleteId !== null}
          onOpenChange={(open) => !open && setDeleteId(null)}
          onConfirm={() => {
            onDelete(deleteId);
            setDeleteId(null);
          }}
          title="Delete Payment"
          description="This action cannot be undone."
        />
      )}
    </div>
  );
}

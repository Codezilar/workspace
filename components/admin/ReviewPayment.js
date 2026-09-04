"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function ReviewPayment({ id }) {
  const [loading, setLoading] = useState(false),
    [error, setError] = useState(""),
    [success, setSuccess] = useState(""),
    r = useRouter();
  const review = async (status) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await fetch(`/api/payments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const body = await response.json();
      if (!response.ok) {
        setError(body.error || "Unable to review this payment.");
        return;
      }
      setSuccess(
        status === "APPROVED"
          ? "Payment approved. Access activated."
          : "Payment rejected. The member can submit another payment.",
      );
      r.refresh();
    } catch {
      setError("Unable to review this payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={loading}
          onClick={() => review("APPROVED")}
          className="btn btn-primary px-3 py-2 text-xs"
        >
          {loading ? "Saving…" : "Approve"}
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => review("REJECTED")}
          className="btn btn-secondary px-3 py-2 text-xs"
        >
          Reject
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
      {success && <p className="mt-2 text-xs text-acid">{success}</p>}
    </div>
  );
}

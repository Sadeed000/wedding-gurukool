import { X, Trash2, AlertTriangle } from "lucide-react";

export default function ConfirmDeleteModal({
  open,
  title = "Delete Venue?",
  message = "Are you sure you want to delete this venue? This action cannot be undone.",
  onCancel,
  onConfirm,
  loading = false,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/45 px-4">
      <div className="w-full max-w-md rounded-2xl bg-[#f8f1e7] shadow-2xl border border-[#e7dccb] overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5d8c5]">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle size={22} className="text-red-600" />
            </div>

            <div>
              <h2 className="text-xl font-serif font-bold text-[#1f1713]">
                {title}
              </h2>
              <p className="text-xs text-[#7b6b5c]">
                Confirmation required
              </p>
            </div>
          </div>

          <button
            onClick={onCancel}
            disabled={loading}
            className="text-[#7b6b5c] hover:text-[#1f1713] transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-sm leading-6 text-[#4b4038]">
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-[#f3eadc] border-t border-[#e5d8c5]">
          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-full px-5 py-2 text-sm font-medium border border-[#d7c7b2] text-[#4b4038] hover:bg-white transition disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-full px-5 py-2 text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-60 flex items-center gap-2"
          >
            <Trash2 size={16} />
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
'use client';
import { useState } from 'react';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';

const initial = [
  {
    id: '1',
    name: 'Priya & Rahul Sharma',
    location: 'Delhi',
    rating: 5,
    text: 'Wedding Gurukuls turned our dream wedding into reality. Every detail was perfect.',
    published: true,
  },
  {
    id: '2',
    name: 'Ananya & Vikram Mehta',
    location: 'Mumbai',
    rating: 5,
    text: 'The team was incredibly professional and creative. Our Udaipur wedding was magical.',
    published: true,
  },
  {
    id: '3',
    name: 'Riya & Arjun Kapoor',
    location: 'Jaipur',
    rating: 5,
    text: "We couldn't have asked for a better wedding planner. Absolutely flawless.",
    published: false,
  },
];

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', location: '', rating: 5, text: '', published: true });

  const handleSave = () => {
    if (editing) setItems(i => i.map(x => x.id === editing ? { ...x, ...form } : x));
    else setItems(i => [...i, { ...form, id: Date.now().toString() }]);
    setShowForm(false); setEditing(null);
    setForm({ name: '', location: '', rating: 5, text: '', published: true });
  };

  const handleEdit = (item: typeof items[0]) => {
    setForm({ name: item.name, location: item.location, rating: item.rating, text: item.text, published: item.published });
    setEditing(item.id); setShowForm(true);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Testimonials</h1>
          <p className="text-gray-500 text-sm mt-1">{items.length} testimonials</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); }}
          className="flex items-center gap-2 bg-[#c9922a] text-white px-5 py-2.5 rounded-full text-sm hover:bg-[#b8821f] transition-colors">
          <Plus size={16} />Add Testimonial
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">{editing ? 'Edit Testimonial' : 'New Testimonial'}</h2>
            <div className="space-y-4">
              {[['Couple Name', 'name'], ['Location', 'location']].map(([label, field]) => (
                <div key={field}>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{label}</label>
                  <input value={(form as any)[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9922a]" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Rating</label>
                <select value={form.rating} onChange={e => setForm(f => ({ ...f, rating: +e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9922a]">
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} stars</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Testimonial</label>
                <textarea rows={4} value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9922a] resize-none" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="accent-[#c9922a]" />
                <span className="text-sm text-gray-700">Published</span>
              </label>
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={handleSave} className="flex-1 bg-[#c9922a] text-white py-2.5 rounded-full text-sm hover:bg-[#b8821f] transition-colors">Save</button>
              <button onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-full text-sm hover:bg-gray-50 transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                <p className="text-gray-400 text-xs">{item.location}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${item.published ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                {item.published ? 'Live' : 'Draft'}
              </span>
            </div>
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: item.rating }).map((_, i) => <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />)}
            </div>
            <p className="text-gray-600 text-sm italic leading-relaxed mb-4">"{item.text}"</p>
            <div className="flex gap-2 pt-4 border-t border-gray-50">
              <button onClick={() => handleEdit(item)} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#c9922a] transition-colors"><Pencil size={13} />Edit</button>
              <button onClick={() => setItems(x => x.filter(i => i.id !== item.id))} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={13} />Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

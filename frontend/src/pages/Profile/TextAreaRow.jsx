export default function TextAreaRow({ label, isEditing, tempData, profileData, name, placeholder, onChange, required, rows = 4, error }) {
  return (
    <div className="py-4 border-b border-gray-200">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {isEditing ? (
        <div>
          <textarea
            name={name}
            value={tempData[name]}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      ) : (
        <p className="text-gray-900 whitespace-pre-wrap">{profileData[name] || "Not provided"}</p>
      )}
    </div>
  );
}
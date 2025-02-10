const BiographyModal = ({ isOpen, onClose, biography }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="w-full max-w-2xl rounded-lg bg-black p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Biography</h2>
        <p className="text-gray-300">{biography}</p>
        <button
          onClick={onClose}
          className="mt-4 rounded bg-red-600 px-10 py-2 text-white hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BiographyModal;
